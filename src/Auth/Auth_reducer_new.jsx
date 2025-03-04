import { AUTH_API } from "../Api";

const Auth_Me = 'Auth_Me';

let initial_state = {
    email: null,
    login: null,
    id: null,
    isAuth: false,
    isUpdate: false
}


const Auth_reducer_new = (state = initial_state, action) => {
    switch (action.type) {
        case Auth_Me:
            {
                state.email = action.email;
                state.login = action.login;
                state.id = action.id;
                state.isAuth = action.isAuth;
                state.isUpdate = action.isUpdate;
                return { ...state }
            }
        default:
            {
                return { ...state }
            }
    }

}
export let GET_STATE = () => {
    return (dispatch) => {
        return AUTH_API.ME().then(response => {
            if (response.data.resultCode === 0) {
                dispatch(Auth_Me_CR(
                    response.data.data.id,
                    response.data.data.email,
                    response.data.data.login
                ))
            }
            else {
                dispatch(Auth_Me_CR(
                    null,
                    null,
                    null,
                    false,
                    true
                ))


            }
            return response;
        })

    }
}

export const Auth_Me_CR = (id, email, login, isAuth = true, isUpdate = true) => {
    return { type: Auth_Me, id, email, login, isAuth, isUpdate }
}

export default Auth_reducer_new;