import firebase from 'firebase/app'
import 'firebase/firestore'
import { useEffect, useState } from 'react'
import './Create.css'
import Select from 'react-select'
import {useAuthContext} from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'


const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]

export default function Create() {
  const [name, setName] = useState('')
  const [users, setUsers] = useState([{}])
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)
  
  const { user } = useAuthContext();
  const { documents, error } = useCollection('users', [firebase.firestore.FieldPath.documentId(), "!=", user.uid])  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(assignedUsers)
  }
  
  useEffect(() => {
  
   documents?.forEach((el)=>{
      setUsers((prev)=>{
        const arr = [...prev]
        arr.push({
          label: el.displayName, value: el.id
        })
        return arr
      })
    })
        
  },[documents, error])
  
  
  return  !error && (
    <div className="create-form">
      <h2 className="page-title">Create a new Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            required 
            type="text" 
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            required
            style={{resize: "none"}}
            onChange={(e) => setDetails(e.target.value)}
            value={details} 
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required 
            type="date" 
            onChange={(e) => setDueDate(e.target.value)} 
            value={dueDate}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>

        <button className="btn">Add Project</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}
