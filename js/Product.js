class Product{
    constructor(id, name, cost, category, image){
        this.id = id
        this.name = name.toLowerCase();
        this.cost = parseFloat(cost);
        this.category = category;
        this.image = image
        this.quantity = 1
    }
    iva(){
        this.cost = this.cost * 1.21
    }
}