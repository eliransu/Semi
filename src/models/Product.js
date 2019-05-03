import { observable } from 'mobx';


export default class Product {

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
            this.title = product.title ;
            this.description = product.description;
            this.category = product.category;
            this.subCategory = product.subCategory;
            this.quality = product.quality;
            this.retailPrice = product.retailPrice;
            this.retailPriceCoin = product.retailPriceCoin;
            this.timePeriods = product.timePeriods ? product.timePeriods : [];
            this.pricings = product.pricings ? product.pricings: [];
            this.coins = product.coins ? product.coins: [];
            this.Photos = product.Photos ? product.Photos : [];

        }
    }
}

