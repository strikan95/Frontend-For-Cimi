import { createMachine, fromPromise } from 'xstate';

export const ChildMachine = createMachine({
  id: 'childMachine',
  initial: 'idle',
  states: {
    idle: {
      invoke: {
        src: fromPromise(async () => {}),
      },
      on: {
        doJob: { target: 'doingJob' },
      },
    },
    doingJob: {
      invoke: {
        src: fromPromise(async () => {
          await new Promise((resolve) => {
            setTimeout(resolve, 5000);
          });
        }),
        onDone: {
          target: 'finished',
        },
      },
    },
    finished: {
      type: 'final',
    },
  },
});
