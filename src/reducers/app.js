/**
 * App Reducer
 * @param state Object
 * @param action Object
 */

/**
 * Initial State Mapping
 */
const initialState = {
  user: null
};

/**
 * App Reducer
 * @param state Object
 * @param action Object
 */
export const app = (state = initialState, action) => {
  switch (action.type) {
    default:
    console.info(`state ${JSON.stringify(state)} : action : ${action} `);
    return state;
  }
};
