import { applyMiddleware } from "@reduxjs/toolkit";
import { USER_API } from "../Api";

const GET_USERS = 'GET_USERS';
const G_U = 'G_U';
const CHECK_SUBSCRIBE = ' CHECK_SUBSCRIBE';
const isTogglingSubscribeData = 'isTogglingSubscribeData';
const SET_DATA_M = 'SET_DATA_M';
const DELETE_DATA_M = 'DELETE_DATA_M';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';

export let number_page = 1; // Номер актуальной страницы // пока не работает

let initial_state =
{
    Users: [{}], // это моя структура
    isreceived: false,
    isTogglingSubscribe: false,
    isTogglingSubscribeData: [],
    data_m: []
}
export let inc_number_page = () => {
    number_page++;// пока не работает
}
export let change_page = (number) => {
    number_page = number;// пока не работает
}
export let get_number_page = () => {
    return number_page;// пока не работает
}











let Users_reducer = (state = initial_state, action) => {

    switch (action.type) {
        case CHECK_SUBSCRIBE:
            {
                return { ...state, isTogglingSubscribe: action.isTogglingSubscribe }




            }
        case G_U:
            {
                return { ...state, isreceived: true, items: action.items }
            }
        case isTogglingSubscribeData:
            {
                return { ...state, isTogglingSubscribeData: action.count }
            }
        case DELETE_DATA_M:
            {
                state.data_m.pop();
                return { ...state }
            }
        case SET_DATA_M:
            state.data_m.push(action.id);

            {
                return { ...state }
            }
        default:
            {

                return { ...state }
            }

    }




    return state;
}

export let CHECK_SUBSCRIBE_CR = (value) => {
    return ({ type: CHECK_SUBSCRIBE, isTogglingSubscribe: value });
}


export let G_U_CR = (items) => {
    return ({ type: G_U, items });
}

export let isTogglingSubscribeData_CR = (value) => {
    return ({ type: isTogglingSubscribeData, value })
}
export let Set_Data_M = (id) => {
    return ({ type: SET_DATA_M, id })
}
export let Delete_Data_M = () => {
    return ({ type: DELETE_DATA_M })
}
export const GetUsers = (count_key, number_page) => {
    return (dispatch) => {
        USER_API.GET_USERS(count_key, number_page).then((data) => {
            console.log(data)
            dispatch(G_U_CR(data.items));
        });
    }
}
export const Subscribe = (type, id, count_key, number_page) => {
    return (dispatch) => {
        dispatch(Set_Data_M(id));
        switch (type) {
            case (FOLLOW):
                {
                    USER_API.FOLLOW(id).then((result) => {
                        if (result === 0) {
                            USER_API.GET_USERS(count_key, number_page).then((data) => {
                                dispatch(G_U_CR(data.items));
                                dispatch(Delete_Data_M());
                            });
                        }
                    })
                }
            case (UNFOLLOW):
                {
                    USER_API.UNFOLLOW(id).then((result) => {
                        if (result === 0) {
                            USER_API.GET_USERS(count_key, number_page).then((data) => {
                                dispatch(G_U_CR(data.items));
                                dispatch(Delete_Data_M());
                            });
                        }
                    })
                }
        }
    }
}


export default Users_reducer;