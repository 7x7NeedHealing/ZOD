    
<template>
    <div id="bigData" class="main">
    </div>
</template>
    
<script setup lang="ts">
import { getCurrentInstance, reactive, ref } from 'vue';
import axios from 'axios';
import * as echarts from 'echarts';
import { onMounted } from 'vue';
import { useMain } from '../../store/home';
let state = useMain()
onMounted(() => {

    var chartDom = document.getElementById('bigData');
    var myChart = echarts.init(chartDom as HTMLElement, undefined, {
        renderer: 'svg'
    });
    var option: echarts.EChartsOption;

    // Generate data
    let category = [];
    let dottedBase = +new Date();
    let lineData: Array<number> = reactive([]);
    for (let i = 0; i < 7; i++) {

        // 当前日期开始，往前倒六天，共七天
        let date = new Date((dottedBase - i * (1000 * 60 * 60 * 24)));

        // 从数组头开始添加，第一个数据是今天
        axios.get(state.http+'/checkTodoTodayDone?fromId=' + `${state.account}` + '&releaseTime=' + `${[date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')}`)
            .then(function (response) {
                lineData.unshift(response.data[0].count)
                if (i == 6) {
                    myChart.clear();
                    option && myChart.setOption(option);
                }

            })
            .catch(function (error) {
                console.log(error);
            });
        // 从数组头开始添加，第一个数据是今天
        category.unshift([date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-'));

    }

    // option
    option = {
        backgroundColor: '#fff',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
                // cap : 'round'
            }
        },
        title: {
            left: '3%',
            top: '30%',
            text: '近\n七\n日\n待\n办\n完\n成\n量',

        },
        xAxis: {
            data: category
        },
        yAxis: {
            splitLine: { show: false },
            // y轴数值以整数出现
            minInterval: 1
        },
        series: [
            {
                type: 'line',
                smooth: true,
                showAllSymbol: true,
                symbol: 'emptyCircle',
                symbolSize: 12,
                data: lineData,
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(130,170,255)'
                        },
                        {
                            offset: 1,
                            color: '#fff'
                        }
                    ])
                }
            }
        ]
    };

    // option && myChart.setOption(option);

})


</script>
    
<style scoped lang="scss">
.main {
    width: 1350px;
    height: 500px;
    background-color: white;
    border-radius: 8px;
}
</style>
