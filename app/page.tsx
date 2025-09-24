import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/ui/CartSidebar';
import HeroSection from '@/components/shared/HeroSection';
import CategoriesSection from '@/components/shared/CategoriesSection';
import FeaturedProducts from '@/components/product/FeaturedProducts';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts />
      </main>
      <Footer />
      <CartSidebar />
    </div>
  );
}
