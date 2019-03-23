Semi - Share Economy Application

## Backend endpoints:

#### Connect to Semi:

purpose | endpoint  | mandatory variables | optional variables | HTTP method
------------- | ------------- | ------------- | ------------- | -------------
login | /api/login  | username, password | - | POST
register | /api/register  | firstname, lastname, username, email, password | phoneNumber | POST

#### Users:

purpose | endpoint  | mandatory variables | optional variables | HTTP method
------------- | ------------- | ------------- | ------------- | -------------
get user's products | /api/users/products/:username  | username(params) | - | GET
add product to user | /api/users/product  | userId, image, category, name | - | POST
update user's product | /api/users/product | userId, productId | name, image, category | POST

#### Products:

purpose | endpoint  | mandatory variables | optional variables | HTTP method
------------- | ------------- | ------------- | ------------- | -------------
get products by category | /api/products/by-category/:category  | category(params) | - | GET
get products by name | /api/products/:name  | name(params) | - | GET
add product(generaly) | /api/products | name, image, category | - | POST
update product(generaly) | /api/products/:id | id(params) | name, image, category | - | PUT
delete product | /api/products/:id | id | - | DELETE
