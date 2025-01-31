// *|* ======|> PRODUCT CARD HTML


// ^ =======|> html elements
let nameInput = document.getElementById("name")
let categoryInput = document.getElementById("category")
let priceInput = document.getElementById("price")
let descriptionInput = document.getElementById("description")
let imageInput = document.getElementById("imageInput")
let productsContainer = document.getElementById("productsContainer")
let searchInput = document.getElementById("searchInput")
let updateBtn = document.getElementById("updateBtn")
let addBtn = document.getElementById("addBtn")


// * ========|> app variables
const nameRegex = /^[A-Z][a-z]{3,}$/
const priceRegex= /^([1-9]|[1-9][0-9]|100)$/
const descriptionRegex= /^[a-zA-Z]{20,100}$/
const categoryRegex= /^[A-Z][A-Za-z]{3,}$/
let updatedIndex ;
let productList = JSON.parse(localStorage.getItem("products")) || []
dispalyAllProducts()

// & ==========|> functions
function addProduct(){
  if(validate(nameRegex,nameInput)&&validate(categoryRegex,categoryInput)&&validate(priceRegex,priceInput)&&validate(descriptionRegex,descriptionInput)&&imageInput.files.length!==0){
    let product = {
      name : nameInput.value ,
      category : categoryInput.value ,
      price : priceInput.value , 
      description : descriptionInput.value , 
      image : "./assets/imgs/" + imageInput.files[0].name
    }
  
    productList.push(product)
    localStorage.setItem("products" , JSON.stringify(productList))
    displayProduct(productList.length-1)
    clearInputs()
  }
}

function displayProduct(index){
  let productHtml = `<div class="col-md-3 col-sm-6">
  <div class="inner shadow px-3 py-4 rounded-3">
    <img
      src="${productList[index].image}"
      class="w-100"
      alt=""
    />
    <div class="d-flex justify-content-between align-items-center mt-4">
      <h2 class="h5">${productList[index].name}</h2>
      <span class="h5 fw-bold">${productList[index].price} $</span>
    </div>
    <div class="d-flex gap-2 align-items-center">
      <i class="fa-solid fa-tag"></i>
      <h3 class="h6">${productList[index].category}</h3>
    </div>
    <p class="text-secondary">${productList[index].description}</p>
    <button type="button" class="btn btn-outline-warning" onclick="getProductInfo(${index})">Update</button>
    <button type="button" class="btn btn-outline-danger" onclick="deleteProducts(${index})">Delete</button>
  </div>
</div> `
  productsContainer.innerHTML += productHtml 
}

function dispalyAllProducts(){
  for (let i = 0; i < productList.length; i++) { 
    displayProduct(i)
  }
}

function clearInputs (){
  nameInput.value = "";
  nameInput.classList.remove("is-valid","is-invalid");
  categoryInput.value = "";
  categoryInput.classList.remove("is-valid", "is-invalid");
  priceInput.value = "";
  priceInput.classList.remove("is-valid", "is-invalid");
  descriptionInput.value = "";
  descriptionInput.classList.remove("is-valid", "is-invalid");
  imageInput.value = "";
  imgSrc.innerHTML = '';

}

function deleteProducts(index){
  productList.splice(index , 1)
  localStorage.setItem("products" , JSON.stringify(productList))
  productsContainer.innerHTML = ""
  dispalyAllProducts()
}

function searchProduct(){

  productsContainer.innerHTML = ""
  for (let i=0 ; i<productList.length ; i++){
    if(productList[i].name.toLowerCase().includes(searchInput.value.toLowerCase())){
      displayProduct(i)
    }
  }

}

function validate(regex , element){
  if (regex.test(element.value)){
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.nextElementSibling.classList.add("d-none")
    return true;

  }
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    element.nextElementSibling.nextElementSibling.classList.remove("d-none")
    return false;
  
  
  
}

function getProductInfo(index){
  nameInput.value = productList[index].name;
  categoryInput.value = productList[index].category;
  priceInput.value = productList[index].price;
  descriptionInput.value = productList[index].description;
  imgSrc.innerHTML = productList[index].image;
  
  imgSrcContainer.classList.remove("d-none");

  addBtn.classList.add("d-none")
  updateBtn.classList.remove("d-none")
  updatedIndex = index ;
  
}

function updateProduct(){
  if(validate(nameRegex,nameInput)&&validate(categoryRegex,categoryInput)&&validate(priceRegex,priceInput)&&validate(descriptionRegex,descriptionInput))
    {
    productList[updatedIndex].name = nameInput.value;
    productList[updatedIndex].category = categoryInput.value;
    productList[updatedIndex].price = priceInput.value;
    productList[updatedIndex].description = descriptionInput.value;
    if (imageInput.files.length > 0){
      productList[updatedIndex].image = "./assets/imgs/" + imageInput.files[0].name
    }
  
  localStorage.setItem("products",JSON.stringify(productList))
  productsContainer.innerHTML = ""
  dispalyAllProducts();
  clearInputs();
  imgSrcContainer.classList.add("d-none")

  addBtn.classList.remove("d-none")
  updateBtn.classList.add("d-none")
  }  
}