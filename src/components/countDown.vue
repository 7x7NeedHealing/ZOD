<template>
    <el-row>
        <el-col>
            <el-countdown :title="firstTitle" :value="value1" />
            <el-button class="countdown-footer" type="primary" @click="editFirst">编辑内容
            </el-button>
        </el-col>
    </el-row>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import { parseInt } from 'lodash';

const now = new Date();
const todayXpm = new Date();
todayXpm.setHours(18, 0, 0, 0);
const diff = todayXpm.getTime() - now.getTime();
let firstTitle = ref('离下班还有');
// 放入现在的时间+现在到设定时间的毫秒差
let value1 = ref(Date.now() + diff)


const editFirst = (e: any) => {
    // dialogFormVisible.value = true;
    ElMessageBox.prompt('请输入预定的完成时间(例如18:30)', '编辑时间', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern:
            /^(?:[01]\d|2[0-3]):[0-5]\d$/,
        inputErrorMessage: '无效时间，请检查',
    })
        .then(({ value }) => {
            // firstTitle.value = editTitle.value;
            let timeArray = value.split(":");
            let hour = parseInt(timeArray[0]);
            let minute = parseInt(timeArray[1]);
            todayXpm.setHours(hour, minute, 0, 0);
            let diff = todayXpm.getTime() - now.getTime();
            value1.value = (Date.now() + diff)
            ElMessage({
                type: 'success',
                message: `时间已成功设置为{${value}}`,
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消更改',
            })
        })
    // editTime1()
}


</script>
  
<style scoped lang="scss">
.el-row {
    width: 560px;
    height: 300px;

    .el-col {

        margin-top: 88px;
        text-align: center;
        --el-font-size-extra-small: 26px;
        --el-font-size-extra-large: 24px;

        .el-statistic {
            height: 100px;
            display: flex;
            justify-content: space-around;
            flex-direction: column;
        }

        .el-button {
            // width: 100px;
            margin: 0 auto;
        }

    }
}


.countdown-footer {
    margin-top: 8px;
}
</style>
  