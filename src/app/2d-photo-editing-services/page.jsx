

import Twope from "./twope";
import { metadata as pageMeta } from '@/seo/metadatas';


export const metadata = {
  title: pageMeta.twodPhotoEditing.title,
  description: pageMeta.twodPhotoEditing.description,
  alternates: {
    canonical: pageMeta.twodPhotoEditing.link,
  },
};






export default  function Page() {
  
  return (
    <>
     
      <Twope />
    </>
  );
}