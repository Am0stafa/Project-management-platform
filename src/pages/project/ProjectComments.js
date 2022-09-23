import { useState } from "react"
import { timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"
import Avatar from "../../components/Avatar"
import { v4 as uuidv4 } from 'uuid';


const ProjectComments = ({project}) => {
  const { user } = useAuthContext()
  const { updateDocument, response } = useFirestore('projects')
  const [newComment, setNewComment] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const comment = {
      displayName:user.displayName,
      photoURL:user.photoURL,
      content:newComment,
      createdAt:timestamp.fromDate(new Date()),
      id:uuidv4()
    }

    await updateDocument(project.id,{
      comments:[...project.comments, comment],
    })

    if (!response.error)
      setNewComment('')
    else
      console.log(response.error)
  }

  return (
    <div className="project-comments">
      <h4>Project Comments</h4>
      
      <ul>
        {project.comments?.map(comment => (
          <li key={comment.id}>
            <div className="comment-author">
              <Avatar src={comment.photoURL} />
                <p>{comment.displayName}</p>
            </div>
            <div className="comment-date">
              {
                // <p>{formatDistanceToNow(comment.createdAt.toDate(), {addSuffix: true})}</p>
              }
            </div>
            <div className="comment-content">
              <p>{comment.content}</p>
            </div>
          </li>
        ))}
      </ul>
      
      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea
            style={{resize: "none"}}
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button className="btn">Add Comment</button>
      </form>
    </div>
  )
}

export default ProjectComments