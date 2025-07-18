import NavBar from '@/components/NavBar';
import { createClient } from '@/prismicio';

async function Header() {
  const client = createClient();
  const settings = await client.getSingle('settings');

  return (
    <header className="top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4">
      <NavBar settings={settings} />
    </header>
  );
}

export default Header;
