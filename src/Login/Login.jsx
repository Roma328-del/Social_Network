
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { SET_DATA_CR, LoginData } from "./Login_reducer";
import { useNavigate } from "react-router-dom";
import { compose } from "@reduxjs/toolkit";
import { useState } from "react";
import { GetCaptcha } from "./Login_reducer";
import styles from './Login.module.scss'


const RememberMe = 'RememberMe';
const EMAIL = 'EMAIL';
const PASSWORD = 'PASSWORD';
const CAPTCHA = 'CAPTCHA';




export const LoginPage = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState(false);
  const [url, setUrl] = useState(null);
  const [style, SetStyle] = useState(styles.field0)
  const [style_1, SetStyle_1] = useState(styles.field0)

  useEffect(() => {
    if (errors.EMAIL && style === styles.field0) {
      SetStyle(styles.field1)
    }
    if (errors.PASSWORD && style_1 === styles.field0) {
      SetStyle_1(styles.field1)
    }

  })


  let onSubmit = (data, e) => {
    props.LoginData(data.EMAIL, data.PASSWORD, data.RememberMe, data.CAPTCHA).then(response => {
      if (response.data.resultCode === 0) {
        setVisibility(false);
        props.SET_DATA_CR(data.EMAIL, data.PASSWORD, data.RememberMe);
        navigate('/profile/me');
      }
      else if (response.data.resultCode === 1) {
        setVisibility(false);
        alert(response.data.messages);
      }
      else if (response.data.resultCode === 10) {
        alert(response.data.messages);
        setVisibility(true);
        props.GetCaptcha().then(response => setUrl(response));
      }
      else {
        alert('Unexpected error');
      }
    })
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            Email:
            <input className={style} {...register(EMAIL, { required: true })} />
            {errors.EMAIL && <p>Please check your email</p>}
          </label>
        </div>
        <div>
          <label>
            Password:
            <input className={style_1}
              type="password" {...register(PASSWORD,
                { required: true })} />
            {errors.PASSWORD && <p>Please check your password</p>}
          </label>
        </div>
        <div>
          <label>
            Remember:
            <input type="checkbox"{...register(RememberMe)} />
          </label>
        </div>
        {visibility ? <div>
          <div>
            <label>
              ENTER CAPTCHA:
              <input {...register(CAPTCHA)} />
            </label>
          </div>
          <img src={url} />
        </div> : <div></div>}
        <div>
          <label>
            SEND DATA:
            <input type="submit" value={'SEND'} />
          </label>
        </div>
      </form>
    </>
  )


}
let mapStateToProps = (state) => { return { Login: state.Login } }

export default connect(mapStateToProps, { SET_DATA_CR, GetCaptcha, LoginData })(LoginPage)

// connect(mapStateToProps, { SET_DATA_CR, GetCaptcha, LoginData })


// const interval = useRef();

// useEffect(() => {
//   if (!interval.current) {
//     console.log('ComponentDidMount:');
//     interval.current = true;
//   }
//   else {
//     console.log('ComponentDidUpdate:');

//   }
// })

// alert(JSON.stringify(data));
// PROFILE_API.SET_STATUS(data.First_name);



// LOGIN_API.SET_DATA(data.EMAIL, data.PASSWORD, data.RememberMe, data.CAPTCHA).then(response => {
//   console.log(response);
//   if (response.data.resultCode === 0) {
//     setVisibility(false);
//     props.SET_DATA_CR(data.EMAIL, data.PASSWORD, data.RememberMe);
//     navigate('/profile');
//   }
//   else if (response.data.resultCode === 1) {
//     setVisibility(false);
//     alert(response.data.messages);
//   }
//   else if (response.data.resultCode === 10) {
//     alert(response.data.messages);
//     setVisibility(true);
//     props.GetCaptcha().then(response => setUrl(response));
//   }
//   else {
//     alert('Unexpected error');
//   }
// })
