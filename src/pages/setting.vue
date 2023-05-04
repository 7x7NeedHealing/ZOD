<!--     
<template>
   <div>
    setting
   </div>
</template>
    
<script setup lang="ts">
    
</script>
    
<style scoped lang="scss">
    div{
        font-size: 24px;
    }
</style> -->
<template>
    <div class="clock">
        {{ time }}
    </div>
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
  
<style scoped>
.clock {
    font-size: 2rem;
}
</style>