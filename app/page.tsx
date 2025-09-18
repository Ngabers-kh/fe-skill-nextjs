import Image from "next/image";
import Navbar from "./components/navbar";
import Header from "./components/header";
import Body from "./components/body";
import Footer from "./components/footer"; 
import TestimonialSection from "./components/testimoni-section";
import SloganSection from "./components/slogan-section";

export default function Home() {
  return (
    <div>
        < Navbar />
        < Header />
        < Body />
        < SloganSection />
        < TestimonialSection />
        < Footer /> 
    </div>
  );
}
