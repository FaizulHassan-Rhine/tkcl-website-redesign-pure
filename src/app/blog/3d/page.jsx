


import { metadata as pageMeta } from '@/seo/metadatas';


import Blog3D from "@/components/blogComponent/Blog3D";
import FooterGrid from '@/components/FooterNew';


export const metadata = {
  title: pageMeta.blog3D.title,
  description: pageMeta.blog3D.description,
  alternates: {
    canonical: pageMeta.blog3D.link,
  },
};

export default  function Page() {
  
  return (
    <>
     
      <Blog3D />
      <FooterGrid/>
    </>
  );
}