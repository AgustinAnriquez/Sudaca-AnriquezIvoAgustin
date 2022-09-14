class Product{
    constructor(data){
        this.id = data.id
        this.name = data.name;
        this.cost = parseFloat(data.cost);
        this.id_category = data.id_category;
        this.id_subCategory = data.id_subCategory;
        this.image = data.image
        this.quantity = data.quantity
        this.featured = data.featured
    }  
}
