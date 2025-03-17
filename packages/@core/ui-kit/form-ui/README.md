# @nox-core/form-ui

核心功能：封装通用form表单组件

使用方法：调用useNoxForm 方法，传入相关的表单配置项，在页面上渲染返回的Form组件，如下：

```vue
<script setup lang="ts">
const [Form, formApi] = useNoxForm(
  reactive({
    commonConfig: {
      hideLabel: true,
      hideRequiredMark: true,
    },
    schema: computed(() => props.formSchema),
    showDefaultActions: false,
  }),
);
</script>
<template>
	<Form />
</template>
```

实现依赖：

使用vee-validate的组合式api useForm来构建表单，比高阶组件更加灵活

使用shadcn-ui的基本组件（如按钮、输入框）和FormField等组件（底层使用vee-validate实现）和一些vee-validate的组合式函数，使用zod进行表单验证，使用@tanstack/vue-store来对传入useNoxForm的数据和传给Form组件的props进行统一集中的状态管理。