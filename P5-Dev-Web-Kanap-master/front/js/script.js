(() => {
  getAllProducts().then((data) => {
    for (let element of data) {
      //Ajout des différents articles de façon dynamique
      document.querySelector(
        "#items"
      ).innerHTML += ` <a href="./product.html?id=${element._id}">
            <article>
              <img src="${element.imageUrl}" alt="${element.altTxt}">
              <h3 class="productName">${element.name}</h3>
              <p class="productDescription">${element.description}</p>
            </article>
          </a>`;
    }
  });
})();
