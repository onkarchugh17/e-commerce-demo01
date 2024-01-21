import React, { useState, Fragment, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import {
  fetchProductByIdAsync,
  getAllProducts,
  getProductDetails,
} from "../productSlice";
import { addToCartAsync } from "../../cart/cartSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
import { discountPrice } from "../../../app/constants";
import { selectItems } from "../../cart/cartSlice";
import { imageUrl } from "../../../app/constants";

const colors = [
  { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
  { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
  { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
];
const sizes = [
  { name: "XXS", inStock: false },
  { name: "XS", inStock: true },
  { name: "S", inStock: true },
  { name: "M", inStock: true },
  { name: "L", inStock: true },
  { name: "XL", inStock: true },
  { name: "2XL", inStock: true },
  { name: "3XL", inStock: true },
];

const highlights = [
  "Hand cut and sewn locally",
  "Dyed with our proprietary colors",
  "Pre-washed & pre-shrunk",
  "Ultra-soft 100% cotton",
];

const reviews = { href: "", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[2]);
  const [suggestion, setSuggestion] = useState([]);
  const param = useParams();
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const product = useSelector(getProductDetails);
  const cartItems = useSelector(selectItems);
  const [alreadyCart, setAlreadyCart] = useState(false);
  const navigate = useNavigate();
  const productList = useSelector(getAllProducts);

  function getSuggestionProduct() {
    if (product) {
      let pro = productList.filter((element) => {
        return element.category === product.category && element.id !== param.id;
      });
      setSuggestion(pro);
    }
  }

  function handleCart(e) {
    e.preventDefault();

    if (alreadyCart) {
      navigate("/cart");
    } else {
      let newItem = { quantity: 1, user: user.id, product: product.id };
      delete newItem["id"];
      dispatch(addToCartAsync(newItem));
    }
  }

  function checkCartItem() {
    let checkItem = cartItems.findIndex((e) => e.product?.id === param.id);
    if (checkItem > -1) {
      setAlreadyCart(true);
    } else {
      setAlreadyCart(false);
    }
  }

  useEffect(() => {
    dispatch(fetchProductByIdAsync(param.id));
    if (cartItems.length) {
      checkCartItem();
    }
  }, [dispatch, selectItems, cartItems, param.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getSuggestionProduct();
  }, [param.id]);

  return (
    <div className="bg-white">
      {product && (
        <div className="pt-6">
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={imageUrl + product.images[0]}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={imageUrl + product.images[1]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={imageUrl + product.images[2]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src={imageUrl + product.images[3]}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-4 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-8 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-4xl font-bold tracking-tight text-dark-1500 sm:text-3xl text-start">
                {product.name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-xl line-through tracking-tight text-gray-900 text-start">
                {product.price}
              </p>
              <p className="text-3xl tracking-tight text-gray-900 text-start">
                {discountPrice(product)}
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          reviews.average > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                  <a
                    href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div>

              <form className="mt-10">
                {/* Colors */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 text-start">
                    Color
                  </h3>

                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {colors.map((color) => (
                        <RadioGroup.Option
                          key={color.name}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color.selectedClass,
                              active && checked ? "ring ring-offset-1" : "",
                              !active && checked ? "ring-2" : "",
                              "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                            )
                          }
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {color.name}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.class,
                              "h-8 w-8 rounded-full border border-black border-opacity-10"
                            )}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </a>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={({ active }) =>
                            classNames(
                              size.inStock
                                ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                : "cursor-not-allowed bg-gray-50 text-gray-200",
                              active ? "ring-2 ring-indigo-500" : "",
                              "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">
                                {size.name}
                              </RadioGroup.Label>
                              {size.inStock ? (
                                <span
                                  className={classNames(
                                    active ? "border" : "border-2",
                                    checked
                                      ? "border-indigo-500"
                                      : "border-transparent",
                                    "pointer-events-none absolute -inset-px rounded-md"
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line
                                      x1={0}
                                      y1={100}
                                      x2={100}
                                      y2={0}
                                      vectorEffect="non-scaling-stroke"
                                    />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <button
                  type="button"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={(e) => handleCart(e)}
                  disabled={alreadyCart}
                >
                  {alreadyCart ? "ITEM IN CART" : "ADD TO CART"}
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900 text-start">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-semibold text-dark-900 text-start">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400 text-start">
                        <span className="text-gray-600 text-start">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-lg font-semibold text-gray-900 text-start">
                  Details
                </h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600 text-start">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8">
            <h3>More Products</h3>
            <div className="mx-auto max-w-2xl py-16 sm:py-0 lg:max-w-7xl">
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {suggestion.map((product) => (
                  <Link to={`/product-detail/${product.id}`}>
                    <div
                      key={product.id}
                      className="group relative border-solid border-2 border-gray p-2"
                    >
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                        <img
                          src={imageUrl + product.thumbnail}
                          alt={product.title}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700 font-semibold">
                            <div href={product.thumbnail}>
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 "
                              />
                              {product.title}
                            </div>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            <StarIcon className="w-5 h-5 inline"></StarIcon>
                            <span className="align-bottom ml-1">
                              {product.rating}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            ${discountPrice(product)}
                          </p>
                          <p className="text-sm font-semibold text-gray-400 line-through">
                            ${product.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
