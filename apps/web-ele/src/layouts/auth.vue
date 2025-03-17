<script setup lang="ts">
  import { AuthPageLayout } from '@nox/layouts'
  import { $t } from '@nox/locales'
</script>

<template>
  <AuthPageLayout
    logo="1"
    :page-title="$t('authentication.pageTitle')"
    :page-description="$t('authentication.pageDescription')"
  />
</template>

<style scoped></style>
