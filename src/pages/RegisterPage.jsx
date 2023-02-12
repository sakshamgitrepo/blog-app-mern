import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
const navigate = useNavigate();
 const register = async(e)=>{
  e.preventDefault()
  const response = await fetch('http://localhost:4000/user/register', {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
    })
    if (response.status === 200) {
      alert('registration successful');
      navigate('/login')
    } else {
      alert('registration failed');
    }
 }
  

  return (
    <form className="register" onSubmit={register}>
    <h1> <FaUser/> Register</h1>
    <input type="text"
           placeholder="username"
           value={username}
           onChange={e => setUsername(e.target.value)}
           />
    <input type="password"
           placeholder="password"
           value={password}
           onChange={e => setPassword(e.target.value)}
           />
    <button>Register</button>
  </form>
    )
}

export default RegisterPage