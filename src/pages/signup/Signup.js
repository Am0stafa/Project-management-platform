
import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import './Signup.css'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const { signup, error, isPending } = useSignup()
  
  
  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName, thumbnail)
  }
  
  const handleFileChange = (e) => {
    setThumbnailError(null)
    const file = e.target.files[0]
    //! limit size and only image and not null
    console.log(file.size)
    if(!file){
      setThumbnailError('Please select a file')
      return
    }

    if(file.size > 2600000){
      setThumbnailError('Image file size must be less than 2.5MB')
      return
    }
    
    if(file.type.split('/')[0] !== 'image'){
      setThumbnailError('File is not an image')
      return
    }
    
    console.log('added')
    setThumbnail(file)
  }
  
  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>sign up</h2>
      <label>
        <span>email:</span>
        <input
          required 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          autoComplete='true'
          value={password}
        />
      </label>
      <label>
        <span>display name:</span>
        <input
          required
          type="text" 
          onChange={(e) => setDisplayName(e.target.value)} 
          value={displayName}
        />
      </label>
      <label>
        <span>Profile thumbnail:</span>
        <input 
          required
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      {!isPending && <button className="btn">Sign up</button>}
      {isPending && <button className="btn" disabled>loading</button>}
      {error && <div className="error">{error}</div>}
    </form>

  )
}
