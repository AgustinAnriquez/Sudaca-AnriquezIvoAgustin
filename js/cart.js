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
        if (confirmMessage(name)){
            addItemInCart(product)
            saveCart()
            modifyTotalCost(cost)
        }
    }
}

// Se modifica costo total del carrito
function modifyTotalCost(productCost){
    totalCost = totalCost + productCost
    totalCost > 0 ? buyProducts.textContent = "Costo total: $" + totalCost : buyProducts.textContent ="No hay productos en el carrito" 
}

// Mensaje para confirmar adhesion de producto al carrito
function confirmMessage(ProductName){
    return confirm("Desea agregar al carrito " + ProductName + "?")
}

// Creacion de nuevo elemento en la lista de producto en el carrito
function newItem(product){
    // Se crea elemento con su nombre, costo por unidad y cantidad seleccionada
    const li = document.createElement("li")
    const span = document.createElement("span")
    span.textContent = product.name + " $" + product.cost + " x" + product.quantity
    span.setAttribute("id", "id_" + product.id)
    const buttonRemove = document.createElement("button")
    buttonRemove.classList.add("btn", "btn-danger")
    buttonRemove.textContent = "Quitar"
    li.appendChild(span)
    li.appendChild(buttonRemove)
    productsBuyList.appendChild(li)
    // Se añade evento al elemento, boton "delete", cuando se hace click en el se borra el elemento o se modifica cantidad en caso de que haya agregado mas de un elemento en el carrito 
    buttonRemove.onclick = function(){
        // Se modifica costo total del carrito, se envia costo en negativo, debido que se elimino el producto del carrito
        modifyTotalCost(-(product.cost))
        // Si se elimino la totalidad del mismo producto, se lo elimina de la lista
        deleteProductOfCart(product) && productsBuyList.removeChild(li)
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
        newItem(product)
    }
}

// Se modifica localStorage siempre que se modifique el arreglo del carrito
function saveCart(){
    localStorage.setItem('cart', JSON.stringify(productsInCart))
}

// Se modifica en DOM del carrito la cantidad del producto en el mismo
function modifyQuantityOfProduct(product){
    let spanOfProduct = document.getElementById("id_" + product.id)
    spanOfProduct.textContent = product.name + " $" + product.cost + " x" + product.quantity
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


// Variables globales

// Se crea variables con elementos del dom que se los modificara mas adelante
const buyProducts = document.getElementById("buyProducts")
const productsBuyList = document.getElementById("productsBuyList")
const productsList = document.getElementById("productsList")

// Se inicializa acumulador de carrito
let totalCost = 0

// Se inicializa arreglo que va guardando los productos del carrito
let productsInCart = []

// Se inicializa y se llena arreglo con las categorias disponibles 
const categorysArray = []
categorysArray.push(new Category("Vasos"))
categorysArray.push(new Category("Boligrafos"))
categorysArray.push(new Category("Botellas"))
categorysArray.push(new Category("Llaveros"))
categorysArray.push(new Category("Escritorio"))

// Se inicializa y se llena arreglo con los productos disponibles 
const productsArray = []
productsArray.push(new Product(1, "Vaso termico", "10", "Vasos", "/img/vasoTermico.png"))
productsArray.push(new Product(2, "Anotador", "8", "Escritorio", "/img/anotador.png"))
productsArray.push(new Product(3, "Boligrafo", "4", "Boligrafos", "/img/boligrafo.jpg"))
productsArray.push(new Product(4, "Llavero", "2", "Llaveros", "/img/llavero.png"))
productsArray.push(new Product(5, "Botella plastica", "10", "Botellas", "/img/botellaPlastica.png"))


//Main

// Se agrega evento para que cada vez que se actualice la pagina se rellene arreglo del carrito con lo guardado en el localStorage 
document.addEventListener('DOMContentLoaded', ()=>{
    productsInCart = JSON.parse(localStorage.getItem('cart')) || []
    for (product of productsInCart){
        // por cada producto en el carrito se crea nuevo elemento en la lista
        newItem(product)
        // se modifica costo total de carrito en base a los productos cargados en el localStorage y la cantidad de los mismos
        modifyTotalCost(product.cost * product.quantity)
    }
})

// por cada producto de arreglo con productos disponibles se crea nueva tarjeta
for (product of productsArray){
    createProductCard(product)
}


