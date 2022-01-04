// Déclarations des variables
let urlData = new URLSearchParams(window.location.search);
// console.log(urlData);
let urlId = urlData.get("id");
let productId = urlId;

let description;
let kanapName;
let altTxt;
let imageUrl;
let price;

//Insertion des données dans le dom, product.html et dans le panier
const displayProduct = () => {
  getOneProduct(productId).then((element) => {
    description = element.description;
    kanapName = element.name;
    altTxt = element.altTxt;
    imageUrl = element.imageUrl;
    price = element.price;

    document.querySelector(
      "body > main > div > section > article > div.item__img"
    ).innerHTML = `<img src="${element.imageUrl}" alt="${element.altTxt}"></img>`;
    document.querySelector("#title").innerHTML = `${element.name}`;
    document.querySelector("#price").innerHTML = `${element.price}`;
    document.querySelector("#description").innerHTML = `${element.description}`;
    let colors = element.colors;
    for (i = 0; i < colors.length; i++) {
      document.querySelector(
        "#colors"
      ).innerHTML += `<option value=${colors[i]}>${colors[i]}</option>`;
    }
  });
};
displayProduct();

document.querySelector("#addToCart").addEventListener("click", () => {
  //récupérer la couleur choisie
  let color = document.querySelector("#colors").value;

  //récupérer la quantité choisie
  let quantity = document.querySelector("#quantity").value;

  //tester que la couleur et la quantité ont été choisies
  if (color == "") {
    alert("Veuillez choisir une couleur avant de d'ajouter au panier");
    return;
  } else if (quantity < 1 || quantity > 100) {
    alert("Veuillez choisir une quantité de produit comprise entre 1 et 100");
    return;
  }
  // stocker dans un objet les variables du produit
  let dataStorage = {
    id: productId,
    color: color,
    quantity: quantity,
    description: description,
    imageUrl: imageUrl,
    price: price,
    altTxt: altTxt,
    kanapName: kanapName,
  };

  // Créer une variable de contenu du localstorage
  let storageContent = JSON.parse(localStorage.getItem("product"));

  //ajouter au localstrorage
  const addToStorage = () => {
    if (storageContent) {
      const res = storageContent.find(
        (element) => element.id === productId && element.color === color
      );
      if (res) {
        let newQuantity =
          parseInt(res.quantity) + parseInt(dataStorage.quantity);
        res.quantity = newQuantity;
        localStorage.setItem("product", JSON.stringify(storageContent));
        alert("Votre produit a bien été mis dans votre panier");
      } else {
        storageContent.push(dataStorage);
        localStorage.setItem("product", JSON.stringify(storageContent));
        alert("Votre produit a bien été mis dans votre panier");
      }
    } else {
      storageContent = [];
      storageContent.push(dataStorage);
      localStorage.setItem("product", JSON.stringify(storageContent));
      alert("Votre produit a bien été mis dans votre panier");
    }
  };

  addToStorage();
});
