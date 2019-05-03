import { observable, computed, toJS,action } from "mobx";
import CategoryService from '../services/CategoryService'

export default class CategoryStore{

    @observable
    allCategoires =observable([]);

    @observable
    currentCategory;

    @observable 
    currentCategoryId;

    @action
    setCategoryId =(id)=>{
        this.categoryId = id;
    }
    @action
    setCurrentCategory =(category)=>{
        this.currentCategory = category;
    }
    
    @action 
    getCategoryById =async (categoryId)=>{
           const result  = await CategoryService.getCategoryById(categoryId)
           this.setCurrentCategory(result)
           if(this.getCurrentCategory[0]){
               return true;
           }else return false;

             
    }

    @computed 
    get getCurrentCategoryId(){
        return this.categoryId||'default';
    }
    
        @computed
        get getCurrentCategory(){
            return toJS(this.currentCategory)||[];
        }
    
        @computed
        get getAllCategories(){
            return toJS(this.allCategoires);
        }
    
}