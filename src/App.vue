<template>
    <nav class="main-nav">
      <el-text>Тестовое задание</el-text>
    </nav>
    <main class="main">
      <OrgStructure />
      <router-view />
    </main>
    <div class="fallback">
      <el-text>Пожалуйста, смотрите с компьютера! Адаптив не готов!</el-text>
    </div>
</template>

<script setup lang="ts">
import OrgStructure from './components/OrgStructure.vue'
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.main-nav {
  position: fixed;
  top: 0; 
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 10px 8px rgba(0,0,0,0.1);
}

.main {
  display: grid;
  grid-template-columns: 350px auto;
  gap: 20px;
  padding: 80px 30px;
  width: 100%;
}

.fallback {
  display: none;
}

@media (max-width: 768px) {
  .main-nav, .main {
    display: none;
  }

  .fallback {
    display: grid;
    place-items: center;
    height: 80vh;
  }
}
</style>