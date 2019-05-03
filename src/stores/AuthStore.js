import { observable, action, computed,toJS } from "mobx";
import authService from '../services/AuthService';

export default class AuthStore{

    @observable
    token;
    @observable
    currentUser;

    @action
    login = async (email,password)=>{
  

       const user = await authService.login(email,password);
       console.log('user from response:',user);
       if(user){
           this.setCurrentUser(user);
           return true;
       }else{
           return false;
       }
    }

    @action
    register = async(user)=>{
        const res = await authService.register(user);

        if(res){
            this.setCurrentUser(res.data.data);
            return true;
        }else{
            return false;
        }
    }
 
    @action
    setCurrentUser = (user)=>{
        this.currentUser=user;
        }
    @computed
    get getCurrentUser(){
        return toJS(this.currentUser)||{};
    }

    
}