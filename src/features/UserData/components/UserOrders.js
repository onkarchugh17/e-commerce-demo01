import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";
import { fetchUserOrdersAsync, userOrders } from "../userSlice";
import { discountPrice } from "../../../app/constants";

function UserOrders() {
  const user = useSelector(selectLoggedInUser);
  const orders = useSelector(userOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserOrdersAsync(user.id));
  }, [dispatch]);

  return (
    <>
      {orders.map((order, index) => {
        return (
          <>
            <div className="max-w-7xl mt-12 px-4 sm:px-6 lg:px-8 bg-white">
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900 text-start">
                  Order #{order.id} -{" "}
                  <span
                    className={
                      order.status === "pending"
                        ? "bg-purple-200 text-purple-600 py-4 px-5 rounded-full text-sm uppercase "
                        : order.status === "dispatched"
                        ? "bg-yellow-200 text-yellow-600 py-4 px-5 rounded-full text-sm uppercase "
                        : order.status === "dilevered"
                        ? "bg-green-200 text-green-600 py-4 px-5 rounded-full text-sm uppercase "
                        : order.status === "cancelled"
                        ? "bg-red-200 text-red-600 py-4 px-5 rounded-full text-sm uppercase "
                        : ""
                    }
                  >
                    {order.status}
                  </span>
                </h1>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {order.items?.map((item) => (
                      <li key={item.product.id} className="flex py-6">
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
                                Qty : {item.quantity}
                              </label>
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
                  <p>${order.totalAmount}</p>
                </div>
                {/* <div className="flex justify-between text-base my-2 font-medium text-gray-900">
                  <p>Total Quantity</p>
                  <p>{order.totalItems}</p>
                </div> */}
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>

                <li className="flex justify-between gap-x-6 py-3 px-3 mt-3 border-solid border-2 	border-gray-300">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-lg font-semibold leading-6 text-gray-900 text-start">
                        {order?.selectedAddress?.name}
                      </p>
                      <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                        {`${order?.selectedAddress?.street} , ${order?.selectedAddress?.city} , ${order?.selectedAddress?.state} - ${order?.selectedAddress?.pinCode}`}
                      </p>
                      <p className="text-sm font-semibold leading-6 text-gray-600 text-start">
                        {order?.selectedAddress?.phone}
                      </p>
                    </div>
                  </div>
                </li>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}

export default UserOrders;
