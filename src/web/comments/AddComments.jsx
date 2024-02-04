/* eslint-disable react-hooks/rules-of-hooks */
import { commentValidator } from "@/utils/validators"
import Button from "@/web/components/ui/Button"
import FormField from "@/web/components/ui/FormField"
import addComment from "@/web/services/addComment"
import { useMutation } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { object } from "yup"

const initialValues = {
  content: "",
}
const validationSchema = object({
  content: commentValidator.required("A comment can't be empty"),
})
const addComments= ({ postId, ...otherProps }) => {
  const router = useRouter()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { mutateAsync } = useMutation({
    mutationFn: (content) =>
      addComment(
        [
          postId,
          content,
        ],
        router,
      ),
  })
  const handleSubmit = async ({ content }) => {
    await mutateAsync(content)
    router.push(`/post/${postId}`)
  }

  return (
    <div {...otherProps}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className="mt-3">
          <FormField
            name="content"
            placeholder="Content"
            label="Any thoughts on the matter ?"
          />
          <Button type="submit" variant="primary" className="mt-3">
            Add a comment
          </Button>
        </Form>
      </Formik>
    </div>
  )
}

export default addComments