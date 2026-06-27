import { readItems } from '@directus/sdk';
import { directus } from '../lib/directus';

export interface HomepageData {
  id: number;
  company_name: string;
  tagline: string;
  description: string;
  primary_button_text: string;
  primary_button_link: string;
  secondary_button_text: string;
  secondary_button_link: string;
  quote: string;
  nav_home: string;
  nav_services: string;
  nav_contact: string;
  nav_button_text: string;
  business_type: string;
  country: string;
  company_name_in_component: string;
  company_policy: string;
  practice_heading: string;
  practice_subheading: string;
  practice_description: string;
  service1_icon: string;
  service1_title: string;
  service1_description: string;
  service1_feature1: string;
  service1_feature2: string;
  service1_feature3: string;
  service2_icon: string;
  service2_title: string;
  service2_description: string;
  service2_feature1: string;
  service2_feature2: string;
  service2_feature3: string;
  service3_icon: string;
  service3_title: string;
  service3_description: string;
  service3_feature1: string;
  service3_feature2: string;
  service3_feature3: string;
  section_number: string;
  section3_label: string;
  section2_number: string;
  section2_label: string;
  contact_heading: string;
  contact_description: string;
  email_label: string;
  email: string;
  email_description: string;
  phone_label: string;
  phone: string;
  phone_description: string;
  footer_company_name: string;
  footer_copyright: string;
}

export const homepageService = {
  async getHomepageData(): Promise<HomepageData | null> {
    const response = await directus.request(
      readItems('homepage', {
        limit: 1,
      })
    );
    return response.length > 0 ? response[0] as HomepageData : null;
  }
};
