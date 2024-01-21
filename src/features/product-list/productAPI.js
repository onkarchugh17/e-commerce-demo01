import { headers } from "../../app/constants";
import { bearer_token } from "../../app/constants";

export function fetchProductsByFilters(filter, sort, pagination) {
  let queryString = "";

  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      const lastCategoryValues = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValues}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    let url = "http://localhost:8000/products?"+queryString;
    const response = await fetch(url, { headers });
    const data = await response.json();
    const totalItems = response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}

export function fetchCategory() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/category", { headers });
    const data = response.json();
    resolve({ data });
  });
}

export function fetchBrand() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/brand ", { headers });
    const data = response.json();
    resolve({ data });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8000/products/${id}`, {
      headers,
    });
    const data = response.json();
    resolve({ data });
  });
}

export function createNewProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/products/storeproduct", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        Authorization: bearer_token,
        "content-type": "application/json",
      },
    });
    const data = response.json();
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8000/products/" + update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: {
          Authorization: bearer_token,
          "content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}
