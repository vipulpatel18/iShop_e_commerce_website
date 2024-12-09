import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { BiMinus, BiPlus } from "react-icons/bi";
import { context } from "../../../MainContext";
import { useDispatch, useSelector } from "react-redux";
import { IndCurrency } from "../../Help";
import {
  removeFromCart,
  adjustQuantity,
} from "../../Pages/redux/reducers/cartSlice";

export default function Cart() {
  const Navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const CheckUserLogin = () => {
    if (user.data) {
      Navigate("/checkout");
    } else {
      Navigate("/login?ref=checkout");
    }
  };

  const { fetchProducts, products, API_BASE_URL } = useContext(context);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart); // Get cart state from Redux

  useEffect(() => {
    fetchProducts(); // Fetch product list on mount
  }, [fetchProducts]);

  // Function to decrease quantity
  const handleDecrease = (product_id, price) => {
    dispatch(adjustQuantity({ product_id, increment: false, price }));
  };

  // Function to increase quantity
  const handleIncrease = (product_id, price) => {
    dispatch(adjustQuantity({ product_id, increment: true, price }));
  };

  // Handle product removal from cart
  const handleRemove = (product_id) => {
    dispatch(removeFromCart({ product_id }));
  };

  // Calculate the original price (sum of all original prices of items in the cart)
  const originalPrice = cart?.items?.reduce((total, item) => {
    const product = products?.find((prod) => prod._id === item.product_id);
    return total + (product?.original_price || 0) * item.quantity;
  }, 0);

  return (
    <section className="bg-white py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Shopping Cart
        </h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {products &&
                cart?.items?.map((d) => {
                  const prod = products.find((p) => p._id === d.product_id);
                  return (
                    <div
                      key={d.product_id}
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
                    >
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        {/* Image */}
                        <div className="shrink-0 md:order-1">
                          <img
                            className="h-20 w-20"
                            src={`${API_BASE_URL}/images/product/${prod?.main_image}`}
                            alt={prod?.name}
                          />
                        </div>

                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          {/* Quantity Button */}
                          <div className="flex items-center">
                            <button
                              type="button"
                              disabled={d?.quantity <= 1}
                              onClick={() =>
                                handleDecrease(d?.product_id, prod?.final_price)
                              } // Decrease quantity
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                            >
                              <BiMinus className="text-gray-900" />
                            </button>
                            <span
                              type="text"
                              className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                            >
                              {d?.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                handleIncrease(d?.product_id, prod?.final_price)
                              } // Increase quantity
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                            >
                              <BiPlus className="text-gray-900" />
                            </button>
                          </div>

                          {/* Product Total Price */}
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-900">
                              {IndCurrency(
                                Number(prod?.final_price * d?.quantity)
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          {/* Product Name And Price */}
                          <div className="flex flex-col">
                            <span
                              href="#"
                              className="text-base font-medium text-gray-900 hover:underline"
                            >
                              {prod?.name}
                            </span>
                            <span
                              href="#"
                              className="text-base font-medium line-through text-gray-900 hover:underline"
                            >
                              {IndCurrency(Number(prod?.original_price))}
                            </span>
                          </div>

                          {/* Remove Button */}
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => handleRemove(d.product_id)}
                              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                            >
                              <AiOutlineDelete className="mr-2 h-5 w-5" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
              <p className="text-xl font-semibold text-gray-900">
                Order summary
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">
                      Original price
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      {IndCurrency(originalPrice)}{" "}
                      {/* Display original price */}
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">
                      Savings
                    </dt>
                    <dd className="text-base font-medium text-green-600">
                      {IndCurrency(Number(originalPrice - cart.total))}{" "}
                      {/* Display savings */}
                    </dd>
                  </dl>
                </div>
                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                  <dt className="text-base font-bold text-gray-900">Total</dt>
                  <dd className="text-base font-bold text-gray-900">
                    {IndCurrency(Number(cart.total))}
                  </dd>
                </dl>
              </div>
              <Link
                onClick={CheckUserLogin}
                className="flex w-full bg-blue-700 items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
              >
                Proceed to Checkout
              </Link>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500">or</span>
                <button
                  to={"/store"}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
