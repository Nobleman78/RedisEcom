import { loginAction } from "@/app/actions/auth";
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

