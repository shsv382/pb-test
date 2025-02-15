<template>
  <div>
    <h1 class="org-structure__header">Организационная структура</h1>
    <!-- <button @click="logOrganization">Показать структуру в консоли</button> -->
    
    <el-menu>
      <OrganizationTree :organization="organization" :root="true" />
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import OrganizationTree from './OrganizationTree.vue';
import { useOrgStore } from '../store/orgStore';
import { storeToRefs } from 'pinia';

const orgStore = useOrgStore()
const { organization } = storeToRefs(orgStore)

const logOrganization = () => {
  console.log(JSON.parse(JSON.stringify(organization.value)));
};
</script>

<style lang="scss" scoped>
.org-structure__header {
  margin-bottom: 1em;
}
</style>