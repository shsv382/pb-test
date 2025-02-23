<template>
  <div class="org-structure">
    <el-text tag="h2" class="org-structure__header">Организационная структура</el-text>

    <el-input 
      class="org-structure__filter" 
      v-model="filter" 
      placeholder="Поиск"
     />

    <el-menu v-if="filteredOrg?.length">
      <OrganizationTree v-for="org in filteredOrg" :organization="org" :root="true" />
    </el-menu>
    <el-menu v-else-if="organization.loading">
      <div v-loading="organization.loading" style="width: 100%; height: 20vh">
			
		  </div>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import OrganizationTree from './OrganizationTree.vue';
import { useOrgStore } from '../store/orgStore';
import { storeToRefs } from 'pinia';
import { ref, computed, watch, onMounted } from 'vue';
import { IDivision, IOfficer } from '@/types';

const orgStore = useOrgStore()
const { organization } = storeToRefs(orgStore)

const filter = ref<string>('')

function filterTreeBySubstring(node: IDivision, substring: string): IDivision | null {
    const isNodeMatch = node.name.toUpperCase().includes(substring.toUpperCase()) || 
        (node.acronym && node.acronym.toUpperCase().includes(substring.toUpperCase()));

    if (isNodeMatch) {
        return node
    }

    const filteredChildren = node.children
        .map(child => filterTreeBySubstring(child, substring))
        .filter(child => child !== null) as IDivision[];

    if (filteredChildren.length > 0) {
        return {
            ...node,
            children: filteredChildren
        };
    }

    return null;
}

const filteredOrg = computed(() => {
  return organization.value.data
    .map(node => filterTreeBySubstring(node, filter.value))
    .filter(node => !!node)
});

onMounted(orgStore.getOrganization)
</script>

<style lang="scss" scoped>
.org-structure {
  min-height: 100vh;
  background-color: white;
  z-index: 9990;
  padding-right: 40px;
  @media (max-width: 560px) {
    position: fixed;
    min-width: 100vw;
  }
}

.org-structure__header, .org-structure__filter {
  margin-bottom: 1em;
}

.org-structure__header {
  font-size: 1.6em;
}
</style>