import Banner from "@/app/components/banner/Banner";
import AboutUsComponent from "@/components/homeComponents/aboutUsComponent";
import WhatWeOffer from "@/components/homeComponents/whatWeOffer";
import TestimonianzePage from "@/components/homeComponents/testimonianze";

export default async function Home() {
  return (
    <main className="overflow-x-hidden">
      <Banner />
      <AboutUsComponent />
      <WhatWeOffer />
      <TestimonianzePage />
    </main>
  );
}
