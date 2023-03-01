import { getJwtToken } from "../apis/auth";
export async function request(
  url,
  { method = "GET", body, headers, auth = true } = {}
) {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
      ...(auth && { Authorization: `Bearer ${getJwtToken()}` }),
    },
    // 利用&&短路特性 只有body有值时才结构赋值
    ...(body && { body: JSON.stringify(body) }),
  });
  const result = await res.json();
  return result;
}
