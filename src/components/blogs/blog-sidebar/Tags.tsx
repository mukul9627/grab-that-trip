import Link from "next/link"
import { useBlogDetails } from "@/hooks/useBlogDetails";



const Tags = () => {
    const { blogTag = [], loading, error } = useBlogDetails();
   return (
      <div className="tg-blog-sidebar-tag tg-blog-sidebar-box">
         <h5 className="tg-blog-sidebar-title mb-25">Tags</h5>
         <div className="tg-blog-sidebar-tag-list">
            <ul>
               {blogTag.map((blogTag, i) => (
                  <li key={i}><Link href="#">{blogTag.tag_name}</Link></li>
               ))}
            </ul>
         </div>
      </div>
   )
}

export default Tags
