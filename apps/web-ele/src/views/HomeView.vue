<!--
 * @Author: HX
 * @Date: 2024-10-16 11:24:05
 * @LastEditors: HX
 * @LastEditTime: 2024-11-11 16:14:01
 * @FilePath: \nox-monorepo\apps\web-ele\src\views\HomeView.vue
 * @Description: 
 * 
-->
<script setup lang="ts">
  import { NoxAvatar, NoxButton, NoxIconButton } from '@nox-core/shadcn-ui'
  import { MdiGithub } from '@nox/icons'
</script>

<template>
  <NoxAvatar src="https://github.com/radix-vue.png" dot class="size-10" />
  <NoxButton>{{ $t('common.login') }}</NoxButton>
  <NoxIconButton tooltip="使用Github登录">
    <MdiGithub />
  </NoxIconButton>
</template>

<style lang="scss" scoped></style>
