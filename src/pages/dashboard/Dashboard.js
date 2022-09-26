import { useCollection } from '../../hooks/useCollection'
import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import './Dashboard.css'
import ProjectFilter from './ProjectFilter';
import ProjectList from '../../components/ProjectList';
import { useDocument } from '../../hooks/useDocument';

export default function Dashboard() {

  const { user } = useAuthContext()
  const { documents, error } = useCollection('projects')
  const [filter, setFilter] = useState('all')

  
  const changeFilter = (newFilter) => {
    setFilter(newFilter)
  }
  
  if (!documents && !error) {
    return <div className="loading">Loading...</div>
  }

  //! look at the filter state and based on that value filter the projects
  const project = documents ? documents.filter((document)=>{
    switch(filter){
      case 'all':
        return true
      case 'assigned to me':
        return document.assignedUsersList.map((id)=>{
          return user.uid === id
        }).includes(true)
      case 'development':
      case 'design':
      case 'sales':
      case 'marketing':
        return document.category === filter
      default:
        return true
    }
  
  }) : []


  
  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
         {error && <p className="error">{error}</p>}
         {documents && <ProjectFilter changeFilter={changeFilter} />}
         {documents && <ProjectList projects={project} />}
    </div>
  )
}
