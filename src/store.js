import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  blacklist: ["signup"],
  storage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const initialSate = {};
const middleware = [thunk];

const store = createStore(
  persistedReducer,
  initialSate,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
export const persistor = persistStore(store);
