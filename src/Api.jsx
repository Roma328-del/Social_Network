import axios from "axios"
export const instance = axios.create(
    {
        baseURL: `https://social-network.samuraijs.com/api/1.0`,
        withCredentials: true,
        headers: { 'API-KEY': 'fce085c4-74ad-488b-a983-d81d319b429a' }
    }
)
export let USER_API = {
    GET_USERS: (count_key, number_page) => {

        return instance.get(`/users?count=${count_key}&page=${number_page}`).then(response => { return response.data })


    },
    FOLLOW: (id) => {
        return instance.post(`follow/${id}`).then(response => { return response.data.resultCode })
    },
    UNFOLLOW: (id) => {
        return instance.delete(`follow/${id}`).then(response => { return response.data.resultCode })
    }
}

export let PROFILE_API = {
    GET_STATUS: (id) => {
        return instance.get(`/profile/status/${id}`)
    },
    SET_STATUS: (status) => {
        return instance.put(`/profile/status`, { status: status })
    },
    GET_DATA: (id) => {
        return instance.get(`/profile/${id}`)
    },
    PUT_PHOTO: (image) => {
        const formData = new FormData();
        formData.append('image', image);
        return instance.put(`/profile/photo`, { formData },
            {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            })

    }
}

export let LOGIN_API = {
    SET_DATA: (email, password, rememberMe, captcha) => {
        if (!captcha) {
            return instance.post(`/auth/login`, {
                email,
                password,
                rememberMe
            })
        }
        else {
            return instance.post(`/auth/login`, {
                email,
                password,
                rememberMe,
                captcha
            })
        }
    },
    LOGOUT: () => {
        return instance.delete(`/auth/login`)
    },
    GET_CAPTCHA: () => {
        return instance.get(`/security/get-captcha-url`)
    }
}
export let AUTH_API = {
    ME: () => {
        return instance.get(`/auth/me`)
    }
}