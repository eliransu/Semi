import axios from 'axios'
class CategoryService{


    getCategoryById = async (categoryId)=>{
    // return   axios.get(`/api/products/by-category/${categoryId}`)
    //    .then(res=>{
    //        if(res&&res.data&res.data.data){
    //            return res.data.data;
    //        }
    //    })
    console.log('im Here')
    const products = await axios.get(`/api/products/by-category/${categoryId}`)
    console.log({products})
        console.log(products.data.data)
    if(!products|| !products.data||!products.data.data) return [];
    else return products.data.data;
      
    }

}

export default new CategoryService();