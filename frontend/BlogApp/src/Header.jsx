import { useContext, useEffect ,useState} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext)
  useEffect(()=>{
    fetch('http://localhost:8000/profile',{
      credentials:'include'
    }).then(res => {
      res.json().then( userInfo => {
        setUserInfo(userInfo)
      })
    })
  },[])

  function logout (){
    fetch('http://localhost:/logout',{
      credentials: 'include',
      method : 'POST'
    })
    setUserInfo(null)
  }
  const username = userInfo?.username
  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {username && (
          <>
          <Link to='/create'>Create New Post</Link>
          <a onClick={logout}>Logout</a>
          </>
        )
        }
        {!username && (
          <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          </>
        )
        }
      </nav>
    </header>
  );
}
