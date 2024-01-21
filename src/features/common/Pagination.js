import React from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { ITEM_PER_PAGE } from "../../app/constants";

function Pagination({ page, handlePage, totalItems, setPage }) {
  return (
    <>
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * ITEM_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {page * ITEM_PER_PAGE < totalItems
                ? page * ITEM_PER_PAGE
                : totalItems}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 curson-pointer"
              onClick={() =>
                setPage(
                  page > 1 ? page - 1 : Math.ceil(totalItems / ITEM_PER_PAGE)
                )
              }
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {Array.from({ length: Math.ceil(totalItems / ITEM_PER_PAGE) }).map(
              (e, i) => {
                return (
                  <a
                    aria-current="page"
                    className={`relative z-10 inline-flex items-center ${
                      i + 1 === page
                        ? "bg-indigo-600 text-white"
                        : "text-gray-400"
                    }  px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer`}
                    onClick={() => handlePage(e, i + 1)}
                    key={i}
                  >
                    {i + 1}
                  </a>
                );
              }
            )}

            <a
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() =>
                setPage(
                  page < Math.ceil(totalItems / ITEM_PER_PAGE) ? page + 1 : 1
                )
              }
              F
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon
                className="h-5 w-5 cursor-pointer"
                aria-hidden="true"
              />
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Pagination;
