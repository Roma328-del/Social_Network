import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { GET_STATE } from "./Auth_reducer_new"
import { Navigate } from "react-router-dom"

let mapStateToProps = (state) => { return { Auth: state.Auth } }

const AUTH = (Component) => {
    const Wrapper = (props) => {
        const [current, SetCurrent] = useState(0);
        useEffect(() => {
            if (current === 0) {
                props.GET_STATE()
                SetCurrent(1);
            }
        })
        if (!props.Auth.isAuth && props.Auth.isUpdate) {
            return <Navigate replace to='/login' />
        }
        if (props.Auth.isAuth)
            return <Component />
    }
    return connect(mapStateToProps, { GET_STATE })(Wrapper)
}
export default AUTH;






