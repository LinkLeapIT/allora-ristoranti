import Banner from "@/app/components/banner/Banner";
import AboutUsComponent from "@/components/homeComponents/aboutUsComponent";

export default async function Home() {
  return (
    <main className="overflow-x-hidden">
      <Banner />
      <AboutUsComponent />
    </main>
  );
}
