//! takes in some documents and output on a list of those documents
import { Link } from 'react-router-dom'
import Avatar from '../components/Avatar'
import { useCollection } from '../hooks/useCollection'
import './ProjectList.css'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default function ProjectList({ projects }) {
  
  const change = () => {
    const pro = [...projects]
    const answer = []
    
    pro.forEach(project =>{
      const assignedUsersList = project?.assignedUsersList?.map((ass)=>{
          const { documents, error } = useCollection('users', [firebase.firestore.FieldPath.documentId(), "==", ass])
          return documents?.[0]

      })
      
      const { documents:cb, error } = useCollection('users', [firebase.firestore.FieldPath.documentId(), "==", project.createdBy])  
      
      answer.push({
        ...project,
        assignedUsersList,
        createdBy:cb?.[0]
      })

    })

    return answer
  }
  const pros = change()
  
  const getCategoryColor = (category) => {
    switch(category) {
      case 'development': return '#4CAF50';  // Green
      case 'bug': return '#FFC107';          // Yellow
      case 'security issue': return '#F44336';  // Red
      case 'business issue': return '#2196F3';  // Blue
      default: return '#9E9E9E';              // Grey for unknown categories
    }
  }
  

  return (
    <div className="project-list">
      {pros?.length === 0 && <p>No Tasks yet!!</p>}
      {pros?.map((project) => (
        <Link to={`/projects/${project.id}`} key={project?.id ?? Math.random()}>
          <h4>{project?.name}</h4>
          <p>Due by {project?.dueDate.toDate().toDateString()}</p>
          <span style={{ backgroundColor: getCategoryColor(project?.category), padding: '2px 8px', borderRadius: '4px', marginLeft: '8px' }}>
              {project?.category}
          </span>

          <div className="assigned-to">
            <p><strong>Assigned to:</strong></p>
            <ul>
              {project?.assignedUsersList.map(user => (
                <li key={user?.photoURL ?? Math.random()}>
                  <Avatar src={user?.photoURL} />
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  )
}
