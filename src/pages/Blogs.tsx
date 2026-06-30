import { useEffect, useState } from 'react';
import { blogService, type Blog } from '../services/blogService';
import BlogGrid from '../components/BlogGrid';

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Scroll to top when opening the page
    window.scrollTo(0, 0);

    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch all blogs
        const allBlogs = await blogService.getAllBlogs();
        setBlogs(allBlogs);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {loading && <p style={{ textAlign: 'center', padding: '80px 0' }}>Loading blogs...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center', padding: '80px 0' }}>{error}</p>}
      {!loading && !error && (
        <BlogGrid 
          blogs={blogs} 
        />
      )}
    </main>
  );
}
