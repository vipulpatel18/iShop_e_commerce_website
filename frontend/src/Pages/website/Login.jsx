import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { context } from "../../../MainContext";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/reducers/userSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [searchParam] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const { fetchUser, user, API_BASE_URL, USER_URL } = useContext(context);

  const [showPassword, setShowPassword] = useState(true);
  console.log(cart);
  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    axios
      .post(`${API_BASE_URL}${USER_URL}/login`, data)
      .then((responce) => {
        if (responce.data.status == 1) {
          dispatch(
            login({
              data: responce.data.user,
              token: responce.data.token,
            })
          );

          axios
            .post(
              `${API_BASE_URL}${USER_URL}/moveToCart/${responce.data.user._id}`,
              {
                cartData: JSON.stringify(cart),
              }
            )
            .then((responce) => {
              if (responce.data.status == 1) {
                const latestCart = responce.data.latestCart;
                let original_price = 0;
                let final_price = 0;
                const data = latestCart.map((lc) => {
                  original_price += lc.product_id.original_price * lc.quantity;
                  final_price += lc.product_id.final_price * lc.quantity;
                  return {
                    product_id: lc.product_id._id,
                    quantity: lc.quantity,
                  };
                });
                dispatch(
                  addToCart({
                    product_id: data,
                    total: final_price,
                    original_price: original_price,
                  })
                );
              }
            })
            .catch((error) => {
              console.log(error);
            });

          if (searchParam.get("ref") == "checkout") {
            navigate("/checkout");
          } else {
            navigate("/");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Sign in to your account
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={"vipul@gmail.com"}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "password" : "text"}
                name="password"
                id="password"
                visibility={true}
                defaultValue={"123456"}
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="••••••••"
                required
              />
              {showPassword ? (
                <FaEye
                  onClick={() => setShowPassword(false)}
                  className="text-2xl text-gray-600 absolute right-2 top-[10px] cursor-pointer"
                />
              ) : (
                <FaEyeSlash
                  onClick={() => setShowPassword(true)}
                  className="text-2xl text-gray-600 absolute right-2 top-[10px] cursor-pointer"
                />
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Sign in
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-6 text-center">
          Don’t have an account?{" "}
          <Link
            to={`/register?ref=${searchParam.get("ref")}`}
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}
