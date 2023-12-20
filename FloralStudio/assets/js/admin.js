const tBody = document.querySelector("tbody");
const BASE_URL = "http://localhost:8080";
let productCopy = [];
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
  if (confirm("Do you want to delete")) {
    icon.closest("tr");
    await axios.delete(`${BASE_URL}/products/${id}`);
  }
}

// async function editProduct(id, icon) {

// }

