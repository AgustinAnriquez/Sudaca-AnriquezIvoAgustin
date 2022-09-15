// Funciones

// Funcion creadora de nuevas tarjetas de productos
function createProductCard(product){
    //Se crea elementos a utilizar para crear la tarjeta
    const containerProduct = document.createElement("div")
    const title = document.createElement("h3")
    const img = document.createElement("img")
    const costProduct = document.createElement("p")
    const{name, cost, image} = product
    // Se rellenan elementos de la tarjeta
    title.textContent = name
    costProduct.textContent = "Precio: $"+ cost
    img.setAttribute("src", image)
    containerProduct.appendChild(title)
    containerProduct.appendChild(img)
    containerProduct.appendChild(costProduct)
    productsList.appendChild(containerProduct)
    // Se agrega evento a cada tarjeta, por cada click a la tarjeta, se consultara si se desea agregar al carrito el producto
    containerProduct.onclick = function(){
        // En caso de confirmar la adhesion del producto al carrito se añade el producto al carrito(o se modifica cantidad del mismo), se modifica localStorage y se modifica costo total del carrito
        addItemInCart(product)
        saveCart()
        modifyTotalCost(cost)
        Toastify({

            text: "Se ha añadido producto al carrito",
            className: "info",
            duration: 3000,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
              }
            
            }).showToast();
            
    }
}

// Se modifica costo total del carrito
function modifyTotalCost(productCost){
    totalCost = totalCost + productCost
    totalCost > 0 ? buyProducts.style.display = "none" : buyProducts.style.display = "block" 
}

// Creacion de nuevo elemento en la lista de producto en el carrito
function newItemInCart(product){

    //se crea lista por cada producto que se añada al carrito
    const ul = document.createElement("ul")

    // Se crea elemento con su imagen

    const liImg = document.createElement("li")
    liImg.classList.add("productsBuyList-img")
    const img = document.createElement("img")
    img.src = product.image
    liImg.appendChild(img)

    // Se crea elemento con su titulo

    const liProduct = document.createElement("li")
    liProduct.classList.add("productsBuyList-li")
    const spanProductTitle = document.createElement("span")
    spanProductTitle.textContent = "Producto"
    liProduct.appendChild(spanProductTitle)
    const spanProductName= document.createElement("span")
    spanProductName.textContent = product.name
    spanProductName.classList.add("m-auto")
    liProduct.appendChild(spanProductName)

    // Se crea elemento con su cantidad

    const liQuantity = document.createElement("li")
    liQuantity.classList.add("productsBuyList-li")
    const spanTitleQuantity = document.createElement("span")
    spanTitleQuantity.textContent = "Cantidad"
    liQuantity.appendChild(spanTitleQuantity)
    const spanQuantity = document.createElement("span")
    spanQuantity.textContent = product.quantity
    spanQuantity.classList.add("m-auto")
    spanQuantity.setAttribute("id", "quantityId_" + product.id)
    liQuantity.appendChild(spanQuantity)

    // Se crea elemento con boton para quitar elemento de carrito

    const liButton = document.createElement("li")
    liButton.classList.add("productsBuyList-li")
    const spanTitleButton = document.createElement("span")
    spanTitleButton.textContent = "Quitar producto"
    liButton.appendChild(spanTitleButton)
    const buttonRemove = document.createElement("button")
    buttonRemove.classList.add("btn", "btn-danger", "m-auto")
    buttonRemove.textContent = "Quitar"
    liButton.appendChild(buttonRemove)

    // Se añaden elementos a lista de compra

    ul.appendChild(liImg)
    ul.appendChild(liProduct)
    ul.appendChild(liQuantity)
    ul.appendChild(liButton)
    ul.classList.add("productsBuyList")
    cartList.appendChild(ul)


    // Se añade evento al elemento, boton "delete", cuando se hace click en el se borra el elemento o se modifica cantidad en caso de que haya agregado mas de un elemento en el carrito 
    buttonRemove.onclick = function(){
        // Se modifica costo total del carrito, se envia costo en negativo, debido que se elimino el producto del carrito
        modifyTotalCost(-(product.cost))
        // Si se elimino la totalidad del mismo producto, se lo elimina de la lista
        if (deleteProductOfCart(product)){
            cartList.removeChild(ul)
            if (productsInCart.length ===0){
                formRequest.style.display = "none" 
            }
        }

        Toastify({

            text: "Se ha eliminado producto del carrito",
            className: "info",
            duration: 3000,
            style: {
                background: "linear-gradient(to right, #d63333, #fc2105)",
              }
            
            }).showToast();
    }
}

