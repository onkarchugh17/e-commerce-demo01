import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";
import { fetchUserOrdersAsync, selectUserInfo } from "../userSlice";
import Navbar from "../../navbar/Navbar";
import { BsPencil } from "react-icons/bs";
import { MdOutlineDeleteOutline } from "react-icons/md";
import DeleteAddressModal from "./DeleteAddressModal";
import { useFormik } from "formik";
import { addressSchema } from "../../../schemas";
import EditAddressModal from "./EditAddressModal";

export default function UserProfile() {
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);

  function handleClose() {
    setOpenDeleteModal(false);
    setOpenEditModal(false);
    setDeleteId(null);
    setEditId(null);
  }

  useEffect(() => {
    dispatch(fetchUserOrdersAsync(user?.id));
  }, [dispatch]);

  return (
    <>
      <Navbar></Navbar>
      <div className="mx-auto max-w-7xl mt-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900 text-start">
            Name : {user?.name ? user?.name : "Guest"}
          </h1>
          <h1 className="text-xl my-5 font-bold tracking-tight text-gray-900 text-start">
            Email : {user?.email}
          </h1>

          {user.role === "admin" && (
            <h1 className="text-xl my-5 font-bold tracking-tight text-gray-900 text-start">
              Role : {user?.role}
            </h1>
          )}
        </div>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <p className="mt-0.5 text-sm text-gray-500">My Addresses</p>
          {user?.addresses.map((address, index) => (
            <div className="flex justify-between gap-x-6 py-3 px-3 mt-3 border-solid border-2 	border-gray-300">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-lg font-semibold leading-6 text-gray-900 text-start">
                    {address?.name}
                  </p>
                  <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                    {`${address?.street} , ${address?.city} , ${address?.state} - ${address?.pinCode}`}
                  </p>
                  <p className="text-sm font-semibold leading-6 text-gray-600 text-start">
                    {address?.phone}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-row sm:items-start">
                <BsPencil
                  className="mr-2 text-sm cursor-pointer"
                  onClick={() => {
                    setOpenEditModal(true);
                    setEditId(index);
                  }}
                />
                <MdOutlineDeleteOutline
                  className="text-base cursor-pointer"
                  onClick={() => {
                    setOpenDeleteModal(true);
                    setDeleteId(index);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <DeleteAddressModal
        open={openDeleteModal}
        handleClose={handleClose}
        deleteId={deleteId}
      ></DeleteAddressModal>

      <EditAddressModal
        open={openEditModal}
        handleClose={handleClose}
        editId={editId}
      ></EditAddressModal>
    </>
  );
}
