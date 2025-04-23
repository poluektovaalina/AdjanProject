<template>
    <div class="bg-white rounded-[20px]">
        <Header :toggleCart="toggleCart"/>
        <Slider />
        <search :onChange="onChange" />
        <Fruits :fruits="fruits"  :addToCart="addToCart"/>
        <div v-if="isOpenCart" ></div>
        <div v-if="isOpenCart" class="w-full h-full opacity-[70%] bg-black fixed left-0 top-0 z-1"></div>
        <Cart  v-if="toggleCart" :toggleCart="toggleCart" :isOpenCart="isOpenCart" :cartItems="cartItems" :removeItemCart="removeItemCart"/>
    </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Slider from '../components/Slider.vue/'
import Fruits from '../components/Fruits.vue/'
import search from '../components/Search.vue'
import Cart from '../components/Cart.vue'


import Data from '../Data/fruits.json'


import { onMounted, ref } from 'vue'

const fruits = ref(Data)
const searchText = ref('')
const cartItems = ref([])
const

let isOpenCart = ref(false)

function toggleCart() {
    isOpenCart.value = !isOpenCart.value

}

// fruits.value = fruits.value.map(item => ({
//     ...item,
//     isAdded: false
// }))

function addToCart(fruitCart) {
    const CartItemFromLocalStorage = JSON.parse(localStorage.getItem('cart'))
    cartItems.value = CartItemFromLocalStorage || []
    
    if(fruitCart){
        
        cartItems.value.push(fruitCart)
        localStorage.setItem('cart', JSON.stringify(cartItems.value))
        
    }
    // if (cartItems.value.length > 0) {
    //     cartItems.value = cartItems.value.map(item => ({
    //         ...item,
    //         isAdded: false
    //     }))
    // }
}

onMounted(() => {
    addToCart()
})

function removeItemCart(id) {
    cartItems.value = cartItems.value.filter(item => item.id != id)
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
}



function onChange() {
    const input = document.querySelector('input').value
    searchText.value = document.querySelector('input').value
    fruits.value = Data.filter(fruit => fruit.title.toLowerCase().includes(searchText.value.trim().toLowerCase()))
}


</script>

