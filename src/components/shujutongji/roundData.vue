    
<template>
    <div class="can">
        <div class="main" id="roundData">

        </div>
        <div class="info">
            <span class="done">今日已完成 <span style="color: rgb(254,74,98);">{{ doneNumberX }}</span> 条</span>
            <span class="noDone">今日未完成 <span style="color: rgb(84,112,198);">{{ noDoneNumberX }}</span> 条</span>
            <span class="noDone">今日共发布 <span style="color: rgb(255,127,80);">{{ todayAllTodoNumberX }}</span> 条</span>

        </div>
    </div>
</template>
    
<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios';
import { useMain } from '../../store/home';
let state = useMain()
let doneNumberX: Ref<number> = ref(0);
let noDoneNumberX: Ref<number> = ref(0);
let todayAllTodoNumberX: Ref<number> = ref(0);
onMounted(() => {

    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById('roundData')!;
    var myChart = echarts.init(chartDom, undefined, {
        renderer: 'svg'
    });
    // var myChart;
    var option: EChartsOption;
    let date = new Date()
    let doneNumber: Ref<number> = ref(0);
    let noDoneNumber: Ref<number> = ref(0);
    let todayAllTodoNumber: Ref<number> = ref(0);
    axios.get(state.http+'/checkTodoSomeday?fromId=' + `${state.account}` + '&releaseTime=' + `${[date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')}`)
        .then(function (response) {
            todayAllTodoNumberX.value = todayAllTodoNumber.value = response.data[0].count
            // myChart.clear();
            // option && myChart.setOption(option);
            axios.get(state.http+'/checkTodoTodayDone?fromId=' + `${state.account}` + '&releaseTime=' + `${[date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')}`)
                .then(function (response) {
                    doneNumberX.value = doneNumber.value = response.data[0].count;
                    noDoneNumberX.value = noDoneNumber.value = todayAllTodoNumber.value - doneNumber.value;
                    // console.log(doneNumber.value, noDoneNumber.value);
                    option = {
                        title: [
                            {
                                text: '今日待办情况',
                                left: '30.2%',
                                top: '37%',
                                textStyle: {
                                    fontSize: 22
                                }
                            }
                        ],
                        polar: {
                            radius: ['55%', '70%']
                        },
                        angleAxis: {
                            max: todayAllTodoNumber.value,
                            startAngle: 90,
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            },
                            axisLabel: {
                                show: false
                            }
                        },
                        radiusAxis: {
                            type: 'category',
                            data: ['完成', '未完成'],
                            minInterval: 1,
                            splitNumber: 0,
                            axisLine: {
                                show: false
                            },
                            axisLabel: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            }
                        },
                        tooltip: {},
                        series: {
                            type: 'bar',
                            data: [{ value: doneNumber.value, itemStyle: { color: 'rgb(254,74,98)' } },
                            { value: noDoneNumber.value }],
                            coordinateSystem: 'polar',
                            // 圆弧效果
                            roundCap: true,
                            // 条形背景是否存在
                            showBackground: true
                        }
                    };
                    option && myChart.setOption(option);
                    // instance?.proxy?.$forceUpdate()
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
        .catch(function (error) {
            console.log(error);
        });
    // option = {
    //     title: [
    //         {
    //             text: '今日待办情况',
    //             left: '30.2%',
    //             top: '37%',
    //             textStyle: {
    //                 fontSize: 22
    //             }
    //         }
    //     ],
    //     polar: {
    //         radius: ['55%', '70%']
    //     },
    //     angleAxis: {
    //         max: todayAllTodoNumber.value,
    //         startAngle: 90,
    //         axisTick: {
    //             show: false
    //         },
    //         axisLine: {
    //             show: false
    //         },
    //         splitLine: {
    //             show: false
    //         },
    //         axisLabel: {
    //             show: false
    //         }
    //     },
    //     radiusAxis: {
    //         type: 'category',
    //         data: ['完成', '发布'],
    //         minInterval: 1,
    //         splitNumber: 0,
    //         axisLine: {
    //             show: false
    //         },
    //         axisLabel: {
    //             show: false
    //         },
    //         axisTick: {
    //             show: false
    //         }
    //     },
    //     tooltip: {},
    //     series: {
    //         type: 'bar',
    //         data: [{ value: doneNumber.value, itemStyle: { color: 'rgb(254,74,98)' } },
    //         { value: noDoneNumber.value }],
    //         coordinateSystem: 'polar',
    //         // 圆弧效果
    //         roundCap: true,
    //         // 条形背景是否存在
    //         showBackground: true
    //     }
    // };

    // option && myChart.setOption(option);



})

</script>
    
<style scoped lang="scss">
.can {
    position: relative;

    .main {
        width: 350px;
        height: 360px;

        background-color: #fff;
    }

    .info {
        position: absolute;
        top: 172px;
        left: 112px;
        // transform: translate(40%);
        font-size: 18px;
        font-weight: 600;
        display: flex;
        flex-direction: column;
    }
}
</style>
