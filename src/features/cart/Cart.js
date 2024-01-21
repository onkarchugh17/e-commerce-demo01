import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { selectItems } from "./cartSlice";
import { updateCartAsync, deleteFromCartAsync } from "./cartSlice";
import Navbar from "../navbar/Navbar";
import { removeOrder } from "../orders/orderSlice";
import { discountPrice } from "../../app/constants";

export default function Cart() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectItems);


  const totalAmount = cartItems.reduce(
    (amount, item) => discountPrice(item.product) * item.quantity + amount,
    0
  );
  const totalItems = cartItems.reduce(
    (total, item) => Number(item.quantity) + total,
    0
  );

  function handleQuantityChange(e, item) {
    dispatch(updateCartAsync({id: item.id, quantity: +e.target.value , product:item.product.id }));
  }

  function removeItem(e, id) {
    dispatch(deleteFromCartAsync(id));
  }

  useEffect(() => {
    dispatch(removeOrder());
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900 text-start">
            Cart
          </h1>
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cartItems?.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.product.href}>{item.product.title}</a>
                        </h3>
                        <p className="ml-4">${discountPrice(item.product)}</p>
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
                        <select value={item.quantity} onChange={(e) => handleQuantityChange(e, item)}>
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

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
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
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
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
    </>
  );
}
