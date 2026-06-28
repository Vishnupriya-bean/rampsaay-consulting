import { useEffect, useState } from 'react';
import './TableOfContents.css';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Decode HTML first if it is entity-encoded
    const txt = document.createElement("textarea");
    txt.innerHTML = content;
    const decodedContent = txt.value;

    // Simple regex to extract headings from HTML string
    const regex = /<h([2-3])[^>]*>(.*?)<\/h\1>/g;
    const extracted: TOCItem[] = [];
    let match;

    while ((match = regex.exec(decodedContent)) !== null) {
      const level = parseInt(match[1]);
      const title = match[2].replace(/<[^>]+>/g, ''); // strip any inner tags
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      extracted.push({ id, title, level });
    }

    setHeadings(extracted);
  }, [content]);

  useEffect(() => {
    // Intersection Observer to highlight active TOC item
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    // Give the DOM a tiny bit to render the injected IDs
    setTimeout(() => {
      headings.forEach((heading) => {
        const el = document.getElementById(heading.id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="toc-nav">
      <h3 className="toc-title">Table of Contents</h3>
      <ul className="toc-list">
        {headings.map((heading, index) => (
          <li 
            key={index} 
            className={`toc-item level-${heading.level} ${activeId === heading.id ? 'active' : ''}`}
          >
            <a href={`#${heading.id}`}>{heading.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
