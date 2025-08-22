


import { metadata as pageMeta } from '@/seo/metadatas';

import Blog2D from "@/components/blogComponent/Blog2D";
;

export const metadata = {
  title: pageMeta.blog2D.title,
  description: pageMeta.blog2D.description,
  alternates: {
    canonical: pageMeta.blog2D.link,
  },
};


export default  function Page() {
  
  return (
    <>
     
      <Blog2D />
    </>
  );
}