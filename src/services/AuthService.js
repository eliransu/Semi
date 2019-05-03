import axios from 'axios';


 class AuthService{

     login = async (email,password)=>{
         const body = {
             email,
             password
         }
        const result = await axios.post('api/auth/login',body)
        return result.data.data
     }

     register = async(user)=>{
         const result = await axios.post('/api/auth/register', user)
         if(result){
             console.log(result);
             return result;
         }
     }

}
export default new AuthService();