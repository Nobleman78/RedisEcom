import { loginAction, loginWithGoogle } from "@/app/actions/auth";
import { michroma, spaceMono } from "@/fonts/Fonts";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ error?: string }>;
}

const page = async ({ searchParams }: PageProps) => {
  const { error } = await searchParams;

  return (
    <div>
      <div
        className={`${michroma.className} my-6 cursor-pointer text-center text-2xl sm:my-8 sm:text-3xl`}
      >
        <Link href="/">
          <h2>NEVER</h2>
          <h2>NEVER</h2>
        </Link>
      </div>
      {/* We are introducing gitflow just for check */}
      {/* Sign in or create account */}

      <div className="mx-auto mt-12 max-w-md space-y-5 px-5 sm:mt-16 sm:px-0">
        <h2 className={`${spaceMono.className}`}>Sign in</h2>

        {/* Error message from failed login */}
        {error && (
          <p className={`${spaceMono.className} text-red-500 text-sm`}>
            {decodeURIComponent(error)}
          </p>
        )}

        <form action={loginAction} className="space-y-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className={`w-full px-5 py-2 border outline-none ${spaceMono.className}`}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            required
            className={`w-full px-5 py-2 border outline-none ${spaceMono.className}`}
          />
          <button
            type="submit"
            className={`${spaceMono.className} flex flex-row border w-full  justify-center py-3 bg-black text-white cursor-pointer`}
          >
            Login
          </button>
        </form>

        <h2 className={`${spaceMono.className} text-center`}> Or</h2>

        <form action={loginWithGoogle} className="">
          <button
            type="submit"
            className={`${spaceMono.className} w-full cursor-pointer bg-black text-white py-3`}
          >
            Login with google
          </button>
        </form>

        {/* New User */}
        <div
          className={`${spaceMono.className} mt-5 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4`}
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
