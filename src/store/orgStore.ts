import { acceptHMRUpdate, defineStore } from 'pinia'
import { Division } from '@/types';
import { ref } from 'vue'

export const useOrgStore = defineStore('orgStore', {
  state: () => {
    const organization = ref<Division>({
      id: 1,
      name: 'Главное управление',
      chiefID: 1,
      children: [
        {
          id: 2,
          name: 'Отдел разработки',
          chiefID: 2,
          children: [
            {
              id: 3,
              name: 'Группа фронтенда',
              chiefID: 3,
              children: [],
            },
          ],
        },
        {
          id: 4,
          name: 'Отдел тестирования',
          chiefID: 4,
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