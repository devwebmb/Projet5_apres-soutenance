const api = "http://localhost:3000/api/products";

const fetchApi = (api, options) => {
  return fetch(api, options)
    .then((response) => response.json())
    .catch((err) => console.log("erreur : " + err));
};

const getAllProducts = () => {
  return fetchApi(api);
};

const getOneProduct = (id) => {
  return fetchApi(api + "/" + id);
};

const postCart = (data) => {
  return fetchApi(api + "/order", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
