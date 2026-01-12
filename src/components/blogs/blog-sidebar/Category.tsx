import { useBlogDetails } from "@/hooks/useBlogDetails";


const Category = () => {
    const { blogCategory = [], loading, error } = useBlogDetails();
   return (
      <div className="tg-blog-categories tg-blog-sidebar-box mb-40">
         <h5 className="tg-blog-sidebar-title mb-5">Categories</h5>
         <div className="tg-blog-categories-list">
            <ul>
               {blogCategory.map((item) => (
                  <li key={item.category_id}>
                     <span>{item.name}</span>
                     <span>({item.blog_count})</span>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   )
}

export default Category
