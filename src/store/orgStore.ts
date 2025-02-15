import { acceptHMRUpdate, defineStore } from 'pinia'
import { IDivision } from '@/types';
import { ref } from 'vue'

export const useOrgStore = defineStore('orgStore', {
  state: () => {
    const organization = ref<IDivision>({
      id: 0,
      name: '',
      chiefID: 0,
      children: [
        {
          id: 2,
          name: 'Служба случайных связей и интересов',
          acronym: 'СССИ',
          chiefID: 2,
          children: [
            {
              id: 3,
              name: 'Управление интернет-телевидения и обогащения',
              acronym: 'УИТО',
              chiefID: 3,
              children: [
                {
                  id: 7,
                  name: '1 отделение',
                  chiefID: 3,
                  children: [
                    {
                      id: 9,
                      name: '3 группа',
                      chiefID: 4,
                      children: [],
                    },
                  ],
                },
              ],
            },
            {
              id: 6,
              name: 'Управление правильного питания',
              acronym: 'УПП',
              chiefID: 3,
              children: [],
            },
          ],
        },
        {
          id: 4,
          name: 'Образовательное управление',
          acronym: 'ОУ',
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