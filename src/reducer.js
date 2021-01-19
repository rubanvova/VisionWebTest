const initialState = {
  user: null,
};

export const ACTION_LOAD_DATA = 'ACTION_LOAD_DATA';
export const CLEAR_STORE = 'CLEAR_STORE';

const reducer = (state = initialState, action) => {
  const { type, payload = {} } = action;
  switch (type) {
    case ACTION_LOAD_DATA: {
      const { user } = payload;
      return {
        ...state,
        user: user || null,
      };
    }
    case CLEAR_STORE: {
      localStorage.clear();
      return initialState;
    }
    default:
      return state;
  }
};

export default reducer;
