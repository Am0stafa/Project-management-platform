import { useState } from 'react'
const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales'] //^ output a button for each one

const ProjectFilter = ({changeFilter}) => {
  const [currentFilter, setCurrentFilter] = useState('all')

  const handleClick = (filter) => {
    setCurrentFilter(filter)
  
  }

  return (
    <div className="project-filter">
        <nav>
          <p>Filter by: </p>
          {
            filterList.map((filter,id) =>(
              <button 
                key={id} 
                className={currentFilter === filter ? 'active' : ''} 
                onClick={() => handleClick(filter)}
              >
                {filter}
              </button>
            ))
          }
        </nav>
    
    </div>
  )
}

export default ProjectFilter
//! nav with all of the different buttons we can click to add different filters