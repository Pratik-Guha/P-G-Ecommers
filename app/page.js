import Header from "./components/Header";
import FeaturedProductSlider from "./components/Sliders";
import ThemeToggleButton from "./toggle";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getFeaturedProducts, getProduct } from "@/lib/firestore/products/read_server";
import Collection from "./components/Collections";
import { getCollection } from "@/lib/firestore/collections/read_server";
import Category from "./components/Categories";
import { getCategories } from "@/lib/firestore/categories/read_server";
import ProductsGridView from "./components/Products";
import CustomerReview from "./components/CustomerReview";
import Brand from "./components/Brands";
import { getBrands } from "@/lib/firestore/brands/read_server";
import Footer from "./components/Footer";
import Reviews from "./admin/reviews/page";



export default async function Home() {

  const [featuredProducts, collections, categories, products, brands]=await Promise.all([
    getFeaturedProducts(),
    getCollection(),
    getCategories(),
    getProduct(),
    getBrands()
  ])
  return (
   <main className="overflow-y-auto h-screen overflow-x-hidden  w-screen">
      <Header/>
      <ThemeToggleButton/>
      <FeaturedProductSlider featuredProducts={featuredProducts}/>
      <Collection collections={collections}/>
      <Category categories={categories}/>
      <ProductsGridView products={products}/>
      <CustomerReview />
      <Brand brands={brands} />
      
      <Footer/>
   </main>
  );
}
