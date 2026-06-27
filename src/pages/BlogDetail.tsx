import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, PhoneCall } from 'lucide-react';
import { blogService, type Blog } from '../services/blogService';
import BlogHero from '../components/BlogHero';
import TableOfContents from '../components/TableOfContents';
import BlogContent from '../components/BlogContent';
import RelatedBlogs from '../components/RelatedBlogs';
import './BlogDetail.css';

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [prevBlog, setPrevBlog] = useState<Blog | null>(null);
  const [nextBlog, setNextBlog] = useState<Blog | null>(null);

  useEffect(() => {
    // Scroll to top on navigation
    window.scrollTo(0, 0);

    const fetchBlogData = async () => {
      setLoading(true);
      if (!slug) return;
      
      const currentBlog = await blogService.getBlogBySlug(slug);
      setBlog(currentBlog);

      if (currentBlog) {
        // Fetch prev/next based on all blogs
        const allBlogs = await blogService.getAllBlogs();
        // Sort by date to maintain consistent order
        const sorted = allBlogs.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
        const currentIndex = sorted.findIndex(b => b.id === currentBlog.id);
        
        if (currentIndex > 0) setNextBlog(sorted[currentIndex - 1]); // Newer is "Next" usually, but let's just use adjacent
        else setNextBlog(null);

        if (currentIndex < sorted.length - 1) setPrevBlog(sorted[currentIndex + 1]);
        else setPrevBlog(null);
      }
      setLoading(false);
    };

    fetchBlogData();
  }, [slug]);

  if (loading) {
    return <div className="blog-loading">Loading article...</div>;
  }

  if (!blog) {
    return <div className="blog-not-found">Article not found. <Link to="/">Return home</Link></div>;
  }

  return (
    <article className="blog-detail-page">
      <BlogHero blog={blog} />

      <div className="blog-detail-container">
        <aside className="blog-detail-sidebar">
          <TableOfContents content={blog.content} />
        </aside>
        
        <main className="blog-detail-main">
          <BlogContent content={blog.content} />

          <section className="blog-cta-section">
            <div className="blog-cta-content">
              <h3>Need Expert Help?</h3>
              <p>Our team of seasoned consultants is ready to help you implement these strategies and drive your business forward.</p>
            </div>
            {/* Navigates to home page hash contact if implemented */}
            <Link to="/#contact" className="blog-cta-button">
              <PhoneCall size={18} />
              Book a Call
            </Link>
          </section>

          <nav className="blog-pagination">
            {prevBlog ? (
              <Link to={`/blog/${prevBlog.slug}`} className="blog-pagination-link prev">
                <ChevronLeft size={20} />
                <div className="pagination-text">
                  <span className="pagination-label">Previous Article</span>
                  <span className="pagination-title">{prevBlog.title}</span>
                </div>
              </Link>
            ) : <div />}
            
            {nextBlog ? (
              <Link to={`/blog/${nextBlog.slug}`} className="blog-pagination-link next">
                <div className="pagination-text right">
                  <span className="pagination-label">Next Article</span>
                  <span className="pagination-title">{nextBlog.title}</span>
                </div>
                <ChevronRight size={20} />
              </Link>
            ) : <div />}
          </nav>
        </main>
      </div>

      <RelatedBlogs category={blog.category} currentSlug={blog.slug} />
    </article>
  );
}
