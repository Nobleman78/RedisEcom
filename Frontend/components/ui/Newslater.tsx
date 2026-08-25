
import { spaceMono } from "@/fonts/Fonts";

const Newslater = () => {
  return (
    <div className={`max-w-2xl mx-auto px-4 text-center ${spaceMono.className} flex flex-col gap-5 mb-10 mt-20 md:mt-40`}>
      <h2 className="uppercase text-3xl">Newsletter</h2>
      <p>Sign up to stay up to date and to receive 10% off your first order.</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <input type="email" placeholder="E-mail" className="w-full sm:w-md border px-5 py-3 sm:py-2" />
        <button className="uppercase bg-black px-8 md:px-20 py-3 sm:py-2 text-white cursor-pointer w-full sm:w-auto">Subscribe</button>
      </div>
    </div>
  );
};

export default Newslater;
