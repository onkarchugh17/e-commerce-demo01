import { headers } from "../../app/constants";
import { bearer_token } from "../../app/constants";

export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/order/createorder", {
      ...headers,
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        Authorization: bearer_token,
        "content-type": "application/json",
      },
    });
    const data = response.json();
    resolve({ data });
  });
}

export function fetchAllOrders({ sort, pagination }) {
  let queryString = "";
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    let url = "http://localhost:8000/order/allorders?" + queryString;
    const response = await fetch(url, {
      headers,
    });
    const data = await response.json();
    const totalOrders = response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrderCount: +totalOrders } });
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8000/order/${order.id}`, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: {
        Authorization: bearer_token,
        "content-type": "application/json",
      },
    });
    const data = response.json();
    resolve({ data });
  });
}
