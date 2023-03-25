import { mount as productsMount } from  'products/ProductIndex';
import { mount as cartMount } from 'cart/CartShow';

productsMount(document.getElementById('my-products'));
cartMount(document.getElementById('my-cart'));

console.log('Container !');