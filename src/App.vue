<script setup lang="ts"></script>

<template>
  <app-header></app-header>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import AppHeader from '@/components/layout/AppHeader.vue';
</script>

<style lang="scss">
@import url('https://fonts.bunny.net/css?family=inter:400');

body {
  font-family: 'Inter', sans-serif;
}
</style>
