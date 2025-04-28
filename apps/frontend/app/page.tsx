import { Footer } from "@/components/Footer";
import { Appbar } from "@/components/landingPage/Appbar";
import { Features } from "@/components/landingPage/Features";
import { Hero } from "@/components/landingPage/Hero";

export default function Home() {
  return (
    <main>
      <div className="pt-20 pb-5">
        <Features />
      </div>
      <Hero/>
     {/* <HeroVideo/>
     <OurClients/> */}
     <Footer/>
    </main>
  );
}
