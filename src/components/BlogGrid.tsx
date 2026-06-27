import { type Blog } from '../services/blogService';
import BlogCard from './BlogCard';
import './BlogGrid.css';

interface BlogGridProps {
  blogs: Blog[];
  title?: string;
  subtitle?: string;
}

export default function BlogGrid({ blogs, title, subtitle }: BlogGridProps) {
  if (!blogs || blogs.length === 0) return null;

  return (
    <section id="latest-insights" className="editorial-grid-section">
      <div className="editorial-grid-container">
        {(title || subtitle) && (
          <div className="editorial-grid-header">
            {title && <h2 className="editorial-grid-title">{title}</h2>}
            {subtitle && <p className="editorial-grid-subtitle">{subtitle}</p>}
            <div className="editorial-header-line"></div>
          </div>
        )}
        
        <div className="editorial-grid">
          {blogs.map((blog, index) => (
            <BlogCard 
              key={blog.id} 
              blog={blog} 
              featured={index === 0} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
