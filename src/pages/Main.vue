<template>
    <div class="bg-white rounded-[20px] h-screen">
        <Header />
        <Slider />
        <search :onChange="onChange" />
        <Fruits :fruits="fruits" />
        <Cart v-if="condition" @click="condition = false"/>
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
const card = ref(CardData)
const searchText = ref('')

// let condition = ref('false')
// document.querySelector('.icon').addEventListener('click', () => {
//     condition = ref('true')
// })

function onChange() {
    const input = document.querySelector('input').value
    searchText.value = document.querySelector('input').value
    fruits.value = Data.filter(fruit => fruit.title.toLowerCase().includes(searchText.value.trim().toLowerCase()))
}


</script>

