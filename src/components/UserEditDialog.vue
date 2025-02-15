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
			format="dd.MM.yyyy"
		  />
		</el-form-item>
	  </el-form>
  
	  <template #footer>
		<span class="dialog-footer">
		  <el-button @click="handleClose">Отмена</el-button>
		  <el-button type="primary" @click="handleSave">{{loading ? 'Загрузка' : 'Сохранить'}}</el-button>
		</span>
	  </template>
	</el-dialog>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  
  const props = defineProps({
	user: {
	  type: Object,
	  required: true,
	},
	visible: {
	  type: Boolean,
	  required: true,
	},
  });
  
  const emit = defineEmits(['update:visible', 'save']);
  
  const form = ref({
	firstName: props.user.firstName,
	lastName: props.user.lastName,
	role: props.user.role,
	birthday: props.user.birthday,
  });

  const loading = ref(false);
	const data = ref<any>(null);

	const fetchData = async () => {
		loading.value = true;

		new Promise((resolve) => {
			setTimeout(() => {
        resolve({ status: 200, message: 'Данные успешно загружены' }); // Имитация ответа от сервера
      }, 1000); // Имитация задержки в 1 секунду
		})
			.then((response) => {
			  data.value = response; 
			})
			.finally(() => {
			  loading.value = false; 
			});
	};
  
  const handleClose = () => {
	  emit('update:visible', false); 
	};
	
	const handleSave = async () => {
	// Здесь отправляем данные на сервер
    const response = await fetchData()
    console.log("Отправлены!")
  };
  
  watch(loading, (newValue) => {
    if (newValue === false) {
      emit('save', form.value); 
      handleClose(); 
    }
  })
  
  </script>
  
  <style scoped>
  .dialog-footer {
	display: flex;
	justify-content: flex-end;
  }
  </style>