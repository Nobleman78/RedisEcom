import { spaceMono } from "@/fonts/Fonts";

const Newslater = () => {
  return (
    <div
      className={`mx-auto mb-10 mt-12 flex max-w-2xl flex-col gap-5 px-4 text-center md:mt-24 ${spaceMono.className}`}
    >
      <h2 className="text-xl uppercase sm:text-2xl md:text-3xl">Newsletter</h2>
      <p>Sign up to stay up to date and to receive 10% off your first order.</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <input
          type="email"
          placeholder="E-mail"
          className="w-full sm:w-md border px-5 py-3 sm:py-2"
        />
        <button className="w-full cursor-pointer bg-black px-6 py-3 text-white uppercase sm:w-auto sm:px-8 sm:py-2 md:px-12">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Newslater;
