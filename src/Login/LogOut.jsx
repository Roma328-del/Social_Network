import { useNavigate } from 'react-router-dom'
import styles from './Login.module.scss'
import { LoginOut } from './Login_reducer';
import { connect } from 'react-redux';



let LogOut = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.logout}>
        <label className={styles.logout_text} onClick={() => {
          props.LoginOut().then(response => {
            if (response.data.resultCode === 0) {
              navigate('/login')
            }
          })
        }}>
          LOGOUT</label>
      </div>

    </>
  )

}

export default connect(null, { LoginOut })(LogOut)
