import './BlogContent.css';

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  // We apply the project's styling class "blog-content-prose" instead of Tailwind's "prose max-w-none"
  return (
    <div 
      className="blog-content-prose"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
