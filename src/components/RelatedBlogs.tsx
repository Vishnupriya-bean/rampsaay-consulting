import { useEffect, useState } from 'react';
import { blogService, type Blog } from '../services/blogService';
import BlogGrid from './BlogGrid';

interface RelatedBlogsProps {
  category: string;
  currentSlug: string;
}

export default function RelatedBlogs({ category, currentSlug }: RelatedBlogsProps) {
  const [related, setRelated] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchRelated = async () => {
      // Find current blog to pass currentId to service
      const currentBlog = await blogService.getBlogBySlug(currentSlug);
      if (currentBlog) {
        const blogs = await blogService.getRelatedBlogs(category, currentBlog.id, -1);
        setRelated(blogs);
      }
    };
    fetchRelated();
  }, [category, currentSlug]);

  if (related.length === 0) return null;

  return (
    <RelatedWrapper category={category} related={related} />
  );
}

// Separate wrapper to reuse BlogGrid without passing title directly into grid if we want different padding.
// For now, BlogGrid is self-contained.
function RelatedWrapper({ category, related }: { category: string, related: Blog[] }) {
  return (
    <div style={{ marginTop: '80px', borderTop: '1px solid var(--border)' }}>
      <BlogGrid blogs={related} title="Related Articles" subtitle={`More from ${category}`} />
    </div>
  );
}
