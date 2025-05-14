<template>
    <div class="bg-white rounded-[20px]">
        <Slider />
        <Search :onChange="onChange" />
        <Fruits :fruits="fruits"  :addToCart="addToCart" :closeKgModal="closeKgModal" :addLike="addLike"/>
        <div v-if="isOpenCart" ></div>
        <div v-if="isOpenCart" class="w-full h-full opacity-[70%] bg-black fixed left-0 top-0 z-1"></div>
        <Cart  v-if="toggleCart" :toggleCart="toggleCart" :isOpenCart="isOpenCart" :cartItems="cartItems" :removeItemCart="removeItemCart"/>
    </div>
    <Quantity v-if="isOpenQKG" 
    :kgModal 
    :increment="increment" 
    :decrement="decrement" 
    :addToCart="addToCart" 
    :priceQuant="priceQuant" 
    :staticPrice="staticPrice" 
    :correctFruit="correctFruit"
    :closeKgModal="closeKgModal"
    :changeValue="changeValue"
    />
</template>

<script setup>
import Quantity from '../components/Quantity.vue'
import Slider from '../components/Slider.vue'
import Fruits from '../components/Fruits.vue'
import Search from '../components/Search.vue'
import Cart from '../components/Cart.vue'

import Data from '../Data/fruits.json'


import { onMounted, ref } from 'vue'

const fruits = ref(Data)
const searchText = ref('')
const cartItems = ref([])
const kgModal = ref(0)
const isOpenQKG = ref(false)
const staticPrice = ref(0)
const priceQuant = ref(0)


const correctFruit = ref({})


defineProps({
    isOpenCart: Boolean,
    toggleCart: Function
})


function changeValue(e) {
    kgModal.value = e.target.value
    priceQuant.value = e.target.value * staticPrice.value
}

function closeKgModal(fruit) {
    if (fruit.isAdded) {
        addToCart(fruit);
        return;
    }
    kgModal.value = 1
    priceQuant.value = fruit.price
    staticPrice.value = fruit.price
    isOpenQKG.value = !isOpenQKG.value 
    priceQuant.value = fruit.price
    correctFruit.value = {...fruit, price:priceQuant.value}
   
}

// function calculator()


function increment (val) {
    priceQuant.value = val
    kgModal.value++
    priceQuant.value = Number(priceQuant.value) * Number(kgModal.value)
    // console.log(cartItems.price)
    // fruitCart.value * kgModal.value === priceQuant
}
function decrement (val) {
    priceQuant.value = val
    kgModal.value--
    priceQuant.value = Number(priceQuant.value) * Number(kgModal.value)
}


//   Добавление в корзину и + картинку меняет
function renderFruits() {
    const CartItemFromLocalStorage = JSON.parse(localStorage.getItem('cart'))
    cartItems.value = CartItemFromLocalStorage || []
    if(CartItemFromLocalStorage){
        fruits.value = fruits.value.map(item => {
                const findFruit = cartItems.value.find(fruitFromCart => fruitFromCart.id === item.id)
                if(findFruit){
                    return{
                        ...item,
                        isAdded: true,
                        
                    }
                }
                else{
                    return{
                        ...item,
                        isAdded: false,
                        isLiked: false  
                    }
                } 
            })
        

    }
    else{
        fruits.value = fruits.value.map(item => {
            return{
                ...item,
                isAdded: false  
            }
        })
    }

}



const isAddLike = ref([])

function renderLike() {
    const likesLS = JSON.parse(localStorage.getItem('like')) || [];
    isAddLike.value = likesLS;
    fruits.value = fruits.value.map(item => {
        const isLiked = likesLS.find(items => items.id === item.id);
        return { ...item, isLiked };
    });
}

function addLike(fruit) {
    const Likes = isAddLike.value.filter(item => item.id !== fruit.id);
    if (Likes.length === isAddLike.value.length) {
        isAddLike.value.push({ ...fruit, isLiked: true });
    } else {
        isAddLike.value = Likes;
    }
    fruits.value = fruits.value.map(item => ({
        ...item,
        isLiked: isAddLike.value.find(liked => liked.id === item.id)
    }));
    localStorage.setItem('like', JSON.stringify(isAddLike.value));
}

function addToCart(fruitCart) {
    isOpenQKG.value = !isOpenQKG.value 
    const isFoundFruit = cartItems.value.find(item => item.id === fruitCart.id)
    
    if(!isFoundFruit){
        fruitCart.price = priceQuant.value
        cartItems.value.push(fruitCart)
        localStorage.setItem('cart', JSON.stringify(cartItems.value))
    }else{
        cartItems.value = cartItems.value.filter(item => item.id != fruitCart.id)
        localStorage.setItem('cart', JSON.stringify(cartItems.value))
    }
    
    fruits.value = fruits.value.map(item => {
        const findFruit = cartItems.value.find(fruitFromCart => fruitFromCart.id === item.id)
        if(findFruit){
            return{
                ...item,
                isAdded: true,
                
            }
        }
        else{
            return{
                ...item,
                isAdded: false  
            }
        } 
    })
    
    console.log(cartItems)
    console.log(fruits.value)
    
}


onMounted(() => {
    renderFruits()
    renderLike()
})

function removeItemCart(id) {
    cartItems.value = cartItems.value.filter(item => item.id != id)
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
    renderFruits()
}



function onChange() {
    const input = document.querySelector('input').value
    searchText.value = document.querySelector('input').value
    fruits.value = Data.filter(fruit => fruit.title.toLowerCase().includes(searchText.value.trim().toLowerCase()))
}


</script>

