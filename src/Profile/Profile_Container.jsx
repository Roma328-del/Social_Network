import React, { useRef, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { GetStatus, SetStatus, GetData, PutPhoto } from './Profile_reducer'
import classes from './Profile_Container.module.scss'
import { compose } from '@reduxjs/toolkit'
import AUTH from '../Auth//Auth'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import { useLocation } from 'react-router-dom'

let Profile_Container = (props) => {
  let ref0 = React.createRef();
  const [EditMode, SetEditMode] = useState(false);
  const [count, SetCount] = useState(0);
  const id = useRef(null);
  const locate = useLocation();
  id.current = (locate.pathname.slice(9, locate.pathname.length));
  useEffect(() => {
    if (count === 0) {
      if (id.current != 'me') {
        props.GetStatus(id.current);
        props.GetData(id.current);
      }
      else {
        props.GetStatus(props.Auth.id);
        props.GetData(props.Auth.id)
      }
      SetCount(1);
    }
  })
  let activate_mode = () => {
    SetEditMode(true)
  }
  let deactivate_mode = (e) => {
    props.SetStatus(e.target.value, props.Auth.id);
    SetEditMode(false);
  }
  let UploadPhoto = (e) => {
    let file = e.target.files[0]
    props.PutPhoto(file);
    console.log(e.target.files[0])
  }
  return (
    <>
      <Sidebar />
      <Header />
      {
        (((id.current == props.Auth.id) || (id.current === 'me')) && (!EditMode)) ?
          <label className={classes.status_label_me}
            onDoubleClick={activate_mode}>Status:{props.Profile.status}</label> :
          (((id.current == props.Auth.id) || (id.current === 'me')) && (EditMode)) ?
            <input className={classes.input_status} autoFocus={true}
              onDoubleClick={deactivate_mode}
              defaultValue={'Enter your status;)'} onBlur={deactivate_mode} /> :
            <label className={classes.status_label}>Status:{props.Profile.status}</label>
      }
      {
        (props.Profile.data) ? <div><div className={classes.div_name}>
          <label className={classes.label_name}>FullName:
            {props.Profile.data.fullName}</label></div>
        </div> :
          <div className={classes.div_name}>
            <label>Loading...</label></div>
      }
      {
        (props.Profile.data) ?
          <img className={classes.img0} src={props.Profile.data.photos.large} /> :
          <img className={classes.img0} src='../src/Users/anonim.png' />
      }
      {
        ((id.current == props.Auth.id) || (id.current === 'me')) ?
          <div><input type='file' onChange={UploadPhoto} className={classes.InputPutPhoto} />
            {/* <button className={classes.ButtonSendPhoto}
              onClick={() => {
                props.PutPhoto(ref0.current.value);
                console.log(ref0.current.value)
              }}
            >SET_PHOTO</button> */}
          </div> :
          null
      }

      {/* {
        console.log(props.Profile.data)
      }
      {
        console.log(props.Profile.data.photos.large)
      } */}

    </>
  )
}

let mapStateToProps = (state) => {
  return {
    Profile: state.Profile_reducer,
    Auth: state.Auth
  }
};

export default compose(AUTH, connect(mapStateToProps, { PutPhoto, GetStatus, SetStatus, GetData })
)(Profile_Container)

{/* <div className={classes.status_label}
            onDoubleClick={activate_mode}>{props.Profile.status}</div> :
          <input className={classes.input_status} autoFocus={true}
            onDoubleClick={deactivate_mode}
            defaultValue={'Enter your status;)'} onBlur={deactivate_mode} /> */}



//llkmkn
{/* <div className={classes.logout}>
          <label onClick={() => {
            this.props.LoginOut().then(response => {
              if (response.data.resultCode === 0) {
                this.setState({ Login: false })
              }
            })
          }} className={classes.logout_text}>
            LOGOUT</label>
        </div> */}


// '32021'


//https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fillustrations%2Fspace&psig=AOvVaw2QmZ6Obnd4qndd21jHqXSV&ust=1738845673598000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNihpIjHrIsDFQAAAAAdAAAAABB5