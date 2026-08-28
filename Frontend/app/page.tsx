import Banner from "@/components/ui/Banner";
import Discount from "@/components/ui/Discount";
import FeatureProducts from "@/components/ui/FeatureProducts";
import Latestcollection from "@/components/ui/Latestcollection";
import Newslater from "@/components/ui/Newslater";
import Overview from "@/components/ui/Overview";
import Shirtvariation from "@/components/ui/Shirtvariation";

export default function Home() {
  return (
    <div className="pt-30">
      {/* <Modal /> */}
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
        <FeatureProducts />
      </section>
      <section>
        <Shirtvariation />
      </section>
      <section>
        <Overview />
      </section>
      <section>
        <Newslater />
      </section>
    </div>
  );
}
