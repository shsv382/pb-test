import { acceptHMRUpdate, defineStore } from 'pinia'
import { Division } from '@/types';
import { ref } from 'vue'

export const useOrgStore = defineStore('orgStore', {
  state: () => {
    const organization = ref<Division>({
      id: 1,
      name: 'Главное управление',
      staff: [
        { id: 1, firstName: 'Иван', lastName: 'Иванов', division: {} as Division },
        { id: 2, firstName: 'Петр', lastName: 'Петров', division: {} as Division },
      ],
      children: [
        {
          id: 2,
          name: 'Отдел разработки',
          staff: [
            { id: 3, firstName: 'Алексей', lastName: 'Сидоров', division: {} as Division },
          ],
          children: [
            {
              id: 3,
              name: 'Группа фронтенда',
              staff: [
                { id: 4, firstName: 'Мария', lastName: 'Кузнецова', division: {} as Division },
              ],
              children: [],
            },
          ],
        },
        {
          id: 4,
          name: 'Отдел тестирования',
          staff: [
            { id: 5, firstName: 'Ольга', lastName: 'Смирнова', division: {} as Division },
          ],
          children: [],
        },
      ],
    });

    return {
      organization
    }
  },
  persist: true
})