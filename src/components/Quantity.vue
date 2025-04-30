<template>
    <div class="flex justify-center items-center fixed top-0 left-0 h-full w-full opacity-[70%] bg-black z-2">
    </div>
    <div class="flex justify-center items-center fixed top-0 left-0 h-full w-full z-2">
        <div class="bg-white w-max h-max p-[15px] rounded-[15px] flex flex-col gap-[20px] items-center">
            <div class="flex justify-between items-center gap-[50px]">
                <h2 class=" font-bold font-sans ">Выберите количество:</h2>
                <div @click="closeKgModal">
                    <img src="../assets/closed.svg" alt="">
                </div>
            </div>
            <div class="flex items-center justify-arounded ">
                <button @click="() => decrement(staticPrice)"  class="bg-[#1cdf1c] min-h-[35px] min-w-[35px] text-white font-semibold flex items-center justify-center text-[22px] cursor-pointer rounded-full">-</button>
                <input @input="changeValue" class="mx-[20px] border-2 border-[#1cdf1c] rounded-[20px] p-[4px] text-black max-w-[162px] outline-none cursor-pointer"   type="input" :value="kgModal">
                <button @click="() => increment(staticPrice)"  class="bg-[#1cdf1c] min-h-[35px] min-w-[35px] text-white font-semibold flex items-center justify-center text-[22px] cursor-pointer rounded-full">+</button>
            </div>
            <div>
                {{ priceQuant }} тг
            </div>
            <button @click="() => addToCart(correctFruit)" class="bg-[#1cdf1c] text-white font-bold font-sans p-[10px] rounded-[15px]">Добавить</button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    kgModal: Number,
    increment: Function,
    decrement: Function,
    addToCart: Function,
    priceQuant: Number,
    staticPrice: Number,
    correctFruit: Object,

})

</script>

<style lang="scss" scoped>

</style>