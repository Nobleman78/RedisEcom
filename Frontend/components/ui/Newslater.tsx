
import { spaceMono } from "@/fonts/Fonts";

const Newslater = () => {
  return (
    <div className={`max-w-2xl mx-auto text-center ${spaceMono.className} flex flex-col gap-5 mb-10 mt-40`}>
      <h2 className="uppercase text-3xl">Newsletter</h2>
      <p>Sign up to stay up to date and to receive 10% off your first order.</p>
      <div className="flex flex-row gap-3">
        <input type="email" placeholder="E-mail" className="w-md border px-5 py-2" />
        <button className="uppercase bg-black px-20 py-2 text-white cursor-pointer">Subscribe</button>
      </div>
    </div>
  );
};

export default Newslater;
