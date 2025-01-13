import Banner from "@/app/components/banner/Banner";
import Store from "@/app/pages/Store";
import Product from "./components/products/Products";

export default async function Home() {
  return (
    <main className="max-w-contentContainer max-auto py-4 m-auto">
      <Banner />
    </main>
  );
}
