import axios from 'axios';
class ProductService {


    addProductToUser = (username, product) => {
        console.log(`add new product to the user ${username}`, product);
        const url = `/api/add-product-as-renter/${username}`;
        const body = {
            username,
            name: product.title,
            image: 'drill.jpg',
            category: product.category,
            price: product.retailPrice,
            description: product.description

        }
        console.log('body', body);

        return axios.post('/api/users/product', { ...body })
            .then(response => {
                console.log('Adding Product:', response);
            }).catch(err => {
                console.error('Failed to add product', err);
                throw err;
            })
    }
}

const productService = new ProductService();
export default productService;