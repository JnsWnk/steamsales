import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] mt-4">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-3xl font-semibold ">Welcome</h1>
        <p className="text-sm font-medium text-slate-400">
          Enter your email to sign in to your account
        </p>
      </div>
      <div className="grid gap-6">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="email"
                placeholder="name@example.com"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-1">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="password"
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="font-semibold text-lg p-2 bg-white text-slate-800 hover:bg-slate-300 rounded-md"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="relative">
          <div className="relative flex justify-center text-slate-400 text-sm font-medium">
            <span className="bg-background px-2">Or continue with</span>
          </div>
        </div>
        <button
          onClick={() => signIn("google")}
          className="bg-white text-slate-700 font-semibold rounded-lg px-4 py-2 hover:bg-slate-300 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2443"
            height="2500"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 256 262"
            id="google"
            className="h-6 w-6 mr-2"
          >
            <path
              fill="#4285F4"
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            ></path>
            <path
              fill="#34A853"
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            ></path>
            <path
              fill="#FBBC05"
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            ></path>
            <path
              fill="#EB4335"
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            ></path>
          </svg>
          Google
        </button>
      </div>
      <Link
        href="/auth/register"
        className="underline text-slate-400 hover:text-slate-100 text-sm text-center"
      >
        Dont have an account? Sign up
      </Link>
    </div>
  );
}
