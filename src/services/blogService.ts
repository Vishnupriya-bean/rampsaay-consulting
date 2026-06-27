import { readItems } from '@directus/sdk';
import { directus, DIRECTUS_URL } from '../lib/directus';

export interface Blog {
  id: string;
  title: string;
  slug: string;
  category: string;
  featuredImage: string;
  publishedDate: string;
  readTime: string;
  excerpt: string;
  content: string;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
}

/**
 * Helper to get the full image URL from a Directus file ID
 */
export const getImageUrl = (imageId: string) => {
  if (!imageId) return '';
  if (imageId.startsWith('http')) return imageId;
  return `${DIRECTUS_URL}/assets/${imageId}`;
};

/**
 * Maps a Directus item to our Blog interface
 */
const mapDirectusBlog = (item: any): Blog => {
  return {
    id: item.id || '',
    title: item.title || '',
    slug: item.slug || '',
    category: item.category || '',
    featuredImage: getImageUrl(item.featured_image),
    publishedDate: item.published_date || '',
    readTime: item.read_time || '',
    excerpt: item.excerpt || '',
    content: item.content || '',
    featured: item.featured || false,
    seoTitle: item.seo_title || '',
    seoDescription: item.seo_description || ''
  };
};

export const blogService = {
  async getAllBlogs(): Promise<Blog[]> {
    const response = await directus.request(
      readItems('blogs', {
        fields: ['id', 'title', 'slug', 'category', 'featured_image', 'published_date', 'read_time', 'excerpt', 'content', 'featured', 'seo_title', 'seo_description'],
        sort: ['-published_date'],
      })
    );
    return response.map(mapDirectusBlog);
  },

  async getLatestBlogs(limit: number = 3): Promise<Blog[]> {
    const response = await directus.request(
      readItems('blogs', {
        fields: ['id', 'title', 'slug', 'category', 'featured_image', 'published_date', 'read_time', 'excerpt', 'content', 'featured', 'seo_title', 'seo_description'],
        sort: ['-published_date'],
        limit: limit,
      })
    );
    return response.map(mapDirectusBlog);
  },

  async getBlogBySlug(slug: string): Promise<Blog | null> {
    const response = await directus.request(
      readItems('blogs', {
        fields: ['id', 'title', 'slug', 'category', 'featured_image', 'published_date', 'read_time', 'excerpt', 'content', 'featured', 'seo_title', 'seo_description'],
        filter: { slug: { _eq: slug } },
        limit: 1,
      })
    );
    return response.length > 0 ? mapDirectusBlog(response[0]) : null;
  },

  async getRelatedBlogs(category: string, currentId: string, limit: number = 3): Promise<Blog[]> {
    const response = await directus.request(
      readItems('blogs', {
        fields: ['id', 'title', 'slug', 'category', 'featured_image', 'published_date', 'read_time', 'excerpt', 'content', 'featured', 'seo_title', 'seo_description'],
        filter: {
          category: { _eq: category },
          id: { _neq: currentId }
        },
        sort: ['-published_date'],
        limit: limit,
      })
    );
    return response.map(mapDirectusBlog);
  }
};
