<template>
    <nav>
      <!-- <router-link to="/">Home</router-link>
      <router-link to="/test">Test Task</router-link> -->
    </nav>
    <main class="main">
      <OrgStructure />
      <router-view />
    </main>
</template>

<script setup lang="ts">
import OrgStructure from './components/OrgStructure.vue'
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

nav {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 20px;
}

.main {
  display: grid;
  grid-template-columns: 350px auto;
  gap: 20px;
  padding: 0 30px;
  width: 100%;
}
</style>