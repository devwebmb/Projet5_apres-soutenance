let urlData = new URLSearchParams(window.location.search);
// console.log(urlData);
let urlId = urlData.get("id");
let productId = urlId;

localStorage.clear();

document.querySelector("#orderId").innerHTML = `${productId}`;
