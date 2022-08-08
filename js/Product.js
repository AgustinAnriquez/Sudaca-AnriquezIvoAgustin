class Product{
    constructor(name, cost, category, image){
        this.name = name.toLowerCase();
        this.cost = parseFloat(cost);
        this.category = category;
        this.image = image
    }
    iva(){
        this.cost = this.cost * 1.21
    }
}