import { observable } from 'mobx';


export class Product {

    @observable
    _id;

    @observable
    title;

    //some invoked enum
    @observable
    category;

    //for every category there is the specified sub-category's
    @observable
    subCategory;

    //array of urls
    @observable
    Photos;

    //timePeriod will be an array of string's/ enums
    //for timePeriod[i] -> pricing[i] -> coins[i]
    @observable
    timePeriods;

    //array of number's
    @observable
    pricings;

    //enum- NIS, Dollar, BTC, ETH
    @observable
    coins;

    @observable
    description;

    //enum - excellent, good, normal 
    @observable
    quality;

    @observable
    retailPrice;

    @observable
    retailPriceCoin;


    constructor(product) {
        if (product) {
            this._id = product._id;
            this.title = product.title;
            this.notes = product.category;
            this.email = product.subCategory;
            this.identity = product.Photos;
            this.phone = product.timePeriods;
            this.phone = product.pricings;
            this.phone = product.coins;
            this.phone = product.description;
            this.phone = product.quality;
            this.phone = product.retailPrice;
            this.phone = product.retailPriceCoin;

        }
    }
}

