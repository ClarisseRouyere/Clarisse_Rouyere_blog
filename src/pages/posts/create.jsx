import { contentValidator, titleValidator } from "@/utils/validators"
import Button from "@/web/components/ui/Button"
import FormField from "@/web/components/ui/FormField"
import addPost from "@/web/services/posts/addPost"
import { useMutation } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { object } from "yup"

const initialValues = {
  title: "",
  content: "",
}
const formFields = [
  {
    name: "title",
    type: "text",
    placeholder: "Title",
    label: "Enter a title",
  },
  {
    name: "content",
    as: "textarea",
    rows: 10,
    placeholder: "Content",
    label: "What's happening?",
  },
]
const validationSchema = object({
  title: titleValidator.required("Title is required"),
  content: contentValidator.required("Content is required"),
})
const CreatePost = () => {
  const router = useRouter()
    const { mutateAsync } = useMutation({
    mutationFn: ({ title, content }) =>
      addPost(
        [
          title,
          content,
        ],
        router,
      ),
  })
  const handleSubmit = async (values) => {
    await mutateAsync(values)
    router.push("/")
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className="flex flex-col gap-5 mx-12">
        {formFields.map((fieldData, key) => (
          <FormField {...fieldData} key={key} />
        ))}
        <Button type="submit">Create a post</Button>
      </Form>
    </Formik>
  )
}

export default CreatePost