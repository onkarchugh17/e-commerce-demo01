// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = response.json();
    resolve({ data });
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject({ error });
      }
    } catch (error) {
      reject({ error });
    }
  });
}

export function signOutUser(userId) {
  return new Promise(async (resolve) => {
    resolve({ data: "Success" });
  });
}
