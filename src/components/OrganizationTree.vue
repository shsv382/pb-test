<template>
  <el-sub-menu 
    v-for="division in organization.children" 
    :key="division.id" 
    :index="division.id" 
    :class="{'root': root, 'no-children': !division.children.length}"
    class="org-tree"
  >
    <template #title> 
      <div v-if="!division.isEditing" 
        class="org-tree__title"
        @click="toggleDivision(division)"
        @contextmenu.prevent="startEditing(division)"
      >
        <RouterLink @click.stop :to="`/division/${division.id}`">
          <el-link type="primary" :underline="false">
            {{ division.name }}
          </el-link>
        </RouterLink>
        <!-- {{ division.isOpen ? '▼' : '►' }} -->
      </div>
      <el-input
        v-else
        v-model="division.name"
        @blur="stopEditing(division)"
        @keyup.enter="stopEditing(division)"
        @keyup.escape="cancelEditing(division)"
        autofocus
        />
    </template> 
      <OrganizationTree
        v-if="division.children.length"
        :organization="division"
        :root="false"
      />
  </el-sub-menu>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';
import { IOfficer, IDivision } from '@/types';

const props = defineProps<{
  organization: IDivision;
  root?: boolean
}>();

// Функция для раскрытия/сворачивания узла
const toggleDivision = (division: IDivision) => {
  division.isOpen = !division.isOpen;
};

// Функция для начала редактирования
const startEditing = (division: IDivision) => {
  division.isEditing = true;
};

// Функция для завершения редактирования
const stopEditing = (division: IDivision) => {
  division.isEditing = false;
};

// Функция для отмены редактирования
const cancelEditing = (division: IDivision) => {
  division.isEditing = false;
};
</script>

<style lang="scss" scoped>
.el-sub-menu {
  --el-menu-base-level-padding: 10px; /* Новое значение */
}

.el-sub-menu.no-children .el-sub-menu__icon-arrow {
  display: none;
}

.org-tree {
    list-style-type: none;
    margin-left: 10px;
    border-left: 1px solid var(--el-menu-active-color);
    &.root {
        margin-left: 0px;
        border-left: none;
    }
}

.org-tree__title {
  max-width: 100%;
  overflow: hidden;
}

.root > li:last-child {
  border-bottom: none;
}

</style>