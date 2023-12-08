<template>
  <div id="judgmentConfig">
    <a-table :columns="columns" :data="judgeCase" :pagination="false">
      <template #input="{ record }">
        <a-textarea
          v-model="record.input"
          placeholder="请输入测试的输入用例"
          :auto-size="{
            minRows: 1,
            maxRows: 2,
          }"
          allow-clear
        />
      </template>
      <template #output="{ record }">
        <a-textarea
          v-model="record.output"
          placeholder="请输入测试的输出用例"
          :auto-size="{
            minRows: 1,
            maxRows: 2,
          }"
          allow-clear
        />
      </template>
      <template #optional="{ rowIndex }">
        <a-space style="margin-right: '6px'">
          <icon-delete
            :style="{ fontSize: '18px', color: 'red' }"
            @click="handleDelete(rowIndex)"
          />
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import { IconDelete } from "@arco-design/web-vue/es/icon";
interface judgeCaseData {
  input: string;
  output: string;
}
/**
 * 定义组件属性类型
 */
interface Props {
  judgeCase: judgeCaseData[];
  handleDelete: (v: judgeCaseData) => void;
}
/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {});

const { judgeCase } = toRefs(props);
const columns = [
  {
    title: "输入用例",
    dataIndex: "input",
    slotName: "input",
  },
  {
    title: "输出用例",
    dataIndex: "output",
    slotName: "output",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
</script>

<style scoped></style>
