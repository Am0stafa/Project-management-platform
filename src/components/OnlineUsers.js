import firebase from 'firebase/app'
import 'firebase/firestore'

import { useAuthContext } from '../hooks/useAuthContext';
import { useCollection } from '../hooks/useCollection'
import Avatar from './Avatar'
import './OnlineUsers.css'

export default function OnlineUsers() {
  const {user} = useAuthContext();
  const { documents, error } = useCollection('users', [firebase.firestore.FieldPath.documentId(), "!=", user.uid])  

 
  return (
    <div className="user-list">
      <h2>All Users</h2>
      {documents && documents.map(user => (
        <div key={user.id} className="user-list-item">
          {user.online ? <span className="online-user"></span> : <span className="offline-user"></span> }
          <span>{user.displayName}</span>
          <Avatar src={user.photoURL} />
        </div>
      ))}
      {error && <div>{error}</div>}
    </div>
  )
}
