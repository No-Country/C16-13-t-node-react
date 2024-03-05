import { Footer } from './Footer';
import { Navbar } from './Navbar';

export const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
      <>
          <Navbar />

          { children }

          <Footer />
      </>
  )

}
