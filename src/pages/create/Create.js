import firebase from 'firebase/app'
import 'firebase/firestore'
import { timestamp } from '../../firebase/config'
import { useEffect, useState } from 'react'
import './Create.css'
import Select from 'react-select'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useFirestore } from '../../hooks/useFirestore'
import { useNavigate } from 'react-router-dom'


const categories = [
  { value: 'development', label: 'Development' },
  { value: 'bug', label: 'Bug' },
  { value: 'security issue', label: 'Security issue' },
  { value: 'business issue', label: 'Business issue' },
]

export default function Create() {
  const [name, setName] = useState('')
  const [users, setUsers] = useState([{}])
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)
  
  const { addDocument, response } = useFirestore('projects')
  const { user } = useAuthContext();
  const { documents, error } = useCollection('users', [firebase.firestore.FieldPath.documentId(), "!=", user.uid])  
  const history = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)
          
    if(!category || assignedUsers.length < 1){
      setFormError("Missing fields")
      return
    }
    
    const assignedUsersList = assignedUsers.map((u)=>{
      return u.value
    })
    
    //! this is the document that we will save in the database
    const project = {
      name,
      details,
      assignedUsersList,
      createdBy:user.uid,
      category,
      dueDate:timestamp.fromDate(new Date(dueDate)),
      comments:[],
      type:'Task Ready'
    };
    
    await addDocument(project)

    // get all the users from the assignedUsersList
    assignedList = project?.assignedUsersList?.map((ass)=>{
      const { documents } = useCollection('users', [firebase.firestore.FieldPath.documentId(), "==", ass])
      return documents?.[0]

      })

    // get how is it created by from the createdBy
    const { documents:createdUser } = useCollection('users', [firebase.firestore.FieldPath.documentId(), "==", project.createdBy])
    
    //send email using cloud function


    if (!response.error) {
      history('/')
    }
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
      <h2 className="page-title">Create a new Task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Task name:</span>
          <input
            required 
            type="text" 
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Task Details:</span>
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
          <span>Task category:</span>
          <Select
            onChange={(option) => setCategory(option.value)}
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
