import { acceptHMRUpdate, defineStore } from 'pinia'
import { IDivision, IDivisionRAW } from '@/types';
import { ref } from 'vue'

export const useOrgStore = defineStore('orgStore', {
  state: () => {
    const divisions = ref<IDivisionRAW[]>([
      {
        id: 0,
        name: '',
        chiefID: 0,
        childrenID: [2, 4],
        parentID: 0,
      },
      {
        id: 2,
        name: 'Служба случайных связей и интересов',
        acronym: 'СССИ',
        chiefID: 2,
        parentID: 0,
        childrenID: [3, 6]
      },
      {
        id: 3,
        name: 'Управление интернет-телевидения и обогащения',
        acronym: 'УИТО',
        chiefID: 3,
        parentID: 2,
        childrenID: [7, 10]
      },
      {
        id: 7,
        name: '1 отделение',
        chiefID: 3,
        parentID: 3,
        childrenID: [9]
      },
      {
        id: 9,
        name: '3 группа',
        chiefID: 4,
        parentID: 7,
        childrenID: [],
      },
      {
        id: 10,
        name: '2 группа',
        chiefID: 3,
        parentID: 3,
        childrenID: []
      },
      {
        id: 6,
        name: 'Управление правильного питания',
        acronym: 'УПП',
        chiefID: 3,
        parentID: 2,
        childrenID: [11, 12]
      },
      {
        id: 11,
        name: '3 группа',
        chiefID: 3,
        parentID: 6,
        childrenID: []
      },                 
      {
        id: 12,
        name: '4 группа',
        chiefID: 3,
        parentID: 6,
        childrenID: []
      },
      {
        id: 4,
        name: 'Образовательное управление',
        acronym: 'ОУ',
        chiefID: 4,
        parentID: 0,
        childrenID: [],
      },
    ]);

    const organization = ref<IDivision>({
      id: 0,
      name: '',
      chiefID: 0,
      parentID: 0,
      children: [
        {
          id: 2,
          name: 'Служба случайных связей и интересов',
          acronym: 'СССИ',
          chiefID: 2,
          parentID: 0,
          children: [
            {
              id: 3,
              name: 'Управление интернет-телевидения и обогащения',
              acronym: 'УИТО',
              chiefID: 3,
              parentID: 2,
              children: [
                {
                  id: 7,
                  name: '1 отделение',
                  chiefID: 3,
                  parentID: 3,
                  children: [
                    {
                      id: 9,
                      name: '3 группа',
                      chiefID: 4,
                      parentID: 7,
                      children: [],
                    },
                  ],
                },
                {
                  id: 10,
                  name: '2 группа',
                  chiefID: 3,
                  parentID: 3,
                  children: []
                }
              ],
            },
            {
              id: 6,
              name: 'Управление правильного питания',
              acronym: 'УПП',
              chiefID: 3,
              parentID: 2,
              children: [
                {
                  id: 11,
                  name: '3 группа',
                  chiefID: 3,
                  parentID: 6,
                  children: []
                },                 
                {
                  id: 12,
                  name: '4 группа',
                  chiefID: 3,
                  parentID: 6,
                  children: []
                }
              ],
            },
          ],
        },
        {
          id: 4,
          name: 'Образовательное управление',
          acronym: 'ОУ',
          chiefID: 4,
          parentID: 0,
          children: [],
        },
      ],
    });

    return {
      organization,
      divisions
    }
  }
})