import Link from "@/web/components/ui/Link"

const PostHeadline = ({ id, firstName, lastName }) => (
    <article className="flex flex-col gap-4">
    <Link href={`/posts/${id}`}className="flex justify-center" >{firstName} {lastName}</Link>
  </article>
)

export default PostHeadline