// funcion que añade nuevos productos al carrito o modifica cantidad de producto en carrito
function addItemInCart(product){
    // se crea bandera para verificar si el producto existe en el carrito
    const productFlag = productsInCart.some(productInCart => productInCart.id == product.id)
    let productExist
    // En caso de que el producto ya se encuentre en el carrito, se modifica su cantidad tanto en el arreglo como en el DOM
    if(productFlag){
        const newProductsInCart = productsInCart.map(
            productInCart =>{
                if (productInCart.id == product.id){
                    productInCart.quantity++
                    productExist = productInCart
                    return productInCart
                }else{
                    return productInCart
                }
            }
        )
        productsInCart = newProductsInCart
        modifyQuantityOfProduct(productExist)
    }
    // En caso de que el producto no se encuentre en el carrito, se lo añade al arreglo y se añade nuevo elemento al DOM
    else{
        productsInCart.push(product)
        newItemInCart(product)
    }
}

// Se modifica localStorage siempre que se modifique el arreglo del carrito
function saveCart(){
    localStorage.setItem('cart', JSON.stringify(productsInCart))
}

// Se modifica en DOM del carrito la cantidad del producto en el mismo
function modifyQuantityOfProduct(product){
    let spanOfProductQuantity = document.getElementById("quantityId_" + product.id)
    spanOfProductQuantity.textContent = product.quantity
}

// Funcion encargada de modificar cantidad de producto o eliminarlo del carrito, retorna una bandera que indica si el producto fue eliminado del carrito
function deleteProductOfCart(product){
    let productExist
    let productRemoveFlag
    // en caso de que la cantidad del producto sea 1, se lo elimina del carrito
    if (product.quantity == 1){
        productsInCart = productsInCart.filter((productInCart) => productInCart.id != product.id)
        productRemoveFlag = true
    }
    // En caso de que la cantidad sea mayor a 1, se resta en 1 cantidad de producto en carrito
    else{
    const newProductsInCart = productsInCart.map(
        productInCart =>{
            if (productInCart.id == product.id){
                productInCart.quantity--
                productExist = productInCart
                return productInCart
            }else{
                return productInCart
            }
        }
    )
    productsInCart = newProductsInCart
    // se modifica en DOM cantidad de producto
    modifyQuantityOfProduct(productExist)
    productRemoveFlag = false
   } 
   // se actualiza localStorage
   saveCart()
   return productRemoveFlag
}

// Funcion inicializadora de productos disponibles
const initializeProducts = async () =>{
    const data = await initializeJson(urlProductsJson)
    productsArray = data.map(product => new Product(product));
}

//Funcion que crea tarjetas para productos destacados y los muestra
const viewFeaturedProducts = async () =>{
    await initializeProducts()
    const title = "Algunos de nuestros trabajos"
    const featuredProducts = productsArray.filter((product) => product.featured == "S")
    loadHome(featuredProducts, title)
}

//Funcion para filtrar elementos con buscador
const productsSearchFilter = async () =>{
    await initializeProducts()
    productsList.innerHTML = ''
    const productsSearchText = productsSearch.value.toLowerCase()
    for(let product of productsArray){
        let name = product.name.toLowerCase()
        if(name.indexOf(productsSearchText) !== -1 ){
            productsListTitle.textContent = "Resultados de la busqueda"
            createProductCard(product)
        }
    }
    if (productsList.innerHTML == ''){
        productsListTitle.textContent = "No se encontraron resultados"
    }

}

// Funcion inicializadora de jsons
const initializeJson = async (url) =>{
    const resp = await fetch(url)
    let data = await resp.json()
    return data
}

// Funcion inicializadora de categorias disponibles
const initializeCategorys = async () =>{
    const data = await initializeJson(urlCategorysJson)
    categorysArray = data.map(category => new Category(category));
}

// Funcion inicializadora de subcategorias disponibles
const initializeSubCategorys = async () =>{
    const data = await initializeJson(urlSubCategorysJson)
    SubCategorysArray = data.map(subCategory => new SubCategory(subCategory));
}

// Funcion para mostrar categorias disponibles en menu desplegable
const viewCategorysList = async () =>{
    await initializeCategorys()
    for (category of categorysArray){
        newCategoryInList(category)
    }
}

// Funcion para crear elemento y añadirlo a menu desplegable de categorias
function newCategoryInList(category){
    const a = document.createElement("a")
    a.textContent = category.name
    a.href = "#"+category.name.replace(/\s+/g, '-')
    a.id = "category_" + category.id 
    categorysList.appendChild(a)
    a.addEventListener('click', ()=>{
        const categoryProducts = productsArray.filter((product) => product.id_category == category.id)
        loadHome(categoryProducts, category.name)
    }   
    )
}

// Funcion para mostrar subcategorias disponibles en categoria que tenga subcategorias
const viewSubcategorys = async () =>{
    await initializeSubCategorys()
    for (subCategory of SubCategorysArray){
        newSubCategoryInCategory(subCategory)
    }
}

