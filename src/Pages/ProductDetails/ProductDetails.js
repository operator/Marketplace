import React, { Component } from 'react'
import Header from '../../Components/Header/Header'
import ProductDetailsView from '../../Components/ProductDetailsView/ProductDetailsView'
import APIProvider from '../../Contexts/APIContext';
import API from '../../services/api';
import queryString from 'query-string';

function getQueryString(_url) {
    const url = new URL(_url);
    return queryString.parse(url.search) || {};
}

class ProductDetails extends Component {
    constructor(props) {
        super(props);

        sessionStorage.removeItem('productID');
        var productDetails = {}
        const queryStrings = getQueryString(window.location.href);
        
        if(sessionStorage.productDetails === undefined) {
            sessionStorage.productID = queryStrings.product;
        } else {
            productDetails = JSON.parse(sessionStorage.productDetails);
        }

        this.state = {
            product:{
                checkoutLink: productDetails.checkoutLink,
                currencycode: productDetails.currencycode,
                description: productDetails.description,
                id: productDetails.id,
                images:productDetails.images,
                maxPrice: productDetails.maxPrice,
                merchant: productDetails.merchant,
                minPrice: productDetails.minPrice,
                productID: productDetails.productID,
                quantity: productDetails.quantity,
                title: productDetails.title,
                vendor: productDetails.vendor
            },
            products: [],
            productsLoading: true,
            productLoading: true,
            productFilters: productDetails.title,
            test:{}
        }

    }

     getProducts = async (filters = {}) => {
        const { data } = await API.get('/api/products', {
            price_max: 10000000000,
            ...filters
        });
        this.setState({
            products: data.value,
            productsLoading: false
        })
    }

    getProduct = async (productID) => {
        API.get('/api/product', {
            productID,
        }).then((response) => {
            const productData = response.data.value;
            this.setState({
                product: productData,
                productLoading: false
            });
            this.getProducts(productData.title);
        });
    }
 
    componentDidMount() {

        if(sessionStorage.productID !== undefined){
            this.getProduct(sessionStorage.productID)
        } else {
            this.setState({
                productLoading: false
            });
            this.getProducts(this.state.productFilters);
        }
    }

    render() {
        return (
            <div className="main">
                <APIProvider.Provider value={{
                    products: this.state.products,
                    product: this.state.product,
                    loadingProducts: this.state.productsLoading,
                    loadingProduct: this.state.productLoading,
                    getProducts: this.getProducts,
                }} >
                    <Header />
                    <ProductDetailsView />
                </APIProvider.Provider>
            </div>
        );
    }
}

export default ProductDetails
