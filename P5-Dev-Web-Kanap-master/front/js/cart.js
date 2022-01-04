// Créer une variable de contenu du localstorage
let storageContent = JSON.parse(localStorage.getItem("product"));
// créer et insérer des éléments dans la page panier
const cartDisplay = () => {
  //déclaration des variables
  let quantityArray = [];
  let priceArray = [];
  let totalQuantity = 0;
  let totalPrice = 0;

  // insertion dans le dom de chaque article
  for (let element of storageContent) {
    document.querySelector(
      "#cart__items"
    ).innerHTML += ` <article class="cart__item" data-id="$element.id}">
    <div class="cart__item__img">
      <img src="${element.imageUrl}" alt="${element.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${element.kanapName}</h2>
        <p>(${element.color})</p><br>
        <p>${element.price * element.quantity},00€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
            element.quantity
          }">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
    quantityArray.push(parseInt(element.quantity));
    priceArray.push(parseInt(element.price * element.quantity));
  }
  // Récupération et insertion dans le dom du prix et de la quantité totale
  for (let i = 0; i < quantityArray.length; i++) {
    totalQuantity += quantityArray[i];
  }
  for (let i = 0; i < priceArray.length; i++) {
    totalPrice += priceArray[i];
  }
  document.querySelector("#totalQuantity").innerHTML = `${totalQuantity}`;
  document.querySelector("#totalPrice").innerHTML = `${totalPrice}`;
};

// fonction de modification du panier (quantité)
const toModifyQuantity = () => {
  let quantity = document.querySelectorAll(".itemQuantity");

  for (let i = 0; i < quantity.length; i++) {
    quantity[i].addEventListener("change", (e) => {
      e.preventDefault();

      let toModifyQuantity = storageContent[i].quantity;
      let newQauntityvalue = quantity[i].value;

      const res = storageContent.find(
        (el) => el.newQauntityvalue !== toModifyQuantity
      );
      res.quantity = newQauntityvalue;
      storageContent[i].quantity = res.quantity;
      console.log(res.quantity);

      localStorage.setItem("product", JSON.stringify(storageContent));

      location.reload();
    });
  }
};

// fonction pour supprimer un élément du panier
const deleteProduct = () => {
  let deleteButton = document.querySelectorAll(".deleteItem");

  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", (e) => {
      e.preventDefault();

      let idToDelete = storageContent[i].id;
      let colorToDelete = storageContent[i].color;
      storageContent = storageContent.filter(
        (el) => el.id !== idToDelete || el.color !== colorToDelete
      );

      localStorage.setItem("product", JSON.stringify(storageContent));

      alert("Votre produit a été retiré du panier");

      location.reload();
    });
  }
};

// fonction pour vérifier le formulaire et de post vers l'api
const order = () => {
  let order = document.querySelector("#formOrder");
  let products = [];
  for (let i = 0; i < storageContent.length; i++) {
    products.push(storageContent[i].id);
  }
  order.addEventListener("submit", (e) => {
    e.preventDefault();
    let firstName = document.querySelector("#firstName").value;
    let lastName = document.querySelector("#lastName").value;
    let address = document.querySelector("#address").value;
    let city = document.querySelector("#city").value;
    let email = document.querySelector("#email").value;
    let contact = {};

    let regName = new RegExp("^[a-z '-.éèôï]+$", "i");
    let regAddress = new RegExp("^[a-z0-9 '-.éèôï]+$", "i");
    let regEmail = new RegExp("^([a-zA-Z0-9.-_])+@([[a-z)+.([a-z])+$", "g");

    if (regName.test(firstName)) {
      if (regName.test(lastName)) {
        if (regAddress.test(address)) {
          if (regName.test(city)) {
            if (regEmail.test(email)) {
              contact = {
                firstName: firstName,
                lastName: lastName,
                address: address,
                city: city,
                email: email,
              };
              let newOrder = { contact, products };

              postCart(newOrder).then((data) => {
                window.location.href = "confirmation.html?id=" + data.orderId;
              });
            } else {
              document.querySelector(
                "#emailErrorMsg"
              ).innerHTML = `Entrer une adresse mail valide`;
            }
          } else {
            document.querySelector(
              "#cityErrorMsg"
            ).innerHTML = `Entrer un nom de ville correcte`;
          }
        } else {
          document.querySelector(
            "#addressErrorMsg"
          ).innerHTML = `Veuillez écrire une adresse correcte`;
        }
      } else {
        document.querySelector(
          "#lastNameErrorMsg"
        ).innerHTML = `Entrer un nom valide`;
      }
    } else {
      document.querySelector(
        "#firstNameErrorMsg"
      ).innerHTML = `Entrer un prénom valide`;
    }
  });
};

cartDisplay();
toModifyQuantity();
deleteProduct();
order();
