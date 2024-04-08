<script setup lang="ts">
const images = [
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
];
</script>

<template>
    <div>
        <van-nav-bar title="主页" />
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in images" :key="image">
                <img :src="image" width="100%" />
            </van-swipe-item>
        </van-swipe>
        <van-grid :column-num="3">
            <van-grid-item v-for="value in 6" :key="value" icon="photo-o" text="文字" />
        </van-grid>
    </div>
</template>