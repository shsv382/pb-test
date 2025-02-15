<template>
  <div>
    <h1>Организационная структура</h1>
    <button @click="logOrganization">Показать структуру в консоли</button>
    <OrganizationTree :organization="organization" />
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