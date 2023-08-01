import axios from "axios";

export default async function imageUpload(image: any) {
  let uploadImageString = "";
  const formDataImage = new FormData();
  formDataImage.append("file", image);
  //@ts-ignore
  formDataImage.append("upload_preset", 'yq4r89d5');
  await axios
    .post(
      `https://api.cloudinary.com/v1_1/dutpmjl01/image/upload`,
      formDataImage
    )
    .then((res: any) => {
      uploadImageString = res.data.url;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });

  return uploadImageString;
}
