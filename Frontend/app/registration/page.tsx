"use client"
import { michroma, spaceMono } from "@/fonts/Fonts";
import Link from "next/link";

const page = () => {
  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div>
      <div
        className={`${michroma.className} cursor-pointer text-3xl text-center my-10`}
      >
        <h2>NEVER</h2>
        <h2>NEVER</h2>
      </div>

      {/* Sign in or create account */}

      <div className="max-w-md mx-auto space-y-5 mt-20">
        <h2 className={`${spaceMono.className}`}>Sign up</h2>
        <form onSubmit={handleRegistration} action="" className="space-y-2">
          <input
            type="text"
            placeholder="name"
            className={`w-full px-5 py-2 border outline-none ${spaceMono.className}`}
          />
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
            className={`w-full px-5 py-3 bg-black text-white cursor-pointer mt-5 ${spaceMono.className}`}
          >
            Sign Up
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
          <h2>Already Have an Account ? </h2>
          <Link href="/login" className="underline">
            Login{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
