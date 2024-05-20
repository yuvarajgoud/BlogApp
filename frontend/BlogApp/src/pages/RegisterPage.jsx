import { useState } from "react"


export default function RegisterPage() {

  const [ username , setUsername] = useState('');
  const [password,setPassword] = useState('');

  async function register(ev){
    ev.preventDefault();
    const res = await fetch('http://localhost:8000/register',{
      method:'POST', 
      body : JSON.stringify({username,password}),
      headers : {'Content-Type':'application/json'},
    })
    console.log(res)
    if(res.status === 200){
      alert('Registration Successful')
    } else {
      alert('Registration Failed')
    }
  }

  return (
    <form action="" className="register" onSubmit={register}>
      <h1>Register</h1>
      <input type="text" 
             placeholder="username"
             value={username}
             onChange={ev => setUsername(ev.target.value)}/>
      <input type="password" 
             placeholder="password"
             value = {password}
             onChange = {ev => setPassword(ev.target.value)}/>
      <button>Register</button>
    </form>
  )
}