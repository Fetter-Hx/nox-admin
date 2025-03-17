<script setup lang="ts">
  import { ElConfigProvider } from 'element-plus'
  import { elementLocale } from '@/locales'
</script>

<template>
  <ElConfigProvider :locale="elementLocale">
    <RouterView />
  </ElConfigProvider>
</template>

<style></style>
