// Crea string con menu de categorias
function printCategorys(categorysArray){
    let categorysList =""
    let i = 1
    while(i <= categorysArray.length){
        categorysList = categorysList + i + " " + categorysArray[i-1].name + "\n"
        i++
    }
    categorysList= categorysList + i + " Si desea salir"
    return categorysList
}

// crea string con menu de productos
function printProducts(productsArray){
    let productsList=""
    let i = 1
    while (i <= productsArray.length){
        productsList = productsList + i + " " + productsArray[i-1].name + " $"+ productsArray[i-1].cost + "\n"
        i++
    }
    productsList= productsList + i + " Si desea volver a categorias"
    return productsList
}

// Se ingresa categoria y se retorna 1, 2, 3 o 4 
function categorys(categorysArray){
    let category = parseInt(prompt("Ingrese una categoria" + "\n" + printCategorys(categorysArray)))
    while ((category > categorysArray.length +1) || (category <= 0) || (isNaN(category))){
        category = parseInt(prompt("No ha ingresado correctamente ingrese " +"\n" +  printCategorys(categorysArray)))
    }
    return category
}

// Funcion que recibe de parametros la categoria ingresada, la opcion 1 de producto, la opcion 2 de del producto y sus precios respectivos. La funcion retorna la funcion showCost() o menu() en caso de que haya elegido opcion 3
function categoryToEnter(productsOfCategorySelected){
    let cost;
    let amount; 
    let product = parseInt(prompt("Ingrese "+ productsOfCategorySelected[0].category +" que desea comprar" + "\n" +printProducts(productsOfCategorySelected)))
    while((product > productsOfCategorySelected.length +1) || (product <= 0) || (isNaN(product))){
        product = parseInt(prompt("No ha ingresado correctamente, Ingrese "+ productsOfCategorySelected[0].category +" que desea comprar" + "\n" +printProducts(productsOfCategorySelected)))
    }
    if (product < productsOfCategorySelected.length +1){
        console.log("entro al if")
        amount = quantity()
        cost = amount * productsOfCategorySelected[product-1].cost
        showCost(cost)
    }
}

// Funcion que solicita el ingreso de cantidad a comprar del producto
function quantity(){
    let amount
    amount = parseInt(prompt("Ingrese cantidad que desea comprar") )
    while (isNaN(amount)){
        amount = parseInt(prompt("No ha ingresado cantidad, por favor ingrese cantidad que desee comprar") )
    }
    return amount
    
}

// confirm() que permite aceptar compra o rechazar
function showCost(cost){
    buy = confirm("El precio de la compra es $"+ cost + " Desea comprar?")
    if (buy){
        alert("compra exitosa")
    }
}

// Menu principal
function menu(categorysArray, productsArray){
    let category = categorys(categorysArray)
    while (category != 4){
        let productsOfCategorySelected = []
        if (category == 1){
            for (product of productsArray){
                if (product.category == "Vasos"){
                    // se cargan todos los productos cuya categoria sea vasos
                    productsOfCategorySelected.push(product)
                }
            }
        } else if (category == 2){
            for (product of productsArray){
                if (product.category == "Remeras"){
                    // se cargan todos los productos cuya categoria sea remeras
                    productsOfCategorySelected.push(product)
                }
            }
        }else if (category == 3){
            for (product of productsArray){
                if (product.category == "Gorras"){
                    // se cargan todos los productos cuya categoria sea gorras
                    productsOfCategorySelected.push(product)
                }
            }
        }
        categoryToEnter(productsOfCategorySelected)
        category = categorys(categorysArray)
    }
   
    
}
// se carga categorias en arreglo
const categorysArray = []
categorysArray.push(new Category("Vasos"))
categorysArray.push(new Category("Remeras"))
categorysArray.push(new Category("Gorras"))

// se carga productos en arreglo
const productsArray = []
productsArray.push(new Product("Vaso termico", "10", "Vasos"))
productsArray.push(new Product("Vaso plastico", "8", "Vasos"))
productsArray.push(new Product("Remera basica", "15", "Remeras"))
productsArray.push(new Product("Remera estampada", "20", "Remeras"))
productsArray.push(new Product("Gorra basica", "8", "Gorras"))
productsArray.push(new Product("Gorra estampada", "12", "Gorras"))

menu(categorysArray, productsArray)