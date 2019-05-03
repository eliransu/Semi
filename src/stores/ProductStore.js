import { action, computed, observable, toJS } from 'mobx';
import ProductService from '../services/ProductService';
import Product from '../models/Product';
import productService from '../services/ProductService';
import AuthStore from './AuthStore';
import rootStores from './index';
import moment from 'moment';


export default class ProductStore{


    @observable
    currentProduct;

    @observable
    periods = [];

   
    
    @observable
    allProducts = observable([]);



    constructor(){
        //this.loadAllProducts();
        this.currentProduct = {
            title: "Wilson Federer Tennis Racquet",
            img: ["blueRacket.jpg", "blueRacket2.jpg", "blueRacket3.jpg", "blueRacket4.jpg" ],
            reviews: [{
                     content: "very recommended racket i borrow a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently",
                     datetime:"2019-04-25",
                     numOfstart:5,
                     user:{name: "Sean Assis",
                           avatar: 'seanAvatar.png'}
                        },
                {
                    content: "average racket i borrow a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently",
                    datetime: "2019-04-23",
                    numOfstart: 3,
                    user: {
                        name: "Eliran Hasin",
                        avatar: 'hasinAvatar.png'
                    }
                }, 
                {
                    content: "good racket i borrow a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently",
                    datetime: "2019-04-22",
                    numOfstart: 4,
                    user: {
                        name: "Eliran Suisa",
                        avatar: 'suisaAvatar.png'
                    }
                } ,
                {
                    content: "bad racket i borrow a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently",
                    datetime: "2019-04-21",
                    numOfstart: 2,
                    user: {
                        name: "Alon Braymok",
                        avatar: 'alonAvatar.png'
                    }
                } ,
                {
                    content: "highly recommended racket i borrow a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently",
                    datetime: "2019-04-20",
                    numOfstart: 5,
                    user: {
                        name: "Tom Lochi",
                        avatar: 'lochiAvatar.png'
                    }
                } ,
                    ] ,
            periodAndPrices: [{key: 1, period: "One day", price: '10$'},
                              {key: 2, period: "Two days", price: '15$'},
                              {key: 3, period: "One week", price: '50$'},
                              {key: 4, period: "Two weeks", price: '70$'},
                              {key: 5, period: "One Month", price: '120$' }],
            description: `Power String bridge
                          Longer main strings for explosive power
                          Stop shock sleeves for improved comfort
                          Grip Size: 4 3/8`,
            owner: {
                    name: "Meron Brumberg",
                    avatar: 'meronAvatar.png'
                },
            category: "Sport",
            subCategory: "Sport equipmenet",
            quality: "Execllent",
            retailPrice: '400$',
            orders: [
                {  
                    consumer:{
                        name:"Sean assis",
                        avatar:"seanAvatar.png"
                    },
                    startDate: "2019-04-18",
                    endDate: "2019-04-25"},
                {
                    consumer: {
                        name: "Eliran Suisa",
                        avatar: "suisaAvatar.png"
                    },
                    startDate: "2019-05-01",
                    endDate: "2019-05-10"}]
        }
    }

    @action
    addPeriod = (period)=>{
        this.periods.push(period);
    }
    @action
    newProduct = () => {
        const product = new Product();
       
        this.currentProduct = product;
    };

    @computed
    get getCurrentProduct(){
        return this.currentProduct;
    }

    @action
    setCurrentProduct(product){
        this.currentProduct = product
    }

    @computed
    get getPeriods(){
        return toJS(this.periods)||[];
    }



    @action
    createProduct = (product,userName)=>{

        return ProductService.addProductToUser(userName,product,this.getPeriods)
    }
    //TODO: service that load all the products 
    // @action
    // loadAllProducts(){

    //     return ProductService.getAllProducts()
    //     .then(products =>{
    //         this.allProducts.replace(products)
    //     })
    //     .catch(err =>{
    //         if(this.currentProduct){
    //             console.log(`Error while loading products. currentProductID: ${this.currentProduct._id}`,err);
    //         }
    //         return false;
    //     })
    // }
    

}