import { NavLink } from "react-router-dom"
import { useAuthContext } from '../hooks/useAuthContext'
import { useEffect, useRef } from "react"
import "./Sidebar.css"
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import Avatar from "./Avatar"

export default function Sidebar() {
  const {user}= useAuthContext()
  const ref = useRef()

  useEffect(() => {
    console.log(ref.current)
  })


  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={ user.photoURL}/> 
          <p>{ user?.displayName}</p>
        </div>
        
        <nav className="links">
          <ul>
            <li>
              <NavLink to="/" end>
                  <img src={DashboardIcon} alt="DashboardIcon"/>
                  <span>Dashboard</span>
              </NavLink>
            </li>
            
            <li>
              <NavLink to="create" >
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
