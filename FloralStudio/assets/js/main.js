const BASE_URL = " http://localhost:8080";
const products = document.querySelector(".products");
const menu = document.querySelector(".fa-bars");
const mediaNav = document.querySelector(".media-nav");
const sortBtn = document.querySelector(".sorted");
let productsCopy = [];
let limit = 3;
const loadMore = document.querySelector(".loadMore");
async function getAllProdutcs() {
  try {
    let res = await axios(`${BASE_URL}/products`);
    // console.log(res.data);
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
    card.innerHTML = `
    <img src="${element.image}" alt="flower">
    <div class="content">
    <h4>${element.title}</h4>
    <p>${element.price}</p>
    </div>
    `;
    products.append(card);
  });
}

menu.addEventListener("click", function () {
  menu.classList.toggle("fa-x");
  menu.classList.contains("fa-x")
    ? (mediaNav.style.display = "flex")
    : (mediaNav.style.display = "none");
});

sortBtn.addEventListener("click", function () {
  let sorted = productsCopy.sort((a, b) =>
    a.title.toLocaleLowerCase().localeCompare(b.title.toLocaleLowerCase())
  );
  drowCards(sorted);
});

loadMore.addEventListener("click", function () {
  limit += 3;
  if (productsCopy.length <= limit) {
    this.remove();
  }
  drowCards(productsCopy.slice(0, limit));
});
