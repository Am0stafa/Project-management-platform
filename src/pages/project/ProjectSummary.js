import firebase from 'firebase/app'
import 'firebase/firestore'
import Avatar from "../../components/Avatar"
import { useFirestore } from "../../hooks/useFirestore"
import { useHistory } from 'react-router-dom'
import { useAuthContext } from "../../hooks/useAuthContext"
import { useCollection } from '../../hooks/useCollection';
import { useDocument } from '../../hooks/useDocument';

const ProjectSummary = ({project}) => {
  const { deleteDocument } = useFirestore('projects')
  const { user } = useAuthContext()
  const history = useHistory()


  const change = () => {
    const assignedUsersList = project.assignedUsersList.map((ass)=>{
      const { documents, error } = useCollection('users', [firebase.firestore.FieldPath.documentId(), "==", ass])
      return documents?.[0]
    })  
    return assignedUsersList
  }
  const pros = change()

  const handleClick = (e) =>{
    deleteDocument(project.id)
    history.push('/')
  }
  
  const { document, error } = useDocument('users',project.createdBy)
  console.log(document)
  
  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p>By {document?.displayName}</p>
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">
          {project.details}
        </p>
        <h4>Project assigned to:</h4>
        <div className="assigned-users">
          {pros?.map(user => (
            <div key={user?.id}>
              <Avatar src={user?.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createdBy && (
        <button className="btn" onClick={handleClick}>Mark as Complete</button>
      )}
    </div>
  )
}

export default ProjectSummary