const BASE_URL = " http://localhost:8080";
const products = document.querySelector(".products");
const menu = document.querySelector(".fa-bars");
const mediaNav = document.querySelector(".media-nav");
const sortBtn = document.querySelector(".sorted");
let search = document.querySelector(".search");
let favCount = document.querySelector("sup");
let favoriteProducts = JSON.parse(localStorage.getItem("favorite")) ?? [];
let productsCopy = [];
let productCopyBeforeSorted = [];
let limit = 3;
favCountCalculate(favoriteProducts.length);
const loadMore = document.querySelector(".loadMore");
async function getAllProdutcs() {
  try {
    let res = await axios(`${BASE_URL}/products`);
    // console.log(res.data);
    productCopyBeforeSorted = res.data;
    productsCopy = res.data;
    drowCards(res.data.slice(0, limit));
  } catch (error) {
    console.log(error.message);
  }
}
getAllProdutcs();
$(function () {
  // Owl Carousel
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      600: {
        items: 2,
        nav: false,
      },
      1000: {
        items: 3,
        nav: true,
        loop: false,
      },
    },
  });
});

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
    iconElement.className = "fa-regular fa-heart";
    const bool = favoriteProducts.find((item) => item.id === element.id);
    iconElement.className = !bool ? "fa-regular fa-heart" : "fa-solid fa-heart";
    contentElement.append(titleEelement, priceElement, iconElement);
    card.append(imageElement, contentElement);
    products.append(card);
    iconElement.addEventListener("click", function () {
      iconElement.className === "fa-regular fa-heart"
        ? (iconElement.className = "fa-solid fa-heart")
        : (iconElement.className = "fa-regular fa-heart");

      let favoriteProducts = JSON.parse(localStorage.getItem("favorite")) ?? [];
      let favProduct = favoriteProducts.findIndex(
        (item) => item.id === element.id
      );
      if (favProduct === -1) {
        favoriteProducts.push(element);
      } else {
        favoriteProducts.splice(favProduct, 1);
      }
      localStorage.setItem("favorite", JSON.stringify(favoriteProducts));
      favCountCalculate(favoriteProducts.length);
    });
  });
}

menu.addEventListener("click", function () {
  menu.classList.toggle("fa-x");
  menu.classList.contains("fa-x")
    ? (mediaNav.style.display = "flex")
    : (mediaNav.style.display = "none");
});

loadMore.addEventListener("click", function () {
  limit += 3;
  if (productsCopy.length <= limit) {
    this.remove();
  }
  drowCards(productsCopy.slice(0, limit));
});

sortBtn.addEventListener("click", function () {
  let sorted;
  if (sortBtn.innerText === "asc") {
    sortBtn.innerText = "des";
    sorted = productsCopy.sort((a, b) =>
      a.title.toLocaleLowerCase().localeCompare(b.title.toLocaleLowerCase())
    );
  } else if (sortBtn.innerText === "des") {
    sortBtn.innerText = "default";
    sorted = productsCopy.sort((a, b) =>
      b.title.toLocaleLowerCase().localeCompare(a.title.toLocaleLowerCase())
    );
  } else {
    sortBtn.innerText = "asc";
    sorted = productCopyBeforeSorted;
  }
  drowCards(sorted);
});

search.addEventListener("input", function (e) {
  products.innerHTML = "";
  let filtered = productsCopy.filter((item) =>
    item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  drowCards(filtered);
});

function favCountCalculate(count) {
  favCount.innerText = count;
}
