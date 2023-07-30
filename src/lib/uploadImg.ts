import axios from "axios";

export default async function imageUpload(image: any) {
  let uploadImageString = "";
  const presetData = process.env.UPLOAD_PRESET_IMAGE_UPLOAD;
  const cloudName = process.env.CLOUD_NAME_IMAGE_UPLOAD;
  const formDataImage = new FormData();
  formDataImage.append("file", image);
  //@ts-ignore
  formDataImage.append("upload_preset", presetData);
  await axios
    .post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formDataImage
    )
    .then((res: any) => {
      uploadImageString = res.data.url;
    })
    .catch((error) => console.log(error));

  return uploadImageString;
}
