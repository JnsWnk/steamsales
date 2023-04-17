import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    signIn("credentials", { email, password, redirect: false });
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">Log In</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <button
            onClick={() => signIn("google")}
            className="text-slate-300 hover:text-slate-500 border border-slate-300 hover:border-blue-500 rounded px-3 py-2 text-sm font-medium"
          >
            {" "}
            Sign in with Google{" "}
          </button>
          <Link
            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            href="/auth/register"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
