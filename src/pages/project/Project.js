import { useParams } from "react-router-dom"
import { useDocument } from '../../hooks/useDocument'
import './Project.css'
import ProjectSummary from "./ProjectSummary"

export default function Project() {
  const { id } = useParams()
  const { document, error } = useDocument('projects',id)
  
  if (error) {
    return <div className="error">{error}</div>
  }
  if (!document) {
    return <div className="loading">Loading...</div>
  }
  
  

  return (
    <div>
      <ProjectSummary project={document}/>
    </div>
  )
}
