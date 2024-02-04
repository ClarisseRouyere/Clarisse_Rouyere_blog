import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/router"

const CommentForm = () => {
  const {
    query: { commentId },
  } = useRouter()
  const {
    data: { data: comment },
  } = useQuery({
    queryKey: ["comment"],
    queryFn: () => axios(`/api/comments/${commentId}`),
    enabled: Boolean(commentId),
    initialData: { data: {} },
  })

  return (
    <div className=" border-gray-800">
      <h2>
        {comment.result[0].user.firstName} {comment.result[0].user.lastName}
      </h2>
      <h3>Comment</h3>
      <span>{comment.result[0].comment}</span>
      </div>
  )
}

export default CommentForm