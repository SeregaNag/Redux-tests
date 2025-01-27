import { configureStore } from "@reduxjs/toolkit";

type CounterState = {
  counter: number
}

export type CounterId = string

type State = {
  counters: Record<CounterId,CounterState | undefined>;
};

export type IncrementAction = {
  type: "increment";
  payload: {
    counterId: CounterId;
  }
};

export type DecrementAction = {
  type: "decrement";
  payload: {
    counterId: CounterId;
  }
};

type Action = IncrementAction | DecrementAction;

const initialCounterState: CounterState = {counter: 0};
const initialState: State = {
  counters: {}
};

const reducer = (state = initialState, action: Action): State => {
  if(!action.payload || !action.payload.counterId) {
    return state;
  } {
  const {counterId} = action.payload;
  const currentCounter = state.counters[counterId] ?? initialCounterState;
  switch (action.type) {
    case "increment": {
      return {
        ...state,
        counters: {
          ...state.counters,
          [counterId]: {
            ...currentCounter,
            counter: currentCounter.counter + 1,
          }
        }
      };
    }
    case "decrement":{
      return {
        ...state,
        counters: {
          ...state.counters,
          [counterId]: {
            ...currentCounter,
            counter: currentCounter.counter - 1,
          }
        }
      };
    }
  }
  }
};

export const store = configureStore({
  reducer: reducer,
});

export type AppState = ReturnType<typeof store.getState>;
