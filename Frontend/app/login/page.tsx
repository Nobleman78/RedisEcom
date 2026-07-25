import { michroma, spaceMono } from "@/fonts/Fonts";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <div
        className={`${michroma.className} cursor-pointer text-3xl text-center my-10`}
      >
        <Link href="/">
          <h2>NEVER</h2>
          <h2>NEVER</h2>
        </Link>
      </div>

      {/* Sign in or create account */}

      <div className="max-w-md mx-auto space-y-5 mt-20">
        <h2 className={`${spaceMono.className}`}>Sign in</h2>
        <form action="" className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            className={`w-full px-5 py-2 border outline-none ${spaceMono.className}`}
          />
          <input
            type="password"
            placeholder="password"
            className={`w-full px-5 py-2 border outline-none ${spaceMono.className}`}
          />
          <button
            className={`${spaceMono.className} flex flex-row border w-full  justify-center py-3 bg-black text-white cursor-pointer`}
          >
            Login
          </button>
        </form>

        <h2 className={`${spaceMono.className} text-center`}> Or</h2>

        <button
          className={`${spaceMono.className} w-full cursor-pointer bg-black text-white py-3`}
        >
          Login with google
        </button>

        {/* New User */}
        <div
          className={`${spaceMono.className} flex flex-row  items-center gap-10 mt-5`}
        >
          <h2>Have an account ? </h2>
          <Link href="/registration" className="underline">
            Registration{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
