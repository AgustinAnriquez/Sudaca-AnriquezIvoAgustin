class Product{
    constructor(data){
        this.id = data.id
        this.name = data.name.toLowerCase();
        this.cost = parseFloat(data.cost);
        this.category = data.category;
        this.image = data.image
        this.quantity = data.quantity
        this.featured = data.featured
    }  
}
