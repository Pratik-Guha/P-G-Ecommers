import {  getProducts } from "@/lib/firestore/products/read_server";
import Photos from "./components/Photos";
import Details from "./components/Details";
import Reviews from "./components/Reviews";
import RelatedProducts from "./components/RelatedProducts";
import AddReview from "./components/AddReview";
import AuthContextProvider from "@/contexts/AuthContext";



export async function generateMetadata({ params }) {
  const { productId } = params;
  const product = await getProducts({ id: productId });

  return {
    title: `${product?.title} | Product`,
    description: product?.shortDescription ?? "",
    openGraph: {
      images: [product?.featureImageURL],
    },
  };
}

export default async function Page({ params }) {
  const { productId } = params;
  const product = await getProducts({ id: productId });
  return (
    <main className="p-5 md:p-10  gap-3">
      <section className="flex gap-3 flex-col md:flex-row">
      <Photos key={product?.id} imageList={[product?.featureImageURL ?? "", ...(product?.imageList ?? [])]} />
        <Details product={product} />
      </section>
      <div className="flex justify-center py-10">
        <div className="flex flex-col md:flex-row  gap-4 w-full md:max-w-[900px]">
        <AuthContextProvider>
        <AddReview productId={productId}/>
        <Reviews productId={productId}/>
        </AuthContextProvider>
        </div>
      </div>
      <RelatedProducts categoryId={product?.categoryId} />
    </main>
  );
}
