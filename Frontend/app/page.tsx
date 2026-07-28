import Banner from "@/components/ui/Banner";
import Discount from "@/components/ui/Discount";
import Latestcollection from "@/components/ui/Latestcollection";
import Newslater from "@/components/ui/Newslater";
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
        <Shirtvariation />
      </section>
      <section>
        <Newslater />
      </section>
    </div>
  );
}
