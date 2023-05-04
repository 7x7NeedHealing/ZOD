<template>
    <el-row>
        <el-col :span="8">
            <el-statistic title="博客发布数量" :value="blogNumber" />
        </el-col>
        <el-col :span="8">
            <el-statistic :value="todoDoneNumber">
                <template #title>
                    <div style="display: inline-flex; align-items: center">
                        待办完成比例
                    </div>
                </template>
                <template #suffix> / {{ allTodoNumber }}</template>
            </el-statistic>
        </el-col>
        <el-col :span="8">
            <el-statistic title="评论发布数量" :value="commentNumber" />
        </el-col>
    </el-row>
</template>
  
<script lang="ts" setup>
import axios, { Axios } from 'axios';
import { onMounted, Ref, ref } from 'vue';
import { useMain } from '../../store/home';
let state = useMain()
let blogNumber: Ref<number> = ref(0);
let todoDoneNumber: Ref<number> = ref(0);
let allTodoNumber: Ref<number> = ref(0);
let commentNumber: Ref<number> = ref(0);
onMounted(() => {
    axios.get(state.http + '/checkSomeoneBlogNumber?fromId=' + state.account)
        .then(function (response) {
            blogNumber.value = response.data[0].count
        })
        .catch(function (error) {
            console.log(error);
        });
    axios.get(state.http + '/checkTodoDone?fromId=' + state.account)
        .then(function (response) {
            todoDoneNumber.value = response.data[0].count
        })
        .catch(function (error) {
            console.log(error);
        });
    axios.get(state.http + '/checkAllTodo?fromId=' + state.account)
        .then(function (response) {
            allTodoNumber.value = response.data[0].count
        })
        .catch(function (error) {
            console.log(error);
        });
    axios.get(state.http + '/checkCommentNumber?account=' + state.account)
        .then(function (response) {
            commentNumber.value = response.data[0].count
        })
        .catch(function (error) {
            console.log(error);
        });
})
</script>
  
<style scoped lang="scss">
.el-row {
    width: 990px;
    height: 360px;

    .el-col {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        // margin-top: 100px;
        // text-align: center;
        --el-font-size-extra-small: 26px;
        --el-font-size-extra-large: 24px;

        .el-statistic {
            height: 70px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .el-statistic__head {
                margin-bottom: 20px;
            }
        }


    }
}
</style>
  