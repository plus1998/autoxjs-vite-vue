<script lang="ts" setup>
import { showNotify } from 'vant';
import { ref } from 'vue';

const tabs = [
  {
    name: 'search',
    title: '发现',
    icon: 'search',
  },
  {
    name: 'home',
    title: '主页',
    icon: 'home-o',
  },
  {
    name: 'mine',
    title: '我的',
    icon: 'user-o',
  },
];
const active = ref(tabs[2].name);

// 屏幕高度
const screenHeight = document.documentElement.clientHeight;
const offset = ref({ y: screenHeight - 150, x: -1 });

const onClickBubble = () => {
  // autox 震动
  $autox.callHandler('DeviceVibrate', '', (data: string) => {
    // 接收参数
    showNotify({
      type: 'primary',
      message: '设备震动 ' + data,
      duration: 1000,
    })
  })
};

</script>

<template>
  <div>
    <RouterView />
    <van-tabbar v-model="active" route>
      <van-tabbar-item v-for="tab in tabs" :name="tab.name" :key="tab.name" :icon="tab.icon" :to="'/' + tab.name">{{
      tab.title
    }}</van-tabbar-item>
    </van-tabbar>
    <van-floating-bubble v-model:offset="offset" icon="chat" @click="onClickBubble" />
  </div>
</template>