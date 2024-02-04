import { requestWithCleanData } from "@/web/posts/request"

const deletePost = (postId) => async () => {
  await requestWithCleanData(`posts/${postId}`,"DELETE")
}

export default deletePost