import { combineReducers } from "redux";

import selectionReducer from "./reducers/selectionReducer";
/* -------------------------------------------------------------------------- */
const rootReducer = combineReducers({
  selection: selectionReducer
});

export default rootReducer;
