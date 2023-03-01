import { getJwtToken } from "./auth";

//strapi上传头像，要先上传图片，返回图片url，然后再绑定
//这里写上传图片的函数
export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("files", file);
  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
    headers: {
      authorization: `Bearer ${getJwtToken()}`,
    },
  });
  const result = await response.json();
  return result[0].url;
}
