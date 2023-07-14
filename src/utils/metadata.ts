import { Metadata } from "next";

const setMetaData = (title:string,des="")=> {

const metadata: Metadata = {
  title,
  description: des,
};

return metadata;

}

export default setMetaData;