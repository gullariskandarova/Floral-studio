const BASE_URL = " http://localhost:8080";
const products = document.querySelector(".products");
async function getAllProdutcs() {
  try {
    let res = await axios(`${BASE_URL}/produts`);
    console.log(res.data);
    drowCards(res.data);
  } catch (error) {
    console.log(error.message);
  }
}
getAllProdutcs();
$(function () {
  // Owl Carousel
  var owl = $(".owl-carousel");
  owl.owlCarousel({
    items: 3,
    margin: 10,
    loop: true,
    nav: true,
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

