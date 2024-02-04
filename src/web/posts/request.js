import webConfig from "@/web/webConfig"
import axios from "axios"

export const requestWithCleanData = async (
  url,
  method = "GET",
) =>
  await axios[method.toLowerCase()]`/api/${url}`
const request = async (url, method = "GET", data = {}) => {
  const { cleanData } = data

  return await axios[method.toLowerCase()](
    `${webConfig.api.url}/${url}`,
    { cleanData },
  )
}
export default request