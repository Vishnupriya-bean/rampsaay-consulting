import './BlogContent.css';

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  // Decode HTML entities if Directus returns encoded HTML (e.g. &lt;h2&gt;)
  const decodeHTML = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  
  const decodedContent = decodeHTML(content);

  // Add IDs to headings so TOC links work
  const contentWithIds = decodedContent.replace(
    /<h([2-3])[^>]*>(.*?)<\/h\1>/g,
    (_match, level, title) => {
      const cleanTitle = title.replace(/<[^>]+>/g, '');
      const id = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return `<h${level} id="${id}">${title}</h${level}>`;
    }
  );

  return (
    <div 
      className="blog-content-prose"
      dangerouslySetInnerHTML={{ __html: contentWithIds }}
    />
  );
}
