import '@/assets/styles/global.css';
import NavBar from '@/components/NavBar.jsx';

export const metadata = {
  title: 'PropertyPulse | Find The Perfect Rental',
  description: 'Find you dream rental property',
  keywords: 'rental, find rentals, find properties',
};

const MainLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
