let products = document.querySelector(".products");
let favCount = document.querySelector("sup");

const BASE_URL = " http://localhost:8080";
let favoriteProducts = JSON.parse(localStorage.getItem("favorite")) ?? [];
drowCards(favoriteProducts);
favCountCalculate(favoriteProducts.length);

function drowCards(data) {
  products.innerHTML = "";
  data.forEach((element) => {
    let card = document.createElement("div");
    card.className = "card";

    let imageElement = document.createElement("img");
    imageElement.src = `${element.image}`;
    let contentElement = document.createElement("div");
    contentElement.className = "content";
    let titleEelement = document.createElement("h4");
    titleEelement = `${element.title}`;
    let priceElement = document.createElement("p");
    priceElement = `$${element.price}`;
    let iconElement = document.createElement("i");
    iconElement.className = "fa-solid fa-heart";
    contentElement.append(titleEelement, priceElement, iconElement);
    card.append(imageElement, contentElement);
    products.append(card);
    iconElement.addEventListener("click", function () {
      favoriteProducts = favoriteProducts.filter(
        (item) => item.id !== element.id
      );
      localStorage.setItem("favorites", JSON.stringify(favoriteProducts));
      card.remove();
    });
  });
}

function favCountCalculate(count) {
  favCount.innerText = count;
}
