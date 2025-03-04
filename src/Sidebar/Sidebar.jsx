import { NavLink } from "react-router-dom"
import styles from './Sidebar.module.scss'

const Sidebar = (props) => {
  return (
    <>
      <div className={styles.todo_div}>
        <div className={styles.cada_div}><NavLink className={styles.navlink} to='/profile/me'>PROFILE</NavLink></div>
        <div className={styles.cada_div}><NavLink className={styles.navlink} to='/users'>USERS</NavLink></div>
      </div>

    </>
  )
}
export default Sidebar