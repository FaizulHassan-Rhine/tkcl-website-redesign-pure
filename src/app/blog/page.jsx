



import { metadata as pageMeta } from '@/seo/metadatas';
import AllBlog from "@/components/blogComponent/AllBlog";

export const metadata = {
  title: pageMeta.blog.title,
  description: pageMeta.blog.description,
  alternates: {
    canonical: pageMeta.blog.link,
  },
};


export default  function Page() {
  
  return (
    <>
      <AllBlog />
    </>
  );
}