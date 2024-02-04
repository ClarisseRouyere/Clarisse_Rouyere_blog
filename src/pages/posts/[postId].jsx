import CommentSection from "@/web/components/comments/CommentSection"
import getPostById from "@/web/services/posts/getPostById"
import Button from "@/web/components/ui/Button"
import deletePost from "@/web/posts/deletePost"
import { useCallback } from "react"
import { useRouter } from "next/navigation"
import webConfig from "@/web/webConfig"
import { useSession } from "@/web/components/SessionContext"

export const getServerSideProps = async ({ query: { postId } }) => {
  const {
    data: {
      result: [post],
    },
  } = await getPostById(postId)

  return {
    props: {
      post,
    },
  }
}
const PostPage = ({
  post: {
    id,
    title,
    content,
    user: { firstName, lastName },
    comments,
  },
}) => {
  const router = useRouter()
  const { session } = useSession()
  const handleDeletePost = useCallback(async () => {
    const token = localStorage.getItem(webConfig.security.session.cookie.key)
    await deletePost(id, token, router)
    router.push("/")
  }, [router, id])

  return (
    <main>
    <section>
        <h2>{title}</h2>
        <div className="flex w-full gap-4 mt-5 items-center">
        <h3>
            {firstName} {lastName}
        </h3>
        </div>
    </section>
    <p>{content}</p>
    {session && session.isAuthor && (
        <section>
        <Button onClick={handleDeletePost}>
            Delete post
        </Button>
        </section>
    )}
    <div className="flex gap-3 items-center mt-6">
    </div>
    <CommentSection comments={comments} postId={id} />
    </main>
  )
}

export default PostPage