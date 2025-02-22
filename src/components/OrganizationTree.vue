<template>
  <el-sub-menu 
    :index="organization.id.toString()" 
    :class="{'root': root, 'no-children': !organization.children?.length}"
    class="org-tree"
  >
    <template #title> 
      <div class="org-tree__title">
        <RouterLink @click.stop :to="`/division/${organization.id}`">
          <el-link type="primary" :underline="false">
            {{ organization.acronym || organization.name }}
          </el-link>
        </RouterLink>
      </div>
    </template> 
    <template v-if="organization.children?.length">
      <OrganizationTree
      v-for="division in organization.children" 
      :organization="division"
      :root="false"
      :key="division.id" 
      :index="division.id.toString()" 
      />
    </template>
  </el-sub-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';
import { IOfficer, IDivision } from '@/types';
import { useOrgStore } from '@/store/orgStore';

const { getOrganization } = useOrgStore()

const props = defineProps<{
  organization: IDivision;
  root?: boolean
}>();


</script>

<style lang="scss">
.el-sub-menu.no-children .el-sub-menu__icon-arrow {
  display: none;
}
</style>

<style lang="scss" scoped>
.el-sub-menu {
  --el-menu-base-level-padding: 10px; /* Новое значение */
  padding-right: 0px;
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
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.org-tree__edit-btn {
  display: flex;
  justify-content: center;
}

.root > li:last-child {
  border-bottom: none;
}

</style>