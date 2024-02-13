import { assign, EventObject, fromCallback, fromPromise, setup } from 'xstate';
import { ChildMachine } from '@/app/(wizard)/create-a-listing/machine/childMachine';
import { Draft } from '@/types/draftData.types';
import { getDraft } from '@/app/(wizard)/create-a-listing/actions';

async function fetchDraftData(id: string) {
  let res = null;
  try {
    res = await getDraft(id);
  } catch (e) {
    throw new Error('Failed to call server action');
  }
  if (res.error) throw new Error(res.error);

  return res.result;
}

export const WizardMachine = setup({
  types: {
    input: {} as {
      id: string;
    },
    context: {} as {
      draftId: string;
      draft: Draft | null;
      error: boolean;
      errorMsg: string;
    },
  },
  actors: {
    childMachine: ChildMachine,
    fetchDraft: fromPromise(({ input }: { input: { id: string } }) =>
      fetchDraftData(input.id)
    ),
    redirectToForm: fromCallback<EventObject, { lastUpdatedStep?: string }>(
      ({ input, sendBack }) => {
        switch (input.lastUpdatedStep) {
          case 'title':
            sendBack({ type: 'DESCRIPTION' });
            break;
          case 'description':
            sendBack({ type: 'STRUCTURETYPE' });
            break;
          case 'structureType':
            sendBack({ type: 'LOCATION' });
            break;
          default:
            sendBack({ type: 'TITLE' });
            break;
        }
      }
    ),
  },
}).createMachine({
  context: ({ input }) => ({
    draftId: input.id,
    draft: null,
    error: false,
    errorMsg: '',
  }),
  id: 'parentMachine',
  initial: 'loadingDraft',
  states: {
    loadingDraft: {
      invoke: {
        src: 'fetchDraft',
        input: ({ context }) => ({ id: context.draftId }),
        onDone: {
          target: 'loaded',
          actions: assign({
            draft: ({ event }) => event.output,
            error: false,
            errorMsg: '',
          }),
        },
        onError: {
          actions: assign({
            error: true,
            draft: null,
            errorMsg: ({ event }) => {
              if (event.error instanceof Error) return event.error.message;
              return 'Unknown error';
            },
          }),
        },
      },
      on: {
        work: { target: 'working' },
      },
    },
    loaded: {
      invoke: {
        src: 'redirectToForm',
        input: ({ context }) => ({
          lastUpdatedStep: context.draft?.lastUpdatedStep,
        }),
      },
      on: {
        TITLE: {
          target: 'title',
        },
        DESCRIPTION: {
          target: 'description',
        },
        STRUCTURETYPE: {
          target: 'structureType',
        },
        LOCATION: {
          target: 'location',
        },
      },
    },
    title: {
      on: {
        NEXT: {
          target: 'description',
        },
      },
    },
    description: {
      on: {
        NEXT: {
          target: 'structureType',
        },
        BACK: {
          target: 'title',
        },
      },
    },
    structureType: {
      on: {
        NEXT: {
          target: 'location',
        },
        BACK: {
          target: 'description',
        },
      },
    },
    location: {
      on: {
        BACK: {
          target: 'structureType',
        },
      },
    },
    working: {
      invoke: {
        src: 'childMachine',
        id: 'childMachineActorInstance',
        systemId: 'cMachine',
      },
      on: {
        finish: { target: 'done' },
      },
    },
    done: {
      type: 'final',
    },
  },
});
