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
              name: 'Управление информационно-телекоммуникационного обеспечения',
              chiefID: 3,
              children: [
                {
                  id: 7,
                  name: 'Групп 111енда',
                  chiefID: 3,
                  children: [
                    {
                      id: 9,
                      name: 'Отдел тестирования',
                      chiefID: 4,
                      children: [],
                    },
                  ],
                },
              ],
            },
            {
              id: 6,
              name: 'Групп енда',
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
  }
})