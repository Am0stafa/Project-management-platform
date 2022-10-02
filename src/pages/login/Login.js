import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import './Login.css'
import { useSignup } from '../../hooks/useSignup';

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login,loginForGoogle, error, isPending,signInWithGoogle } = useLogin()
  const { signupForGoogle } = useSignup()


  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
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
      <button  class="loginBtn loginBtn--google" onClick={()=>signInWithGoogle(loginForGoogle,signupForGoogle)}>SignIn with google</button>
      
      {!isPending && <button className="btn">Log in</button>}
      {isPending && <button className="btn" disabled>loading</button>}
      {error && <div className="error">{error}</div>}
    </form>
  )
}
