function createProductCard(product){
    const containerProduct = document.createElement("div")
    const title = document.createElement("h3")
    const img = document.createElement("img")
    const cost = document.createElement("p")
    title.textContent = product.name
    cost.textContent = "Precio: $"+ product.cost
    img.setAttribute("src", product.image)
    containerProduct.appendChild(title)
    containerProduct.appendChild(img)
    containerProduct.appendChild(cost)
    productsList.appendChild(containerProduct)
    containerProduct.onclick = function(){
        if (confirmMessage(product)){
            newItem(product)
            totalCost = totalCost + product.cost
            buyProducts.textContent = "Costo total: $" + totalCost
        }
    }
}

function confirmMessage(product){
    return confirm("Desea agregar al carrito " + product.name + "?")
}

function newItem(product){
    const li = document.createElement("li")
    const span = document.createElement("span")
    span.textContent = product.name + " $" + product.cost + " "
    const buttonRemove = document.createElement("button")
    buttonRemove.classList.add("btn", "btn-danger")
    buttonRemove.textContent = "Quitar"
    li.appendChild(span)
    li.appendChild(buttonRemove)
    productsBuyList.appendChild(li)
    buttonRemove.onclick = function(){
        totalCost = totalCost - product.cost 
        productsBuyList.removeChild(li)
        if (totalCost > 0){
            buyProducts.textContent = "Costo total: $" + totalCost
        }else{
            buyProducts.textContent ="No hay productos en el carrito" 
        }
    }
}

const buysArray = []
const buyProducts = document.getElementById("buyProducts")
const productsBuyList = document.getElementById("productsBuyList")
const productsList = document.getElementById("productsList")
let totalCost = 0

const categorysArray = []
categorysArray.push(new Category("Vasos"))
categorysArray.push(new Category("Boligrafos"))
categorysArray.push(new Category("Botellas"))
categorysArray.push(new Category("Llaveros"))
categorysArray.push(new Category("Escritorio"))

const productsArray = []
productsArray.push(new Product("Vaso termico", "10", "Vasos", "/img/vasoTermico.png"))
productsArray.push(new Product("Anotador", "8", "Escritorio", "/img/anotador.png"))
productsArray.push(new Product("Boligrafo", "4", "Boligrafos", "/img/boligrafo.jpg"))
productsArray.push(new Product("Llavero", "2", "Llaveros", "/img/llavero.png"))
productsArray.push(new Product("Botella plastica", "10", "Botellas", "/img/botellaPlastica.png"))


for (product of productsArray){
    createProductCard(product)
}


