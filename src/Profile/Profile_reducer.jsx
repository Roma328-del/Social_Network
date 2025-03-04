import { PROFILE_API } from "../Api";
import { LOGIN_API } from "../Api";

const SET_STATUS = 'SET_STATUS';
const SET_DATA = 'SET_DATA';

export let number_page = 1; // Номер актуальной страницы // пока не работает

let initial_state =
{
    status: "Status is empty",
    data: {
        photos: {
            large: '../src/Users/anonim.png',
            small: '../src/Users/anonim.png'
        }
    }

}












let Profile_reducer = (state = initial_state, action) => {

    switch (action.type) {
        case (SET_STATUS):
            {
                state.status = action.status
                return { ...state }
            }
        case (SET_DATA):
            {
                state.data = action.data;
                return { ...state }
            }

        default:
            {

                return { ...state }
            }

    }
}

export let SET_STATUS_CR = (status) => { return { type: SET_STATUS, status } }
export let SET_DATA_CR = (data) => { return { type: SET_DATA, data } }

export let GetStatus = (id) => {
    return (dispatch) => {
        PROFILE_API.GET_STATUS(id).then(response => {
            dispatch(SET_STATUS_CR(response.data))
        })
    }
}
export let SetStatus = (status, id) => {
    return (dispatch) => {
        PROFILE_API.SET_STATUS(status).then(response =>
            (response.data.resultCode === 0) ? dispatch(GetStatus(id)) :
                alert('Ошибка соединения с сервером:статус не установлен;повторите попытку позже')
        )
    }
}
export let GetData = (id) => {
    return (dispatch) => {
        PROFILE_API.GET_DATA(id).then(response => {
            if (response.data.photos.large === null) {
                response.data.photos.large = '../src/Users/anonim.png';
            }
            dispatch(SET_DATA_CR(response.data))
        }
        )
    }
}
export let PutPhoto = (image) => {
    return (dispatch) => {
        PROFILE_API.PUT_PHOTO(image).then(response =>
            console.log(response)
        )

    }
}



export default Profile_reducer;