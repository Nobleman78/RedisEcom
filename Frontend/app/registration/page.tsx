import { signupAction } from "@/app/actions/auth";
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

      {/* Sign up */}

      <div className="mx-auto mt-12 max-w-md space-y-5 px-5 sm:mt-16 sm:px-0">
        <h2 className={`${spaceMono.className}`}>Sign up</h2>

        {/* Error message from failed registration */}
        {error && (
          <p className={`${spaceMono.className} text-red-500 text-sm`}>
            {decodeURIComponent(error)}
          </p>
        )}

        <form action={signupAction} className="space-y-2">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className={`w-full px-5 py-2 border outline-none ${spaceMono.className}`}
          />
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
            placeholder="Password"
            required
            className={`w-full px-5 py-2 border outline-none ${spaceMono.className}`}
          />
          <button
            type="submit"
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

        {/* Already have an account */}
        <div
          className={`${spaceMono.className} mt-5 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4`}
        >
          <h2>Already Have an Account ?</h2>
          <Link href="/login" className="underline">
            Login{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
