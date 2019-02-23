import {observable, action} from 'mobx';

export class ProductStore{


    @observable
    currentProduct;

    
    @observable
    allProducts = observable([]);



    constructor(){
        this.loadAllProducts();
    }

    @action
    get currentProduct(){
        return this.currentProduct;
    }

    @action 
    set currentProduct(product){
        this.currentProduct = product
    }

    //TODO: service that load all the products 
    @action
    loadAllProducts(){

        return ProductService.getAllProducts()
        .then(products =>{
            this.allProducts.replace(products)
        })
        .catch(err =>{
            if(this.currentProduct){
                console.log(`Error while loading products. currentProductID: ${this.currentProduct._id}`,err);
            }
            return false;
        })

    }
    

}