//Se añade subcategoria en categoria correspondiente 
function newSubCategoryInCategory(subCategory){
    const a = document.getElementById("category_" + subCategory.id_category)
    if (a.children.length > 0){
        const ul = document.getElementById("list_" + subCategory.id_category)
        const li = addSubCategoryInCategory(subCategory)
        ul.appendChild(li)
    }else{
        const svg = document.createElement("img")
        svg.src = "img/svg/arrow-right-circle-fill.svg"
        a.appendChild(svg)
        const ul = document.createElement("ul")
        ul.id = "list_" + subCategory.id_category
        const li = addSubCategoryInCategory(subCategory)
        ul.appendChild(li)
        a.appendChild(ul) 
    } 
    const ul = document.getElementById("list_" + subCategory.id_category)
    a.addEventListener('mouseover', ()=>{
        ul.style.display = "block";
        
    })
    a.addEventListener('mouseout', ()=>{
        ul.style.display = "none";
    })
}

// Se crean elementos necesarios para cada elemento de subcategoria
function addSubCategoryInCategory(subCategory){
    const li = document.createElement("li")
    const a = document.createElement("a")
    a.textContent = subCategory.name
    a.href = "#"+subCategory.name.replace(/\s+/g, '-')
    a.id = "subcategory_" + subCategory.id
    li.appendChild(a)
    a.addEventListener('click', (e)=>{
        e.stopPropagation()
        const subCategoryProducts = productsArray.filter((product) => product.id_subCategory == subCategory.id)
        loadHome(subCategoryProducts, subCategory.name)
    })  
    return li
}

function loadHome(productsArray, title){
    formRequest.style.display = "none"
    cartList.style.display = "none"
    productsList.innerHTML = ''
    productsListTitle.textContent = title
    for (product of productsArray){
        createProductCard(product)
    }
}

/* -------------------------------------------------VARIABLES GLOBALES-------------------------------------------------------- */

// Arreglo en el que se guardaran todos los productos disponibles, luego de recorrer json
let productsArray

// Se inicializa arreglo con las categorias disponibles 
let categorysArray

// Se inicializa arreglo con las subcategorias disponibles 
let SubCategorysArray

// Se crea variables con elementos del dom que se los modificara mas adelante

const buyProducts = document.getElementById("buyProducts")
const cartList = document.getElementById("cart")
const productsList = document.getElementById("productsList")
const productsSearch = document.getElementById("ProductsSearch")
const productsSearchBtn = document.getElementById("ProductsSearchBtn")
const productsListTitle = document.getElementById("productsListTitle")
const categorysList = document.getElementById("categorys-list")
const categorysLink = document.getElementById("categorysLink")
const HomeLogo = document.getElementById("HomeLogo")
const cartRequest= document.getElementById("cartRequest")
const formRequest = document.getElementById("formRequest")
const formInformation = document.getElementById("information")

//url con path relativo al json, donde se encuentran cargados todos los productos
const urlProductsJson = './js/products.json'

//url con path relativo al json, donde se encuentran cargadas todas las categorias
const urlCategorysJson = './js/categorys.json'

//url con path relativo al json, donde se encuentran cargadas todas las subcategorias
const urlSubCategorysJson = './js/subcategorys.json'

// Se inicializa acumulador de carrito
let totalCost = 0


/* ------------------------------------------------------EVENTOS--------------------------------------------------------------- */

// Se agrega evento de click a menu desplegable de categorias
categorysLink.addEventListener('click', ()=>{
    categorysList.style.display === "none" ? categorysList.style.display = "block" : categorysList.style.display = "none"
}   
)

// Se agrega evento para que cada vez que se actualice la pagina se rellene arreglo del carrito con lo guardado en el localStorage 
document.addEventListener('DOMContentLoaded', ()=>{
    productsInCart = JSON.parse(localStorage.getItem('cart')) || []
    for (product of productsInCart){
        // por cada producto en el carrito se crea nuevo elemento en la lista
        newItemInCart(product)
        // se modifica costo total de carrito en base a los productos cargados en el localStorage y la cantidad de los mismos
        modifyTotalCost(product.cost * product.quantity)
    }
    // Se muestran productos destacados
    viewFeaturedProducts()
    // Se muestran categorias disponibles
    viewCategorysList()
    // Se muestran subcategorias disponibles
    viewSubcategorys()
})

productsSearchBtn.addEventListener('click', productsSearchFilter)
productsSearch.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        productsSearchFilter()
    }
});

HomeLogo.addEventListener('click', ()=>{
    // Se muestran productos destacados
    viewFeaturedProducts()
    // Se oculta carrito
})

cartRequest.addEventListener('click', ()=>{
    cartList.style.display = "flex"
    productsList.innerHTML = ''
    productsListTitle.innerHTML = ''
    if (productsInCart.length === 0 ){
        formRequest.style.display = "none" 
    }else{
        formRequest.style.display = "block"
        formInformation.value =''
        for(product of productsInCart){
            formInformation.value +=" producto: " + product.name + " cantidad: " + product.quantity + "/"
        }
        console.log(formInformation.value)
    } 
})