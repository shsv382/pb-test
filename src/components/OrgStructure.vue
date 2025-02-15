<template>
  <div>
    <h1 class="org-structure__header">Организационная структура</h1>

    <el-input class="org-structure__filter" v-model="filter" placeholder="Поиск" />
    
    <el-menu>
      <OrganizationTree v-if="filteredOrg?.children.length" :organization="filteredOrg" :root="true" />
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import OrganizationTree from './OrganizationTree.vue';
import { useOrgStore } from '../store/orgStore';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { IDivision, IOfficer } from '@/types';

const orgStore = useOrgStore()
const { organization } = storeToRefs(orgStore)

const filter = ref<string>('')

function filterTreeBySubstring(node: IDivision, substring: string): IDivision | null {
    const isNodeMatch = node.name.toUpperCase().includes(substring.toUpperCase()) || 
    (node.acronym && node.acronym.toUpperCase().includes(substring.toUpperCase()));

    const filteredChildren = node.children
        .map(child => filterTreeBySubstring(child, substring))
        .filter(child => child !== null) as IDivision[];

    if (isNodeMatch || filteredChildren.length > 0) {
        return {
            ...node,
            children: filteredChildren
        };
    }

    return null;
}

const filteredOrg = computed(() => filterTreeBySubstring(organization.value, filter.value));

</script>

<style lang="scss" scoped>
.org-structure__header, .org-structure__filter {
  margin-bottom: 1em;
}
</style>