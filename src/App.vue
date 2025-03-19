<template>
    <main class="main">
      <router-view />
    </main>
</template>

<script setup lang="ts">
import OrgStructure from './components/OrgStructure.vue'
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.main {
  display: grid;
  gap: 20px;
  padding: 30px 30px;
  width: 100%;
}
</style>