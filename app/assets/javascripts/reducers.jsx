var initialSessionsState = {};

export function _session(state = initialSessionsState, action) {
  console.log('_time reducer called with state ', state ,
    ' and action ', action);

  switch (action.type) {
    case 'GET_SESSION_REQUEST':
      return {
        ...state,
        frozen: true
      };
    case 'GET_SESSION_SUCCESS':
      return {
        ...state,
        sessions: action.result,
        frozen: false
      };
    case 'GET_SESSION_FAILURE':
      return {
        ...state,
        frozen: false
      };
    default:
      return state;
  }
}
