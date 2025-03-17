<script setup lang="ts">
  import SloganIcon from './icons/slogan.vue'
  import AuthenticationFormView from './form.vue'

  interface Props {
    appName?: string
    logo?: string
    pageTitle?: string
    pageDescription?: string
    sloganImage?: string
  }

  const { appName, logo, pageTitle, pageDescription, sloganImage } = defineProps<Props>()
</script>

<template>
  <div class="flex min-h-full select-none overflow-x-hidden">
    <!-- 顶部logo和应用名 -->
    <div v-if="logo || appName" class="absolute left-0 top-0 z-10 flex flex-1">
      <div class="text-red-400">{{ logo }}</div>
    </div>

    <!-- 系统说明介绍 -->
    <div class="relative hidden w-0 flex-1 lg:block">
      <div class="bg-background-deep absolute inset-0 size-full">
        <div class="login-background absolute inset-0 size-full"></div>

        <div class="flex-col-center enter-left h-full">
          <div class="relative mb-20">
            <template v-if="sloganImage">
              <img :alt="appName" :src="sloganImage" class="h-64 w-64" />
            </template>
            <SloganIcon v-else class="h-64 w-64 animate-pulse" />
            <span
              class="animate-ping-low-small bg-primary/40 absolute inset-0 inline-block h-full w-full rounded-full opacity-75"
            ></span>
          </div>
          <div class="text-primary text-nowrap lg:text-2xl">{{ pageTitle }}</div>
          <div class="text-foreground mt-2 text-nowrap">{{ pageDescription }}</div>
        </div>
      </div>
    </div>

    <!-- 右侧认证面板 -->
    <AuthenticationFormView class="min-h-full w-[35%] flex-1" />
  </div>
</template>

<style scoped>
  .login-background {
    background: linear-gradient(
      140deg,
      #08080815 30%,
      hsl(var(--primary) / 35%) 50%,
      #08080815 65%
    );
    filter: blur(100px);

    /* background: linear-gradient(
      154deg,
      #07070915 30%,
      hsl(var(--primary) / 30%) 48%,
      #07070915 64%
    );
    filter: blur(100px); */
  }
</style>
