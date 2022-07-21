// Se ingresa categoria y se retorna 1, 2, 3 o 4 
function categorys(){
    let category;
    category = parseInt(prompt("Ingrese una categoria" + "\n" +" 1- vasos"+ "\n" +" 2- remeras"+ "\n" +" 3- gorras" + "\n" + "4- Si desea salir del simulador"))
    while (category != 1 && category != 2 && category != 3 && category != 4){
        category = prompt("No ha ingresado correctamente ingrese categoria o 4 si desea salir del simulador:" + "\n" +" 1- vasos"+ "\n" +" 2- remeras"+ "\n" +" 3- gorras" + "\n" + " 4- Si desea salir")
    }
    return category
}

// Funcion que recibe de parametros la categoria ingresada, la opcion 1 de producto, la opcion 2 de del producto y sus precios respectivos. La funcion retorna la funcion showCost() o menu() en caso de que haya elegido opcion 3
function categoryToEnter(type, option1, option2, option1cost, option2cost){
    let object;
    let cost;
    let amount; 
    object = prompt("Ingrese "+ type +" que desea comprar" + "\n" +" 1- "+option1+ "  $"+ option1cost+ "\n" +" 2- "+option2 +"  $"+ option2cost+ "\n" + "3- volver a categorias")
    while(object != "1" && object != "2" && object != "3"){
        object = prompt("No ha ingresado correctamente, Ingrese "+ type +" que desea comprar" + "\n" +" 1- "+option1+"  $"+ option1cost+ "\n" +" 2- "+option2 +"  $"+ option2cost+ "\n" + "3- volver a categorias")
    }
    if (object == "1" || object == "2" ){
       amount = quantity()
        if (object == "1"){
            cost = amount * option1cost
        }else if (object == "2"){
            cost = amount * option2cost
        }
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
function menu(){
    let category = categorys()
    while (category != 4){
        let type
        let option1
        let option1cost
        let option2
        let option2cost
        if (category == 1){
            type = "vaso"
            option1 = "vaso termico"
            option1cost = 10
            option2 = "vaso plastico"
            option2cost = 5
        } else if (category == 2){
            type = "remera"
            option1 = "remera estampada"
            option1cost = 20
            option2 = "remera basica"
            option2cost = 10
        }else if (category == 3){
            type = "gorra"
            option1 = "gorra estampada"
            option1cost = 15
            option2 = "gorra basica"
            option2cost = 8
        }
        categoryToEnter(type, option1, option2, option1cost, option2cost)
        category = categorys()
    }
   
    
}

menu()