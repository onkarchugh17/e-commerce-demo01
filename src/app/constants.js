export const ITEM_PER_PAGE = 10;
export const imageUrl = "http://localhost:8000";

export function discountPrice(item) {
  return Math.round(
    Number(item.price) * (1 - Number(item.discountPercentage) / 100),
    2
  );
}

const getToken = JSON.parse(localStorage.getItem("userdata"))?.token;
export const bearer_token = `Bearer ${getToken}`;
export const headers = {
  Authorization: bearer_token,
};
