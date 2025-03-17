<script setup lang="ts">
  import { useNoxForm, z } from '@nox-core/form-ui'
  import { h } from 'vue'

  const [Form] = useNoxForm({
    // layout: 'vertical',
    collapsedRows: 2,
    commonConfig: {
      hideLabel: true
    },
    handleSubmit: () => {},
    submitOnChange: false,
    submitOnEnter: true,
    // commonConfig: {
    //   disabled: true
    // },
    schema: [
      {
        // 组件需要在 #/adapter.ts内注册，并加上类型
        component: 'NoxCheckbox',
        // component: 'NoxInput',
        // 字段名
        fieldName: 'field12',
        // 界面显示的label
        label: '字段1',
        // rules: 'required',
        defaultValue: true,
        renderComponentContent: () => ({
          default: () => h('span', {}, { default: () => 'xxx' })
        })
      },
      {
        // 组件需要在 #/adapter.ts内注册，并加上类型
        component: 'NoxInput',
        // 对应组件的参数
        componentProps: {
          placeholder: '请输入'
        },
        // 字段名
        fieldName: 'field13',
        // 界面显示的label
        label: '字段2',
        // rules: 'required',
        defaultValue: '',
        rules: z.string().min(1, { message: 'xxx' })
      }
    ]
  })
</script>

<template>
  <div>
    <Form />
  </div>
</template>

<style scoped></style>
