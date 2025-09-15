import Image from "next/image";
import Navbar from "./components/navbar";
import SloganSection from "./components/slogan-section";
import TestimonialSection from "./components/testimoni-section";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div>
      {/* <Navbar /> */}
      <SloganSection />
      <TestimonialSection />
      <Footer />
    </div>
  );
}
