import types from "./types"

// Redux action that handles selections:
export const handleSelection = (selections) => {
  return {
    type: types.HANDLE_SELECTION,
    payload: selections
  }
}
