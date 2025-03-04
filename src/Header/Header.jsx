import { NavLink } from "react-router-dom"
import styles from './Header.module.scss'
import LogOut from "../Login/LogOut"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { connect } from "react-redux"
import { LoginOut } from "../Login/Login_reducer"

const Header = (props) => {
  const [visibility_settings, SetVisibility] = useState(false);
  let navigate = useNavigate();

  return (
    <>
      <div className={styles.outer_header}>
        <div className={styles.options}>
          <label
            onClick={() => {
              if (!visibility_settings) SetVisibility(true)
              else { SetVisibility(false) }
            }}
            className={styles.text}>SETTINGS</label>
        </div>
      </div >
      {(visibility_settings) ? <div
        className={styles.options_settings}>
        <div className={styles.menu_div0}>
          <label className={styles.menu_label} onClick={() => {
            props.LoginOut().then(response => {
              if (response.data.resultCode === 0) {
                navigate('/login')
              }
            })
          }}>
            LOGOUT</label>
        </div>
      </div> : null
      }
      {/* <LogOut /> */}


    </>
  )


}

export default connect(null, { LoginOut })(Header)