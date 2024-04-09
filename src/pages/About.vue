<script setup lang="ts">
import { ref, reactive } from 'vue';

const deviceInfo = reactive({
    brand: '',
    model: '',
});

const battery = ref('');

// 调用autox.js
$autox.callHandler('GetDeviceBrand', '', (data) => {
    deviceInfo.brand = data;
})
$autox.callHandler('GetDeviceModel', '', (data) => {
    deviceInfo.model = data;
})
$autox.callHandler('GetDeviceBattery', '', (data) => {
    battery.value = data;
})
</script>

<template>
    <div>
        <van-nav-bar title="个人中心" />
        <div style="margin: 5rem auto; text-align: center;">
            <van-image round width="8rem" height="8rem" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
        </div>
        <van-cell-group inset>
            <van-cell title="品牌" :value="deviceInfo.brand" :label="deviceInfo.model" />
            <van-cell title="电量" :value="battery + '%'" />
        </van-cell-group>
    </div>
</template>