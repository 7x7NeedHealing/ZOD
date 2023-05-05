<template>
    <!-- <div class="container"> -->
        <!-- <span class="title">现在时间</span> -->
        <div class="clock">
            {{ time }}
        </div>
    <!-- </div> -->
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const time = ref(new Date().toLocaleTimeString())

        setInterval(() => {
            time.value = new Date().toLocaleTimeString()
        }, 1000)

        return {
            time,
        }
    },
})
</script>
  
<style scoped lang="scss">
// .container{
//     width: 260px;
//     height: 50px;
//     display: flex;
//     justify-content: center;
//     flex-direction: column;
//     .title{
//         display:block;
//         text-align: center;
//         font-size: 36px;
//         line-height: 36px;
//         margin-bottom: 20px;
//     }
//     .clock {
//     text-align: center;
//     font-size: 44px;
//     line-height: 44px;
//     // margin-top: 126px;
// }
// }
.clock {
    text-align: center;
    font-size: 24px;
    line-height: 50px;
    // margin-top: 126px;
}
</style>