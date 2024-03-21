import '@/assets/styles/global.css';
import NavBar from '@/components/NavBar.jsx';
import Footer from '@/components/Footer.jsx';
import AuthProvider from '@/components/AuthProvider.jsx';

export const metadata = {
  title: 'PropertyPulse | Find The Perfect Rental',
  description: 'Find you dream rental property',
  keywords: 'rental, find rentals, find properties',
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang='en'>
        <body>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
