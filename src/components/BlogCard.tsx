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
        
        <Link to={`/blog/${blog.slug}`} className="bce-read-more">
          Read Article <ArrowRight size={16} strokeWidth={1.5} />
        </Link>
      </div>
    </article>
  );
}
