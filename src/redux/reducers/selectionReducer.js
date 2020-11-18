import types from "../actions/types";

import { checkForIt } from '../../utils'

const initialState = {
  selections: []
}

const selectionReducer = (state = initialState, action) => {
  switch (action.type) {
    // To handle selection:
    case types.HANDLE_SELECTION:
      // Old state:
      let old_state = state.selections
      // Create array or new state:
      let new_state = []
      // Payload from action:
      let payload = action.payload
      // Iterate the payload array of objects:
      payload.forEach(x => {
        // If the object is not in old state array:
        if (!checkForIt(x, old_state)) {
          // Merge new object and old state array:
          new_state = [...old_state, x]
        // Else if object is in the old state array:
        } else if (checkForIt(x, old_state)) {
          // Get the index of the object in the old state array:
          const index = old_state.indexOf(x)
          // If the object is there:
          if (index > -1) { 
            // .splice it from the array and set to new state:
            new_state = old_state.splice(index, 1)
          }
        }
      })
      // Finally, set the selection state:
      return {
        ...state,
        selections: new_state
      }
    default:
      return state
  }
}

export default selectionReducer
