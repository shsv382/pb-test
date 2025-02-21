<template>
	<el-dialog
	  :model-value="visible"
	  title="Редактирование подразделения"
	  width="30%"
	  @close="handleClose"
	>
	  <el-form :model="form" label-width="120px">
		<el-form-item label="Название">
		  <el-input v-model="form.name" />
		</el-form-item>
		<el-form-item label="Сокращенное название">
		  <el-input v-model="form.acronym" />
		</el-form-item>
	  </el-form>
  
	  <template #footer>
		<span class="dialog-footer">
		  <el-button @click="handleClose">Отмена</el-button>
		  <el-button type="primary" @click="handleSave">{{formLoading ? 'Загрузка' : 'Сохранить'}}</el-button>
		</span>
	  </template>
	</el-dialog>
  </template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { useFetch } from '@/composables/useFetch';
import { baseURL } from '@/constants';
import { IDivisionRAW, IOfficer } from '@/types';

const props = defineProps<{division?: IDivisionRAW, visible: boolean}>();

const emit = defineEmits(['update:visible', 'save']);

const form = ref({
  name: props.division?.name || '',
  acronym: props.division?.acronym || '',
});

const formLoading = ref<boolean>(false)

const handleClose = () => {
  emit('update:visible', false); 
};

const handleSaveChanges = async () => {
  const { data, loading, error, fetchData } = useFetch(`${baseURL}/divisions/${props.division?.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({...form.value})
  })
  formLoading.value = loading.value
  await fetchData()
  formLoading.value = loading.value
  emit('save')
};

const handleSaveNew = async () => {
  const { data, loading, error, fetchData } = useFetch(`${baseURL}/staff`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({...form.value})
  })
  formLoading.value = loading.value
  await fetchData()
  formLoading.value = loading.value
  emit('save')
};

const handleSave = props.division ? handleSaveChanges : handleSaveNew

</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>