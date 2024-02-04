import request from "../request"

const post= (title, content) => async () =>
  await request(`posts`, "POST", {
    title,
    content,
  })

export default post