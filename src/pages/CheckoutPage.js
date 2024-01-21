import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { BsPencil } from "react-icons/bs";
import { MdOutlineDeleteOutline } from "react-icons/md";
import {
  updateCartAsync,
  deleteFromCartAsync,
  selectItems,
} from "../features/cart/cartSlice.js";
import { Navigate } from "react-router-dom";
import { useFormik } from "formik";
import { addressSchema } from "../schemas/index.js";
import { selectUserInfo } from "../features/UserData/userSlice.js";

import { updateUserAsync } from "../features/UserData/userSlice.js";
import {
  createOrderAsync,
  selectCurrentOrder,
} from "../features/orders/orderSlice.js";
import { discountPrice } from "../app/constants.js";
import Navbar from "../features/navbar/Navbar.js";

function CheckoutPage() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectItems);
  const user = useSelector(selectUserInfo);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const currentOrder = useSelector(selectCurrentOrder);

  const totalAmount = cartItems.reduce(
    (amount, item) => discountPrice(item.product) * item.quantity + amount,
    0
  );
  const totalItems = cartItems.reduce(
    (total, item) => +item.quantity + total,
    0
  );

  function handleQuantityChange(e, item) {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  }

  function removeItem(e, id) {
    dispatch(deleteFromCartAsync(id));
  }

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    pinCode: "",
    street: "",
  };

  const { handleSubmit, values, errors, handleChange, touched, resetForm } =
    useFormik({
      initialValues: initialValues,
      validationSchema: addressSchema,
      onSubmit: (values) => {
        dispatch(
          updateUserAsync({ ...user, addresses: [...user.addresses, values] })
        );
        // resetForm();
      },
    });

  function handleAddress(e, index) {
    setSelectedAddress(user.addresses[index]);
  }

  function handleOrder() {
    let address = selectedAddress ? selectedAddress : user.addresses[0];
    const order = {
      items: cartItems,
      totalAmount,
      user: user.id,
      paymentMethod,
      selectedAddress: address,
      status: "pending",
    };
    if (address) {
      dispatch(createOrderAsync(order));
    } else {
      alert("Please Add an Address");
    }
  }

  return (
    <>
      {!cartItems.length && <Navigate to="/"></Navigate>}
      {currentOrder && (
        <Navigate to={`/order-success/${currentOrder.id}`}></Navigate>
      )}
      <Navbar>
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <form className="bg-white p-5 mt-12" onSubmit={handleSubmit}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900 text-start">
                      Personal Information
                    </h1>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900 text-start"
                        >
                          Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={values.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.name && touched.name && (
                            <p className="text-red-500">{errors.name}</p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900 text-start"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            placeholder="example@gmail.com"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.email && touched.email && (
                            <p className="text-red-500">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium leading-6 text-gray-900 text-start"
                        >
                          Phone
                        </label>
                        <div className="mt-2">
                          <input
                            id="phone"
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            placeholder="Enter contact number"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          ></input>
                          {errors.phone && touched.email && (
                            <p className="text-red-500">{errors.phone}</p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900 text-start"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="city"
                            id="city"
                            value={values.city}
                            onChange={handleChange}
                            placeholder="Enter city name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.city && touched.email && (
                            <p className="text-red-500">{errors.city}</p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium leading-6 text-gray-900 text-start"
                        >
                          State / Province
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="state"
                            id="state"
                            value={values.state}
                            onChange={handleChange}
                            placeholder="State Name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.state && touched.email && (
                            <p className="text-red-500">{errors.state}</p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="pinCode"
                          className="block text-sm font-medium leading-6 text-gray-900 text-start"
                        >
                          ZIP / Pin code
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="pinCode"
                            id="pinCode"
                            value={values.pinCode}
                            onChange={handleChange}
                            placeholder="Pin Code"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.pinCode && touched.pinCode && (
                            <p className="text-red-500">{errors.pinCode}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-span-full">
                        <label
                          htmlFor="street"
                          className="block text-sm font-medium leading-6 text-gray-900 text-start"
                        >
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="street"
                            id="street"
                            value={values.street}
                            onChange={handleChange}
                            placeholder="Street Address"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.street && touched.street && (
                            <p className="text-red-500">{errors.street}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={() => resetForm()}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Add Address
                      </button>
                    </div>
                  </div>

                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900 text-start mb-3">
                      Addresses{" "}
                      <span className="text-sm leading-6 text-gray-600 font-normal">
                        (Choose from Existing Address)
                      </span>
                    </h2>
                    <ul role="list" className="divide-y divide-gray-100">
                      {user?.addresses.map((address, index) => (
                        <li
                          key={index}
                          className="flex justify-between gap-x-6 py-3 px-3 mb-3 border-solid border-2 	border-gray-300"
                        >
                          <div className="flex min-w-0 gap-x-4">
                            <input
                              id={index}
                              name="address"
                              type="radio"
                              value={index}
                              onChange={(e) => handleAddress(e, index)}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-lg font-semibold leading-6 text-gray-900 text-start">
                                {address.name}
                              </p>
                              <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                                {`${address.street} , ${address.city} , ${address.state} - ${address.pinCode}`}
                              </p>
                              <p className="text-sm font-semibold leading-6 text-gray-600 text-start">
                                {address.phone}
                              </p>
                            </div>
                          </div>
                          <div className="hidden shrink-0 sm:flex sm:flex-row sm:items-start">
                            <BsPencil className="mr-2 text-sm" />
                            <MdOutlineDeleteOutline className="text-base" />
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-10 space-y-10">
                      <fieldset>
                        <legend className="text-sm font-semibold leading-6 text-gray-900">
                          Payment Method
                        </legend>
                        <div className="mt-6 space-y-6">
                          <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                              <input
                                id="cash"
                                name="payment"
                                type="radio"
                                value="cash"
                                onChange={(e) =>
                                  setPaymentMethod(e.target.value)
                                }
                                checked={paymentMethod === "cash"}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                            </div>
                            <div className="text-sm leading-6">
                              <label
                                htmlFor="cash"
                                className="font-medium text-gray-900"
                              >
                                Cash on Delivery
                              </label>
                            </div>
                          </div>
                          <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                              <input
                                id="card"
                                name="payment"
                                type="radio"
                                value="card"
                                checked={paymentMethod === "card"}
                                onChange={(e) =>
                                  setPaymentMethod(e.target.value)
                                }
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                            </div>
                            <div className="text-sm leading-6">
                              <label
                                htmlFor="card"
                                className="font-medium text-gray-900 text-start"
                              >
                                Card Payment
                              </label>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="lg:col-span-2">
              <div className="mx-auto max-w-7xl mt-12 px-3 sm:px-3 lg:px-3 bg-white">
                <div className="border-t border-gray-200 px-0 py-6 sm:px-0">
                  <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900 text-start">
                    Cart
                  </h1>
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {cartItems?.map((item) => (
                        <li key={item.product.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href={item.product.href}>
                                    {item.product.title}
                                  </a>
                                </h3>
                                <p className="ml-4">
                                  ${discountPrice(item.product)}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500 text-start">
                                {item.product.category}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <label
                                  htmlFor="email"
                                  className="inline mr-5 text-sm font-medium leading-6 text-gray-900 text-start"
                                >
                                  Qty :
                                </label>
                                <select
                                  value={item.quantity}
                                  onChange={(e) =>
                                    handleQuantityChange(e, item)
                                  }
                                >
                                  <option value={1}>1</option>
                                  <option value={2}>2</option>
                                  <option value={3}>3</option>
                                  <option value={4}>4</option>
                                  <option value={5}>5</option>
                                  <option value={6}>6</option>
                                </select>
                              </div>

                              <div className="flex">
                                <button
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                  onClick={(e) => removeItem(e, item.id)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-0 py-6 sm:px-0">
                  <div className="flex justify-between text-base my-2 font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${totalAmount}</p>
                  </div>
                  <div className="flex justify-between text-base my-2 font-medium text-gray-900">
                    <p>Total Quantity</p>
                    <p>{totalItems}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <div
                      className="flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      onClick={handleOrder}
                    >
                      Order Now
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or &nbsp;
                      <Link to="/">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => setOpen(false)}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default CheckoutPage;
