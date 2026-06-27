import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { homepageService, type HomepageData } from '../services/homepageService';

interface HomepageContextType {
  data: HomepageData | null;
  loading: boolean;
  error: string | null;
}

const HomepageContext = createContext<HomepageContextType | undefined>(undefined);

export const HomepageProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await homepageService.getHomepageData();
        setData(result);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch homepage data:", err);
        setError("Failed to load homepage data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <HomepageContext.Provider value={{ data, loading, error }}>
      {children}
    </HomepageContext.Provider>
  );
};

export const useHomepage = () => {
  const context = useContext(HomepageContext);
  if (context === undefined) {
    throw new Error('useHomepage must be used within a HomepageProvider');
  }
  return context;
};
