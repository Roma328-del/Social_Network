import React from 'react'
import { connect } from 'react-redux';
import { GetUsers, Subscribe } from './Users_reducer';
import Sidebar from '../Sidebar/Sidebar';
import classes from './Users_Container.module.scss';
import { compose } from '@reduxjs/toolkit';
import AUTH from '../Auth/Auth';
import Header from '../Header/Header';
import { NavLink } from 'react-router-dom';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';


let count_key = 10;   // Поиск выбранного количества пользователей на сервере
let number_page = 1; // Номер актуальной страницы
let i = [1, 2, 3, 4]; // Цифровые кнопки


class Users_Container extends React.Component {
  componentDidMount() {
    this.props.GetUsers(count_key, number_page);
  }
  change_page(item) {
    number_page = item;
    this.props.GetUsers(count_key, item);
  }
  get_user_page(id) {


  }

  render() {
    if (this.props.Users.isreceived) {
      return (
        <>
          <div className={classes.div_number}>{i.map(item => { return (<button className={classes.butt_number} onClick={() => { this.change_page(item) }} key={item}>{item}</button>) })}
            <button className={classes.butt_plus} onClick={() => { i.push(i.length + 1); this.change_page(i[i.length - 1]) }}>+</button>
          </div>


          <Header />
          <Sidebar />



          <div className={classes.div0}>
            {this.props.Users.items.map(item => {
              return (
                <div key={item.id} className={classes.div1}>
                  <NavLink to={`../profile/${item.id}`}
                    className={classes.NavLink_name}>{item.name}</NavLink>

                  {!item.followed ? <button
                    disabled={this.props.Users.data_m.some(j => j === item.id)}
                    onClick={() => {
                      this.props.Subscribe(FOLLOW, item.id, count_key, number_page);
                    }} className={classes.follow}>Follow</button>
                    : <button disabled={this.props.Users.data_m.some(j => j === item.id)}
                      onClick={() => {
                        this.props.Subscribe(UNFOLLOW, item.id, count_key, number_page);
                      }
                      } className={classes.follow}>Unfollow</button>}

                  {
                    (!item.photos.small) ? <div className={classes.div_image}>
                      <img className={classes.img0}
                        src={'./src/Users/anonim.png'} /></div> :
                      <div className={classes.div_image}>
                        <img className={classes.img0}
                          src={item.photos.small} /></div>

                  }
                </div>)
            })}
          </div >








        </>
      )
    }
  }
}

let mapStateToProps = (state) => { return { Users: state.Users_reducer, Auth: state.Auth } };


// export default connect(mapStateToProps, {
//   GetUsers,
//   Subscribe
// })(Users_Container);


export default compose(AUTH, connect(mapStateToProps, {
  GetUsers,
  Subscribe
}))(Users_Container)

// count_pages = Math.ceil(data.totalCount / count_key);

{/* {(this.props.Auth.isAuth) ? <div className={styles.logout}>
            <label onClick={() => {
              this.props.LoginOut().then(response => {
                if (response.data.resultCode === 0) {
                  this.setState({ Login: false })
                }
              })
            }} className={styles.logout_text}>
              LOGOUT</label>
          </div> : (this.props.Auth.isUpdate) ?
            <div className={styles.logout}>
              <label onClick={() => {

              }} className={styles.logout_text}>
                LOGIN</label>
            </div> : null
          } */}


// <img className={classes.img0} src={item.photos.large} />

// (item.photos.small) ?
// <img className={classes.img0} src={item.photos.small} /> :
// <img className={classes.img0} src='./src/Users/anonim.png' />
