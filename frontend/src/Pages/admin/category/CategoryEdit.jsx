import React, { useContext, useEffect, useRef } from 'react'
import { context } from "../../../../MainContext";
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom';



export default function CategoryEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { notify, API_BASE_URL, CATEGORY_URL, fetchCategory, category } = useContext(context)

    useEffect(
        () => {
            fetchCategory(id)
        },
        [id]
    )


    const categoryName = useRef();
    const categorySlug = useRef();


    function createSlug() {
        const slug = categoryName.current.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+|-+$/g, '')
        categorySlug.current.value = slug;

    }

    const submitHandler = (e) => {
        e.preventDefault()

        const formdata = new FormData();
        formdata.append("name", categoryName.current.value);
        formdata.append("slug", categorySlug.current.value);
        formdata.append("img_name", e.target.category_img.files[0] ?? null)

        axios.put(API_BASE_URL + CATEGORY_URL + "/update/" + id, formdata).then(
            (succes) => {
                notify(succes.data.msg, succes.data.status)
                if (succes.data.status == 1) {
                    navigate("/admin/category")
                    e.target.reset()
                }

            }


        ).catch(
            (error) => {
                notify("Internal Server Error", 0)

            }
        )

    }


    if (!category) return <p>Loading...</p>;

    return (
        <div className='px-2 pt-6 w-full shadow-sm bg-white'>
            <section >
                <nav className="flex ml-5" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li className="inline-flex items-center">
                            <a
                                href="#"
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
                                    to={"/admin/category"}
                                    className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 "
                                >
                                    Category
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
                                    Edit
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div className="py-4 px-2 mx-auto max-w-4xl lg:py-10">

                    <form onSubmit={submitHandler}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div >
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Category Name
                                </label>
                                <input
                                    defaultValue={category.name}
                                    ref={categoryName}
                                    onChange={createSlug}
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Type Category name"

                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="Slug"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Slug
                                </label>
                                <input
                                    defaultValue={category.slug}
                                    readOnly
                                    ref={categorySlug}
                                    type="text"
                                    name="Slug"
                                    id="Slug"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Category Slug"

                                />
                            </div>
                            <div className=' col-span-2' >
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Category Name
                                </label>
                                <input
                                    type="file"
                                    name="x"
                                    id="category_img"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder=" Category image"

                                />
                                <h3 className='mt-4'>current image</h3>
                                <img className='w-24' src={API_BASE_URL + "/images/category/" + category.img_name} alt="current image" />
                            </div>



                        </div>
                        <button
                            type="submit"
                            className="px-6 mt-10 py-2 text-md font-semibold text-center text-white transition duration-300 rounded-lg hover:from-purple-600 hover:to-pink-600 ease bg-gradient-to-br from-purple-500 to-pink-500 md:w-auto">
                            Save
                        </button>
                    </form>
                </div>
            </section>

        </div>
    )
}