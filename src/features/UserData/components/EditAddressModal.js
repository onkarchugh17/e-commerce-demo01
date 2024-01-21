import React, { useEffect } from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { updateUserAsync } from "../userSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo } from "../userSlice";
import { useFormik } from "formik";
import { addressSchema } from "../../../schemas";
import { GrUpdate } from "react-icons/gr";

function EditAddressModal({ open, handleClose, editId }) {
  const cancelButtonRef = useRef(null);
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    pinCode: "",
    street: "",
  };

  const {
    handleSubmit,
    values,
    errors,
    handleChange,
    touched,
    handleBlur,
    resetForm,
    setValues,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: addressSchema,
    onSubmit: (values) => {
        const newUser = {...user , addresses:[...user.addresses]}
        newUser.addresses.splice(editId,1,values)
        dispatch(updateUserAsync(newUser))
        handleClose()
    },
  });

  useEffect(() => {
    if (open) {
      setValues(user.addresses[editId]);
    }
  }, [editId, open]);

  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => handleClose}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white pb-2 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                        <GrUpdate
                          className="h-3 w-3 text-indigo-600 "
                          aria-hidden="true"
                        />
                      </div>
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900 mt-2 mx-3"
                      >
                        Update Address
                      </Dialog.Title>
                    </div>
                    <div className="mt-1 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <form onSubmit={handleSubmit}>
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
                            onClick={() => {
                              handleClose();
                              resetForm();
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Update Address
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default EditAddressModal;
