import { emailValidator, passwordValidator, firstnameValidator, lastnameValidator } from "@/utils/validators"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import SubmitButton from "@/web/components/ui/SubmitButton"
import { createResource } from "@/web/services/apiClient"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"
import { object } from "yup"
import { useRouter } from "next/router"

const initialValues = {
  email: "",
  password: "",
  firstname: "",
  lastname: "",
}
const validationSchema = object({
  email: emailValidator.required().label("E-mail"),
  password: passwordValidator.required().label("Password"),
  firstname: firstnameValidator.required().label("First Name"),
  lastname: lastnameValidator.required().label("Last Name"),
})
const SignUpPage = () => {
  const router = useRouter()
  const { mutateAsync } = useMutation({
    mutationFn: (data) => createResource("users", data),
  })
  const handleSubmit = async ({ email, password, firstname, lastname}) => {
    await mutateAsync({ email, password, firstname, lastname })
    router.push(`/sign-in`)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
      <FormField
          name="firstname"
          type="text"
          placeholder="Enter your first name"
          label="FirstName"
        />
        <FormField
          name="lastname"
          type="text"
          placeholder="Enter your last name"
          label="LastName"
        />
        <FormField
          name="email"
          type="email"
          placeholder="Enter your e-mail"
          label="E-mail"
        />
        <FormField
          name="password"
          type="password"
          placeholder="Enter your password"
          label="Password"
        />
        <SubmitButton>Sign Up</SubmitButton>
      </Form>
    </Formik>
  )
}

export default SignUpPage
