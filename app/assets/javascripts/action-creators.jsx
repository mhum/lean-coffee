export function getSessions() {
  return {
    types: ['GET_SESSION_REQUEST', 'GET_SESSION_SUCCESS',
      'GET_SESSION_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {
        fetch('/data/sessions').then(data => {
          resolve(data.json());
        });
      });
    }
  };
};
