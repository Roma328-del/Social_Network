
import Users_Container from './Users/Users_Container.jsx'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import LoginPage from './Login/Login.jsx'
import Profile_container from './Profile/Profile_Container.jsx'

const profile_arr = ['/profile', '/profile:id']

let App = (props) => {
  let navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    if (location.pathname.length === 1) {
      navigate('/profile/me');
    }
  })
  // let New_Header = AUTH(Header_Container);
  // let New_Profile = AUTH(Profile_container);
  return (
    <>
      {/* <App1 /> */}
      {/* <New_Header /> */}
      {/* <New_Profile /> */}
      {/* <Example /> */}
      {/* < LoginPage /> */}
      {/* <LogOut /> */}




      <Routes>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/profile/me' element={<Profile_container />}></Route>
        <Route path='/profile/:id' element={<Profile_container />}></Route>
        <Route path='/users' element={<Users_Container />}></Route>
      </Routes>
    </>
  )



}

export default App;


{/* <Profile_container /> */ }
{/* <Users_Container /> */ }
{/* <Example /> */ }
{/* <Header_Container /> */ }



// '32021'




// typescript,sass,css tailwind + react js + hook