class Product{
    constructor(name, cost, category){
        this.name = name.toLowerCase();
        this.cost = parseFloat(cost);
        this.category = category
    }
    iva(){
        this.cost = this.cost * 1.21
    }
}