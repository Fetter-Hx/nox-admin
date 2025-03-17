<script setup lang="ts">
  defineOptions({
    name: 'AuthenticationFormView'
  })
</script>

<template>
  <div class="bg-background flex-col-center relative px-6 py-10 lg:flex-initial">
    <slot></slot>
    <RouterView v-slot="{ Component, route }">
      <Transition appear mode="out-in" name="slide-right">
        <KeepAlive :include="['Login']">
          <component
            :is="Component"
            :key="route.fullPath"
            class="enter-right w-full sm:mx-auto md:max-w-md"
          />
        </KeepAlive>
      </Transition>
    </RouterView>
  </div>
</template>

<style scoped></style>
