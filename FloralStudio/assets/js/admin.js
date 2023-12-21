const tBody = document.querySelector("tbody");
const BASE_URL = "http://localhost:8080";
let productCopy = [];
const form = document.querySelector("form");
const allInputs = document.querySelectorAll("input");
const addBtn = document.querySelector(".add-product");
let favCount = document.querySelector("sup");
let favoriteProducts = JSON.parse(localStorage.getItem("favorite"));
favCountCalculate(favoriteProducts.length);

let editStatus = false;
let editId = null;
async function getAllProduct() {
  try {
    let res = await axios(`${BASE_URL}/products`);
    productCopy = res.data;
    console.log(productCopy);
    drawTable(productCopy);
  } catch (error) {
    console.log(error.message);
  }
}
getAllProduct();

function drawTable(data) {
  tBody.innerHTML = "";
  data.forEach((element) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `
        <td>${element.id}</td>
        <td><img src="${element.image}" /></td>
        <td>${element.title}</td>
        <td>${element.price}</td>
        <td>${element.description}</td>
        <td><i class="fa-solid fa-pen-to-square" onclick=editProduct(${element.id},this)></i> <i class="fa-solid fa-trash" onclick=deleteProduct(${element.id},this)></i></td>
    `;
    tBody.append(trElement);
  });
}

async function deleteProduct(id, icon) {
  try {
    if (confirm("Do you want to delete")) {
      icon.closest("tr");
      await axios.delete(`${BASE_URL}/products/${id}`);
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function editProduct(id, icon) {
  editStatus = true;
  addBtn.innerText = "EDIT";
  let res = await axios(`${BASE_URL}/products/${id}`);
  editId = res.data.id;
  allInputs[0].value = res.data.title;
  allInputs[1].value = res.data.price;
  allInputs[2].value = res.data.description;
  allInputs[3].value = res.data.image;
  console.log(res.data);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(allInputs[3].value);

  let newProduct = {
    image: allInputs[3].value,
    title: allInputs[0].value,
    price: allInputs[1].value,
    description: allInputs[2].value,
  };
  if (!editStatus) {
    axios.post(`${BASE_URL}/products`, newProduct);
  } else {
    axios.patch(`${BASE_URL}/products/${editId}`, newProduct);
  }

  allInputs[0].value = "";
  allInputs[1].value = "";
  allInputs[2].value = "";
  allInputs[3].value = "";
  console.log(newProduct);
});

function favCountCalculate(count) {
  favCount.innerText = count;
}
