import axios from "axios"

const getMostRecentPosts = async () =>
  await axios.get("http://localhost:3000/api/posts")
export default getMostRecentPosts


export const getPostById = async (id) =>
  await axios.get(`http://localhost:3000/api/posts/${id}`)