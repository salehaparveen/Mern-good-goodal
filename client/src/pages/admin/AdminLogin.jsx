import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../features/auth/adminAuthSlice";

export const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, errorLogIn, admin } = useSelector((store) => store.admin);

  console.log("user login state: ", admin);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(adminLogin({ email, password }));
  };

  return (
    <main className="flex min-h-screen w-full items-center bg-bgcolor2">
      <div className="container mx-auto py-6 px-6 lg:px-16">
        <div className="flex flex-col items-center space-y-6">
          <form
            className="flex flex-col items-center gap-5 rounded-lg bg-bgcolor p-5 shadow-2xl md:w-2/4 "
            onSubmit={handleSubmit}
          >
            <h3 className="font-urbanist text-2xl font-bold text-primary md:text-5xl lg:text-6xl">
              Log In
            </h3>

            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              className="w-full py-3 px-5 shadow-lg focus:outline-none md:py-4 md:px-6 md:text-lg"
            />

            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              className="w-full py-3 px-5 shadow-lg focus:outline-none md:py-4 md:px-6 md:text-lg"
            />

            <button
              disabled={loading}
              className="rounded-md bg-blue-300 py-2 px-5 font-urbanist font-bold text-primary shadow-md transition duration-300 ease-in hover:bg-blue-400 md:py-3 md:px-6"
            >
              Log In
            </button>
            {errorLogIn && <div className="error">{errorLogIn}</div>}
          </form>
        </div>
      </div>
    </main>
  );
};
