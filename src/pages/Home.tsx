import Hero from '../components/Hero';
import Services from '../components/Services';
import Contact from '../components/Contact';
import { useHomepage } from '../context/HomepageContext';

export default function Home() {
  const { loading: homepageLoading, error: homepageError } = useHomepage();

  if (homepageLoading) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading...</p>
      </main>
    );
  }

  if (homepageError) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'red' }}>{homepageError}</p>
      </main>
    );
  }

  return (
    <main>
      <Hero />
      <Services />
      <Contact />
    </main>
  );
}
