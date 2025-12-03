import Navbar from "./components/Navbar";
import Header from "./components/Header";
import UniviewCards from "./components/UniviewCard"
import ProductOverview from "./components/ProductOverview"
import Faq from "./components/Faq"
import Footer from "./components/Footer"
import WhyChooseUs from "./components/WhyChoose";
import Camera from "./components/Camera";


export default function Home() {
  return (
    <div>
      <Navbar />
      <Header/>
      <UniviewCards/>
      <ProductOverview/>
      <WhyChooseUs/>
      <Camera/>
      <Faq/>
      <Footer/>
    </div>
  )
}