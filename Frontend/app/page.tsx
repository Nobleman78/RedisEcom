import Navbar from "@/components/nav/Navbar";
import Banner from "@/components/ui/Banner";
import Discount from "@/components/ui/Discount";
import Latestcollection from "@/components/ui/Latestcollection";
import Shirtvariation from "@/components/ui/Shirtvariation";

export default function Home() {
  return (
    <div className="pt-30">
      <section>
        <Navbar />
      </section>
      <section>
        <Discount />
      </section>
      <section>
        <Banner />
      </section>
      <section>
        <Latestcollection />
      </section>
      <section>
        <Shirtvariation />
      </section>
    </div>
  );
}
