'use client';

import { assign, EventObject, fromCallback, fromPromise, setup } from 'xstate';
import { ChildMachine } from '@/components/wizard/machine/childMachine';
import { Draft } from '@/lib/cimi/types/draftData.types';
import { getDraft } from '@/components/wizard/actions';

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
    fetchDraft: fromPromise(({ input }: { input: { id: string } }) => {
      return fetchDraftData(input.id);
    }),
    redirectToForm: fromCallback<EventObject, { lastUpdatedStep?: string }>(
      ({ input, sendBack }) => {
        switch (input.lastUpdatedStep) {
          case 'structure-type':
            sendBack({ type: 'PLACETYPE' });
            break;
          case 'place-type':
            sendBack({ type: 'AMENITIES' });
            break;
          case 'amenities':
            sendBack({ type: 'LOCATION' });
            break;
          case 'location':
            sendBack({ type: 'IMAGES' });
            break;
          case 'images':
            sendBack({ type: 'TITLE' });
            break;
          case 'title':
            sendBack({ type: 'DESCRIPTION' });
            break;
          case 'description':
            sendBack({ type: 'PRICING' });
            break;
          case 'pricing':
            //sendBack({ type: 'PRICING' });
            break;
          default:
            sendBack({ type: 'STRUCTURETYPE' });
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
        input: ({ context }) => {
          return {
            id: context.draftId,
          };
        },
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
        STRUCTURETYPE: {
          target: 'structure-type',
        },
        PLACETYPE: {
          target: 'place-type',
        },
        AMENITIES: {
          target: 'amenities',
        },
        LOCATION: {
          target: 'location',
        },
        IMAGES: {
          target: 'images',
        },
        TITLE: {
          target: 'title',
        },
        DESCRIPTION: {
          target: 'description',
        },
        PRICING: {
          target: 'pricing',
        },
        FINALISE: {
          target: 'finalise',
        },
      },
    },
    'structure-type': {
      on: {
        NEXT: {
          target: 'place-type',
          actions: assign(({ event }) => {
            return {
              draft: event.draft,
            };
          }),
        },
      },
    },
    'place-type': {
      on: {
        NEXT: {
          target: 'amenities',
          actions: assign(({ event }) => {
            return {
              draft: event.draft,
            };
          }),
        },
        BACK: {
          target: 'structure-type',
        },
      },
    },
    amenities: {
      on: {
        NEXT: {
          target: 'location',
          actions: assign(({ event }) => {
            return {
              draft: event.draft,
            };
          }),
        },
        BACK: {
          target: 'place-type',
        },
      },
    },
    location: {
      on: {
        NEXT: {
          target: 'images',
          actions: assign(({ event }) => {
            return {
              draft: event.draft,
            };
          }),
        },
        BACK: {
          target: 'amenities',
        },
      },
    },
    images: {
      on: {
        NEXT: {
          target: 'title',
          actions: assign(({ event }) => {
            return {
              draft: event.draft,
            };
          }),
        },
        BACK: {
          target: 'location',
        },
        UPDATED_IMAGES: {
          actions: assign(({ event }) => {
            return {
              draft: event.draft,
            };
          }),
        },
      },
    },
    title: {
      on: {
        NEXT: {
          target: 'description',
          actions: assign(({ event }) => {
            return {
              draft: event.draft,
            };
          }),
        },
        BACK: {
          target: 'images',
        },
      },
    },
    description: {
      on: {
        NEXT: {
          target: 'pricing',
          actions: assign(({ event }) => {
            return {
              draft: event.draft,
            };
          }),
        },
        BACK: {
          target: 'title',
        },
      },
    },
    pricing: {
      on: {
        NEXT: {
          target: 'finalise',
          actions: assign(({ event }) => {
            return {
              draft: event.draft,
            };
          }),
        },
        BACK: {
          target: 'description',
        },
      },
    },
    finalise: {},
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
