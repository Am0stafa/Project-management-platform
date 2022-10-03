import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import './Login.css'
import { useSignup } from '../../hooks/useSignup';


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login,google, error, isPending } = useLogin()


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("t")
    login(email, password)
  }

  return (
    <>
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>login</h2>
      <label>
        <span>email:</span>
        <input
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
        />
      </label>
      <label>
        <span>password:</span>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='true'
          value={password} 
        />
      </label>

       {!isPending && <button className="btn">Log in</button>}
      {isPending && <button className="btn"  type="submit" disabled>loading</button>}
      {error && <div className="error">{error}</div>}
    </form>
    <button className="loginBtn loginBtn--google" onClick={google}> SignIn with google</button>

    </>
  )
}
