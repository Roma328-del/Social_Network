import { createStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit"
import Users_reducer from "./Users/Users_reducer";
import Profile_reducer from "./Profile/Profile_reducer";
import Login_reducer from "./Login/Login_reducer";
import Auth_reducer_new from "./Auth/Auth_reducer_new";
import { thunk } from "redux-thunk";


let store = createStore(combineReducers({
    Users_reducer,
    Profile_reducer,
    Login: Login_reducer,
    Auth: Auth_reducer_new
}), applyMiddleware(thunk));


window.store = store;



export default store;
