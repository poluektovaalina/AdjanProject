<template>
    <div class="px-[60px] py-[40px] flex gap-[40px] flex-wrap">
        <tovar v-for="fruit in fruits" :key="fruit.id" :fruit="fruit"></tovar>
    </div>
</template>

<script setup>
import tovar from './tovar.vue';

defineProps({
    fruits: Array
})


</script>

<style lang="scss" scoped></style>