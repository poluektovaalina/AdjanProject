<template>
    <div class="bg-white rounded-[20px]">
        <Header :toggleCart="toggleCart"/>
        <Slider />
        <search :onChange="onChange" />
        <Fruits :fruits="fruits" />
        <div v-if="isOpenCart" ></div>
        <div v-if="isOpenCart" class="w-full h-full opacity-[70%] bg-black fixed left-0 top-0 z-1"></div>
        <Cart  v-if="toggleCart" :toggleCart="toggleCart" :isOpenCart="isOpenCart"/>
    </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Slider from '../components/Slider.vue/'
import Fruits from '../components/Fruits.vue/'
import search from '../components/Search.vue'
import Cart from '../components/Cart.vue'


import Data from '../Data/fruits.json'
import CardData from '../Data/card.json'


import { ref } from 'vue'

const fruits = ref(Data)
const searchText = ref('')

let isOpenCart = ref(false)

function toggleCart() {
    isOpenCart.value = !isOpenCart.value

}




function onChange() {
    const input = document.querySelector('input').value
    searchText.value = document.querySelector('input').value
    fruits.value = Data.filter(fruit => fruit.title.toLowerCase().includes(searchText.value.trim().toLowerCase()))
}


</script>

