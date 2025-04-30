<template>
    <div v-auto-animate>
        <div  v-if="fruits.length > 0" class="px-[60px] py-[40px] flex gap-[40px] flex-wrap">
            <tovar @closeKgModal="closeKgModal" @addToCart="addToCart" v-for="fruit in fruits" :key="fruit.id" :fruit="fruit"></tovar>
        </div>
        <div v-else class="h-[90vh] flex flex-col items-center justify-center ">
            <div>
                <img class="object-cover" src="../assets/image 9.png" alt="">
            </div>
        </div>
    </div>
</template>

<script setup>
import tovar from './tovar.vue';

defineProps({
    fruits: Array,
    addToCart: Function,
    closeKgModal: Function
})


</script>

<style lang="scss" scoped></style>