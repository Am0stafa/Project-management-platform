import { NavLink } from "react-router-dom"
import { useAuthContext } from '../hooks/useAuthContext'

import "./Sidebar.css"
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'

export default function Sidebar() {
  const {user}= useAuthContext()
  
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <p> hello abdo</p>
        </div>
        
        <nav className="links">
          <ul>
            <li>
              <NavLink to="/dashboard">
                <img src={DashboardIcon} alt="DashboardIcon"/>
                <span>Dashboard</span>
              </NavLink>
            </li>
            
            <li>
              <NavLink to="/create">
                <img src={AddIcon} alt="AddIcon"/>
                <span>New project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        
        
      </div>
    </div>
  )
}
//? show us the dashboard and create page