import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Contact from '../components/Contact';
import BlogGrid from '../components/BlogGrid';
import { blogService, type Blog } from '../services/blogService';

export default function Home() {
  const [latestBlogs, setLatestBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const blogs = await blogService.getAllBlogs();
        setLatestBlogs(blogs);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Failed to load the latest insights. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <main>
      <Hero />
      <Services />
      <div style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {loading && <p style={{ textAlign: 'center', padding: '80px 0' }}>Loading latest insights...</p>}
        {error && <p style={{ color: 'red', textAlign: 'center', padding: '80px 0' }}>{error}</p>}
        {!loading && !error && (
          <BlogGrid 
            blogs={latestBlogs} 
            title="Latest Insights" 
            subtitle="Explore our latest thoughts on technology, engineering, and consulting." 
          />
        )}
      </div>
      <Contact />
    </main>
  );
}
