import React, { useEffect, useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategories,
  getBrands,
  updateProductAsync,
} from "../../product-list/productSlice";
import { useFormik } from "formik";
import { createProductSchema } from "../../../schemas";
import {
  createNewProductAsync,
  fetchProductByIdAsync,
  getProductDetails,
} from "../../product-list/productSlice";
import { useParams } from "react-router-dom";
import { updateProduct } from "../../product-list/productAPI";

function ProductForm() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const categories = useSelector(getCategories);
  const brands = useSelector(getBrands);
  const dispatch = useDispatch();
  const param = useParams();
  const productDetail = useSelector(getProductDetails);

  const initialValues = {
    title: "Test Prouct",
    discountPercentage: 20,
    stock: 200,
    price: 5000,
    brand: "Apple",
    category: "smartphones",
    description: "This is test Product",
    image1: "image1",
    image2: "image2",
    image3: "image3",
    image4: "image4",
    thumbnail: "",
  };

  const handleThumbnailChange = (e) => {
    const data = new FileReader();
    data.addEventListener("load", () => {
      setFieldValue("thumbnail", data.result);
    });
    data.readAsDataURL(e.target.files[0]);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(files.map((file) => readFileAsBase64(file))).then(
      (filesArray) => setSelectedFiles((prev) => [...prev, filesArray])
    );
  };

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve({
          name: file.name,
          base64: reader.result,
        });
      };

      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  function removeAttachment(fileIndex, insideIndex) {
    let file = [...selectedFiles];
    file[fileIndex].splice(insideIndex, 1);
    setSelectedFiles(file);
  }

  const {
    handleSubmit,
    values,
    errors,
    handleChange,
    touched,
    handleBlur,
    resetForm,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: initialValues,
    // validationSchema: createProductSchema,
    onSubmit: (values) => {
      let files = selectedFiles.map((element) =>
        element.map((e, i) => e.base64)
      );
      let allImages = [].concat(...files);
      let data = {
        ...values,
        // images: [values.image1, values.image2, values.image3, values.image4],
        images: allImages,
        status: true,
      };
      delete data.image1;
      delete data.image2;
      delete data.image3;
      delete data.image4;
      if (param.id) {
        dispatch(updateProductAsync(data));
      } else {
        dispatch(createNewProductAsync(data));
      }
    },
  });

  useEffect(() => {
    if (param.id) {
      dispatch(fetchProductByIdAsync(param.id));
    }
  }, [param.id]);

  useEffect(() => {
    if (param.id && productDetail) {
      let data = {
        ...productDetail,
        image1: productDetail.images[0],
        image2: productDetail.images[1],
        image3: productDetail.images[2],
        image4: productDetail.images[3],
      };
      setValues(data);
    }
  }, [productDetail]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12 bg-white p-8">
          <div className="border-b border-gray-900/10 pb-3">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              {param.id ? "Update Product" : "Add Product"}
            </h2>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-7">
              <div className="sm:col-span-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter Product Title"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.title && touched.title && (
                    <p className="text-red-500">{errors.title}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="price"
                    id="price"
                    placeholder="Enter Price"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.price && touched.price && (
                    <p className="text-red-500">{errors.price}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-1">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount (%)
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="discountPercentage"
                    id="discountPercentage"
                    placeholder="10"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={values.discountPercentage}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.discountPercentage && touched.discountPercentage && (
                    <p className="text-red-500">{errors.discountPercentage}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-1">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="stock"
                    id="stock"
                    placeholder="Enter stock"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={values.stock}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.stock && touched.stock && (
                    <p className="text-red-500">{errors.stock}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-7">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Enter Product Description"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.description && touched.description && (
                    <p className="text-red-500">{errors.description}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-2">
                  <select
                    id="brand"
                    name="brand"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    value={values.brand}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value={""}>Select Brand</option>
                    {brands.map((brand) => {
                      return <option value={brand.value}>{brand.label}</option>;
                    })}
                  </select>
                  {errors.brand && touched.brand && (
                    <p className="text-red-500">{errors.brand}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    name="category"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value={""}>Select Category</option>
                    {categories.map((category) => {
                      return (
                        <option value={category.value}>{category.label}</option>
                      );
                    })}
                  </select>
                  {errors.category && touched.category && (
                    <p className="text-red-500">{errors.category}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail
                </label>
                <div className="mt-2">
                  <input
                    type="file"
                    name="thumbnail"
                    id="thumbnail"
                    placeholder="Thumbnail"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleThumbnailChange}
                    onBlur={handleBlur}
                  />
                  {errors.thumbnail && touched.thumbnail && (
                    <p className="text-red-500">{errors.thumbnail}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
              {/* <div className="sm:col-span-4">
                <label
                  htmlFor="image1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 1
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="image1"
                    id="image1"
                    placeholder="Enter First Image Url"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={values.image1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.image1 && touched.image1 && (
                    <p className="text-red-500">{errors.image1}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="image2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 2
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="image2"
                    id="image2"
                    placeholder="Enter Second Image Url"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={values.image2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.image2 && touched.image2 && (
                    <p className="text-red-500">{errors.image2}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="image3"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 3
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="image3"
                    id="image3"
                    placeholder="Enter Third Image Url"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={values.image3}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.image3 && touched.image3 && (
                    <p className="text-red-500">{errors.image3}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="image4"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 4
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="image4"
                    id="image4"
                    placeholder="Enter Forth Image Url"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={values.image4}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.image4 && touched.image4 && (
                    <p className="text-red-500">{errors.image4}</p>
                  )}
                </div>
              </div> */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="image4"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Images
                </label>
                <div className="mt-2">
                  <input
                    type="file"
                    multiple
                    placeholder="Enter Forth Image Url"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleFileChange}
                    onBlur={handleBlur}
                  />
                </div>
                {selectedFiles.map((file, index) =>
                  file.map((pdf, i) => (
                    <div
                      className="flex justify-between w-full my-2 shadow px-2 py-1 rounded"
                      key={index}
                    >
                      <p className="mb-0">
                        <a
                          href={file[i].base64}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="me-3"
                        >
                          {file[i].name}
                        </a>
                      </p>
                      <button
                        className="border-0 bg-white"
                        onClick={() => removeAttachment(index, i)}
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {param.id ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </>
  );
}

export default ProductForm;
