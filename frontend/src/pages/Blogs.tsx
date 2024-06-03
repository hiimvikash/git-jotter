import { useEffect, useState } from "react"
import  BlogCard  from "../components/BlogCard"
import NavBar from "../components/NavBar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import BlogCardSkeleton from "../components/skeleton/BlogCardSkt";

interface Blog {
  id: number;
  title: string;
  author: {
    username: string;
  };
  createdAt: string;
}


function Blogs() {
  localStorage.removeItem("editTitle");
  localStorage.removeItem("editContent");
  
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const navigate = useNavigate();

    async function fetchBlogs(){
      setLoading(true);
      try {
        const res = await axios.get(`${BACKEND_URL}/blog/bulk`);
        setBlogs(res.data);
        if(res.data.message === "No blogs found")
          setBlogs([]);
      } catch (error) {
        navigate("/notfound")
      }
      setLoading(false);
    }  
  

  useEffect(()=>{
    setMounted(true);
    fetchBlogs();
  }, [])


  if(mounted){
    if(loading){
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-10 ">
          
        {[...Array(15)].map((_, index) => (
          <BlogCardSkeleton key={index} />
        ))}
          
        </div>
      )
    }
  return (
    <div>
      <NavBar/>
      {
        (blogs.length === 0) ? (
          <div className="h-[92vh] flex items-center justify-center">
            <h2 className="text-xl text-gray-700">No Jotters found.</h2>
          </div>
        ) : 
        (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-10 ">
            {
              blogs.map(blog => (
                <BlogCard key= {blog.id} id={blog.id} title={blog.title} author={blog.author.username} date={blog.createdAt.split("T")[0]} />
              ))
            }
          </div>
        )
      }
      
    </div>
  )
}
}

export default Blogs





