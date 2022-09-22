import { useCollection } from '../../hooks/useCollection'
import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import './Dashboard.css'
import ProjectFilter from './ProjectFilter';
import ProjectList from '../../components/ProjectList';

export default function Dashboard() {

  const { user } = useAuthContext()
  const { documents, error } = useCollection('projects')
  const [filter, setFilter] = useState('all')
  
  const changeFilter = () => {
  
  
  }
  
  if (!documents) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
         {error && <p className="error">{error}</p>}
         {documents && <ProjectFilter changeFilter={changeFilter} />}
         {documents && <ProjectList projects={documents} />}
    </div>
  )
}
