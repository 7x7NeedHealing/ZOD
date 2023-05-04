    
<template>
    <div class="container">
        <div class="header">
            <div class="bigData">
                <!-- <span>近七日待办完成情况</span> -->
                <BigData></BigData>
            </div>
        </div>
        <div class="footer">
            <div class="footerLeft">
                <RoundData></RoundData>
            </div>
            <div class="footerRight">
                <TotalData></TotalData>
            </div>
        </div>
    </div>
</template>
    
<script setup lang="ts">
import BigData from '../components/shujutongji/bigData.vue';
import RoundData from '../components/shujutongji/roundData.vue';
import TotalData from '../components/shujutongji/totalData.vue';


</script>
    
<style scoped lang="scss">
// ::-webkit-scrollbar {
//     width: 4px;
//     height: 2px;
//     // background-color: rgba(0, 0, 0, .3); 
// }
// ::-webkit-scrollbar-track  
// {  
//     -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
//     border-radius: 10px;  
//     background-color: #F5F5F5;  
// }  
// /*定义滑块 内阴影+圆角*/  
// ::-webkit-scrollbar-thumb  
// {  
//     border-radius: 10px;  
//     -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
//     background-color: #555;  
// } 
.container {
    width: 1350px;
    height: 870px;
    background-color: rgb(241, 242, 245);

    .header {
        width: 100%;
        height: 500px;
        box-sizing: border-box;
        // border-radius: 8px;
        // padding: 10px;
        margin-bottom: 10px;

        .bigData {
            width: 1330px;
            height: 500px;
            // border-radius: 8px;
            background-color: white;
        }
    }

    .footer {
        width: 100%;
        height: 360px;
        display: flex;
        border-radius: 8px;
        // background-color: #fff;

        .footerLeft {
            width: 350px;
            height: 360px;
            margin-right: 10px;
            // background-color: blueviolet;
        }

        .footerRight {
            width: 990px;
            height: 360px;
            background-color: white;
        }
    }
}
</style>
