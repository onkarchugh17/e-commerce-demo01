import React, { useState, useEffect } from "react";
import { ITEM_PER_PAGE, discountPrice } from "../../../app/constants";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectAllOrders,
  totalOrderCount,
  updateOrderAsync,
} from "../../orders/orderSlice";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Pagination from "../../common/Pagination";

function AdminOrder() {
  const [page, setPage] = useState(1);
  const [editId, setEditId] = useState(-1);
  const [sort, setSort] = useState({});

  const dispatch = useDispatch();
  const allOrders = useSelector(selectAllOrders);
  const totalCount = useSelector(totalOrderCount);

  function handleSort(option) {
    let newSort = { ...sort, _sort: option.sort, _order: option.order };
    setSort(newSort);
  }

  function handleEdit(order) {
    setEditId(order.id);
  }

  function handleUpdate(e, order) {
    const updateOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updateOrder));
    setEditId(-1);
  }

  function handlePage(e, page) {
    setPage(page);
  }

  useEffect(() => {
    const pagination = { _page: page, limit: ITEM_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [page, dispatch, sort]);

  return (
    <>
      <div className="overflow-x-auto">
        <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <div style={{ width: "100%", overflowX: "auto" }}>
                <table style={{ width: "max-content" }}>
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th
                        className="py-3 px-6 text-left cursor-pointer"
                        onClick={() =>
                          handleSort({
                            sort: "id",
                            order: sort?._order === "asc" ? "desc" : "asc",
                          })
                        }
                      >
                        Order ID
                      </th>
                      <th className="py-3 px-6 text-left">Product</th>
                      <th className="py-3 px-6 text-center">Total Amount</th>
                      <th className="py-3 px-6 text-center">
                        Shipping Address
                      </th>
                      <th className="py-3 px-6 text-center">Status</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {allOrders.length &&
                      allOrders.map((order, index) => (
                        <tr
                          className="border-b border-gray-200 hover:bg-gray-100"
                          key={index}
                        >
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="font-medium">#{order.id}</span>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-left">
                            {order.items?.map((item, index) => (
                              <div className="flex items-center" key={index}>
                                <div className="mr-2">
                                  <img
                                    className="w-6 h-6 rounded-full"
                                    src={item.thumbnail}
                                  />
                                </div>
                                <span>
                                  {item.product.title} (
                                  {`${discountPrice(item.product)} x ${
                                    item.quantity
                                  }`}
                                  )
                                </span>
                              </div>
                            ))}
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div className="">${order.totalAmount}</div>
                          </td>
                          <td className="py-3 px-6 text-center">
                            <strong>{order.selectedAddress.name}</strong> ,{" "}
                            {order.selectedAddress.street} ,
                            {order.selectedAddress.state} ,
                            {order.selectedAddress.pinCode},{" "}
                            {order.selectedAddress.phone}
                          </td>
                          <td className="py-3 px-6 text-center">
                            {order.id === editId ? (
                              <select
                                onChange={(e) => handleUpdate(e, order)}
                                className="py-0"
                              >
                                <option value="pending">Pending</option>
                                <option value="dispatched">Dispatched</option>
                                <option value="dilevered">Dilevered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            ) : (
                              <span
                                className={
                                  order.status === "pending"
                                    ? "bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs"
                                    : order.status === "dispatched"
                                    ? "bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs"
                                    : order.status === "dilevered"
                                    ? "bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs"
                                    : order.status === "cancelled"
                                    ? "bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs"
                                    : ""
                                }
                              >
                                {order.status}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div className="flex item-center justify-center">
                              <div
                                className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleEdit(order)}
                              >
                                <MdModeEditOutline />
                              </div>
                              <div
                                className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                style={{ cursor: "pointer" }}
                              >
                                <MdDelete />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        totalItems={totalCount}
        handlePage={handlePage}
      ></Pagination>
    </>
  );
}

export default AdminOrder;
