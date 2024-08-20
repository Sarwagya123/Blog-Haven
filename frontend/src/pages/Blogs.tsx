import { useEffect } from "react";
import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
import { useNavigate } from "react-router-dom";

export const Blogs = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const handlePopState = () => {
          // This function will be called when the back button is pressed
          console.log('Back button pressed!');
          localStorage.removeItem("token");
          // Add your custom logic here
        //   window.history.pushState(null, "", window.location.href);
        };
    
        window.addEventListener('popstate', handlePopState);
      }, []);

        
    const { authenticated, loading, blogs } = useBlogs();

    if(!authenticated){
        window.alert("Please log in again to continue"); 
        navigate("/signin");
    }

    if (authenticated && loading) {
        return <div>
            <Appbar /> 
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return <div>
        <Appbar />
        <div  className="flex justify-center">
            <div>
                {blogs.map(blog => <BlogCard
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"2nd Feb 2024"}
                />)}
            </div>
        </div>
    </div>
}

