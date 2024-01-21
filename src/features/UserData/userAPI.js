import { headers } from "../../app/constants";
import { bearer_token } from "../../app/constants";

export function fetchUserInfo(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/users/" + userId , {
      headers
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8000/order/?user.id=" + userId , {
        headers
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/users/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: {
        Authorization: bearer_token,
        "content-type": "application/json",
      },
    });
    const data = response.json();
    resolve({ data });
  });
}
