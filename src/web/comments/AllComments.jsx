import Comment from "@/web/comments/Comment.jsx"
import { useState } from "react"
import AddComment from "./AddComments.jsx"
import webConfig from "@/web/webConfig"

const initializeState = () => webConfig.pagination.limit
const AllComments = ({ comments, postId }) => {
  const [maxComments, setMaxComments] = useState(initializeState)
  const seeMoreComments = () => {
    setMaxComments(maxComments + 10)
  }

  return (
    <div className="mt-5">
      <h3>Comments</h3>
      <AddComment postId={postId} />
      {comments
        .map((comment) => (
          <Comment key={`${comment.id}`} comment={comment} />
        ))}
      {maxComments < comments.length && (
        <button onClick={seeMoreComments}>
          See more ....
        </button>
      )}
    </div>
  )
}
export default AllComments