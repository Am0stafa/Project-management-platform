import { useState, useEffect } from 'react'
import { auth,storage,db } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, image) => {
    setError(null)
    setIsPending(true)
  
    try {
      // signup
      const res = await auth.createUserWithEmailAndPassword(email, password)

      if (!res) {
        throw new Error('Could not complete signup')
      }
      
    
      //! upload the image into user folder
      
      //^ this is the path that we want to user to upload an image to in our storage bucket
      const uploadPath = `thumbnail/${res.user.uid}/${image.name}`
      
      //^ so we can have a reference to a very specific space inside our bucket that we want to upload to 
      const img = await storage.ref(uploadPath).put(image)
      
      //^ get the url
      const photoURL = await img.ref.getDownloadURL()
      
      // add display name to user
      await res.user.updateProfile({ displayName, photoURL })
      
      //! create a user Document
      
      //^ this makes a reference to a new document inside the users collection with the user id as we cant use add as we want to add the user id. After that update the document so we create a new reference and add data to it
      await db.collection('users').doc(res.user.uid).set({
        online:true,
        displayName,
        photoURL,
      })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}