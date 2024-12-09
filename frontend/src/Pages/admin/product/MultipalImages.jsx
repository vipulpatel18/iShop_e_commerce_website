import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { context } from "../../../../MainContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

export default function ProductEdit() {
    const { id } = useParams();

    const navigate = useNavigate;

    const { notify, API_BASE_URL, PRODUCT_URL, products, fetchProducts } =
        useContext(context);

    useEffect(() => {
        fetchProducts(id);
    }, []);

    // console.log(products?.others_images);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (let images of e.target.others_images.files) {
            formData.append("others_images", images);
            console.log(images)
        } 
       

        axios
            .post(API_BASE_URL + PRODUCT_URL + "/otherimages/" + id, formData)
            .then((success) => {
                notify(success.data.msg, success.data.status);
                if (success.data.status === 1) {
                    navigate("admin/product")
                    e.target.reset();
                }
            })
            .catch(() => {
                notify("Internal Server Error", 0);
            });
    };

    return (
        <>
            <nav className="flex ml-5 mt-3" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <a
                            href="/admin"
                            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 "
                        >
                            <svg
                                className="w-3 h-3 me-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                            </svg>
                            Admin
                        </a>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg
                                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 9 4-4-4-4"
                                />
                            </svg>
                            <Link
                                to={"/admin/product"}
                                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 "
                            >
                                Product
                            </Link>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg
                                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 9 4-4-4-4"
                                />
                            </svg>
                            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                                Edit Product
                            </span>
                        </div>
                    </li>
                </ol>
            </nav>

            <div className="max-w-4xl mx-auto mt-10">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
                >
                    {/* Product Image Upload */}
                    <div className="mb-4 mt-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Product Image
                        </label>
                        <input
                            type="file"
                            name="others_images"
                            multiple={true}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <h3 className="mt-4">current image</h3>
                       <div className="flex gap-3 flex-wrap mt-3">
                       {Array.isArray(products?.others_images) &&
                            products?.others_images?.map(
                                (images, index) => (
                                    <img key={index} className="w-24 border rounded-lg px-1 pt-1" src={ API_BASE_URL + "/images/product/" + images } alt="current image" />
                                )
                            )}
                       </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
