import { headers } from "../../app/constants";
import { bearer_token } from "../../app/constants";

export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/cart/addtocart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        Authorization: bearer_token,
        "content-type": "application/json",
      },
    });
    const data = response.json();
    resolve({ data });
  });
}

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/cart?user=" + userId, {
      headers,
    });
    const data = response.json();
    resolve({ data });
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: {
        Authorization: bearer_token,
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteFromCart(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/cart/" + id, {
      method: "DELETE",
      headers: {
        Authorization: bearer_token,
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data: { id: id } });
  });
}

export function resetCart(userId) {
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId(userId);
    const items = await response.data;
    for (let item of items) {
      await deleteFromCart(item.id);
    }
    resolve({ status: "Success" });
  });
}
