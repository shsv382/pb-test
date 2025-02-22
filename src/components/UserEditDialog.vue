<template>
	<el-dialog
	  :model-value="visible"
	  title="Редактирование пользователя"
	  width="30%"
	  @close="handleClose"
	>
	  <el-form :model="form" label-width="120px">
		<el-form-item label="Имя">
		  <el-input v-model="form.firstName" />
		</el-form-item>
		<el-form-item label="Фамилия">
		  <el-input v-model="form.lastName" />
		</el-form-item>
		<el-form-item label="Роль">
		  <el-select v-model="form.role" placeholder="Выберите роль">
			<el-option label="Инженер" value="инженер" />
			<el-option label="Сотрудник" value="сотрудник" />
			<el-option label="Инспектор" value="инспектор" />
			<el-option label="Начальник" value="начальник" />
		  </el-select>
		</el-form-item>
		<el-form-item label="Дата рождения">
		  <el-date-picker
			v-model="form.birthday"
			type="date"
			placeholder="Выберите дату"
			format="DD.MM.YYYY"
		  />
		</el-form-item>
    <el-form-item label="Работает с">
		  <el-date-picker
			v-model="form.startDate"
			type="date"
			placeholder="Выберите дату"
			format="DD.MM.YYYY"
		  />
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
import { ref, computed } from 'vue';
import { useFetch } from '@/composables/useFetch';
import { baseURL } from '@/constants';
import { IOfficer } from '@/types';
import { useOrgStore } from '@/store/orgStore';
import { storeToRefs } from 'pinia';

const { currentDivision } = storeToRefs(useOrgStore())

const props = defineProps<{officer?: IOfficer, visible: boolean}>();

const emit = defineEmits(['update:visible', 'save']);

const form = ref({
  firstName: props.officer?.firstName || '',
  lastName: props.officer?.lastName || '',
  role: props.officer?.role || '',
  birthday: props.officer?.birthday || '',
  startDate: props.officer?.startDate || '',
  divisionID: props.officer?.divisionID || currentDivision.value.data?.id || 0
});

const formLoading = ref<boolean>(false)

const handleClose = () => {
  emit('update:visible', false); 
};

const url = computed<string>(() => {
  return props.officer ? `${baseURL}/staff/${props.officer?.id}` : `${baseURL}/staff`
})

const requestMethod = computed<string>(() => {
  return props.officer ? 'PUT' : 'POST'
})

const handleSave = async () => {
  const { loading, error, fetchData } = useFetch(url.value, {
    method: requestMethod.value,
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

</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>