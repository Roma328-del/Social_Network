import { LOGIN_API } from "../Api";

const SET_DATA = 'SET_DATA';

let initial_state = {
  email: null,
  password: null,
  rememberMe: false
}

const Login_reducer = (state = initial_state, action) => {
  switch (action.type) {
    case SET_DATA:
      {
        state.email = action.email;
        state.password = action.password;
        state.rememberMe = action.rememberMe;
        return { ...state }
      }
    default:
      return { ...state }
  }
}
export let SET_DATA_CR = (email, password, rememberMe) => {
  return { type: SET_DATA, email, password, rememberMe }
}

export let GetCaptcha = () => {
  return () => {
    return LOGIN_API.GET_CAPTCHA().then(response => () => { return response.data.url })
  }
}

export let LoginData = (EMAIL, PASSWORD, RememberMe, CAPTCHA) => {
  return () => {
    return LOGIN_API.SET_DATA(EMAIL, PASSWORD, RememberMe, CAPTCHA).then(response => {
      return response;
    })
  }
}
export let LoginOut = () => {
  return () => {
    return LOGIN_API.LOGOUT();
  }
}


export default Login_reducer