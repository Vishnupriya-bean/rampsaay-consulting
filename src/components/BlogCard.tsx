import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { type Blog } from '../services/blogService';
import './BlogCard.css';

interface BlogCardProps {
  blog: Blog;
  featured?: boolean;
}

export default function BlogCard({ blog, featured = false }: BlogCardProps) {
  const formattedDate = new Date(blog.publishedDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className={`blog-card-editorial ${featured ? 'featured' : ''}`}>
      <Link to={`/blog/${blog.slug}`} className="bce-image-link">
        <div className="bce-image-wrapper">
          <img src={blog.featuredImage} alt={blog.title} className="bce-image" />
        </div>
      </Link>
      
      <div className="bce-content">
        <div className="bce-meta">
          <span className="bce-category">{blog.category}</span>
          <span className="bce-divider"></span>
          <span className="bce-date">{formattedDate}</span>
          <span className="bce-divider"></span>
          <span className="bce-read">{blog.readTime}</span>
        </div>
        
        <h3 className="bce-title">
          <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h3>
        
        <p className="bce-excerpt">{blog.excerpt}</p>
        
        <div className="bce-footer">
          <Link to={`/blog/${blog.slug}`} className="bce-read-more">
            Read Article <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
          
          <div className="bce-social-share">
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://rampsaayconsulting.xyz/blog/${blog.slug}`)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://rampsaayconsulting.xyz/blog/${blog.slug}`)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://rampsaayconsulting.xyz/blog/${blog.slug}`)}&text=${encodeURIComponent(blog.title)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title)} ${encodeURIComponent(`https://rampsaayconsulting.xyz/blog/${blog.slug}`)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.891-4.444 9.893-9.892.001-5.447-4.445-9.89-9.893-9.89-5.448 0-9.893 4.443-9.893 9.89 0 1.996.53 3.864 1.517 5.513l-1.026 3.748 3.91-1.025zm11.411-9.923c-.302-.15-1.787-.881-2.064-.981-.277-.099-.48-.15-.682.15-.201.302-.778.981-.954 1.18-.175.199-.351.225-.653.075-1.637-.816-2.92-1.488-4.084-3.328-.176-.277.018-.428.169-.578.136-.136.302-.352.453-.528.151-.176.201-.301.302-.502.1-.2.05-.376-.025-.526-.075-.15-.682-1.644-.934-2.25-.245-.591-.493-.51-.682-.52-.176-.01-.377-.01-.579-.01-.202 0-.528.075-.805.376-.277.301-1.056 1.03-1.056 2.511 0 1.481 1.082 2.912 1.233 3.112.151.201 2.122 3.238 5.14 4.54.718.31 1.278.495 1.715.634.72.23 1.376.197 1.895.12.58-.086 1.787-.73 2.039-1.436.252-.705.252-1.31.176-1.437-.076-.126-.277-.201-.579-.351z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
