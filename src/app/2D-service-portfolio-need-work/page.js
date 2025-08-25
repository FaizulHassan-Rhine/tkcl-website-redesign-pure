
// import api from "@/api/endpoint";
import { metadata as pageMeta } from '@/seo/metadatas';
import TwoService from "./twoservice";



export const metadata = {
  title: pageMeta.twoDservice.title,
  description: pageMeta.twoDservice.description,
  alternates: {
    canonical: pageMeta.twoDservice.link,
  },
};








export default  function Page() {
  
  return (
    <>
     
      <TwoService />
    </>
  );
}