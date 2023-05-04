    
<template>
    <div class="logoCantainer">
        <div class="logo" id="logo" @click="showLogo()">
        </div>
    </div>
</template>
    
<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted } from 'vue';
let showLogo = () => {

}

onMounted(() => {
    type EChartsOption = echarts.EChartsOption;
    var chartDom = document.getElementById('logo')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
        graphic: {
            elements: [
                {
                    type: 'text',
                    left: 'center',
                    top: 'center',
                    style: {
                        text: '    ZoneOf\nDoing&Blog',
                        fontSize: 28,
                        fontWeight: 'bold',
                        lineDash: [0, 200],
                        lineDashOffset: 0,
                        fill: 'transparent',
                        stroke: '#000',
                        lineWidth: 1
                    },
                    keyframeAnimation: {
                        duration: 4000,
                        // 是否循环
                        loop: false,
                        keyframes: [
                            {
                                percent: 0.7,
                                style: {
                                    fill: 'transparent',
                                    lineDashOffset: 200,
                                    lineDash: [200, 0]
                                }
                            },
                            {
                                // Stop for a while.
                                percent: 0.8,
                                style: {
                                    fill: 'transparent'
                                }
                            },
                            {
                                percent: 1,
                                style: {
                                    fill: 'black'
                                }
                            }
                        ]
                    }
                }
            ]
        }
    };

    option && myChart.setOption(option);
    const showLogoAgain = () => {
        console.log('Show Logo Again');
        myChart.clear();
        option && myChart.setOption(option);
    }
    showLogo = showLogoAgain;
})
</script>
    
<style scoped lang="scss">
.logoCantainer {
    width: 260px;
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .logo {
        width: 220px;
        height: 140px;
        margin: 0 auto;
    }
}
</style>
