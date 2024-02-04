import webConfig from "@/web/webConfig"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"

const CommentStyle = ({
  comment: {
    content,
    user: { firstName, lastName },
  },
  className,
  ...otherProps
}) => (
  <div
    className={clsx(
      "flex gap-2 mt-5 border border-black",
      className,
    )}
    {...otherProps}
  >
    <div className="flex items-center">
      <UserCircleIcon width={webConfig.icon.s} height={webConfig.icon.s} />
      <h4>
        {firstName} {lastName}
      </h4>
    </div>
    <p>{content}</p>
  </div>
)

export default CommentStyle