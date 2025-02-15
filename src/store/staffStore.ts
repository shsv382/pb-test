import { acceptHMRUpdate, defineStore } from 'pinia'
import { IOfficer, IDivision } from '@/types';
import { ref } from 'vue'

export const useStaffStore = defineStore('staffStore', {
  state: () => {
    const staff = ref<IOfficer[]>([
      { id: 1, firstName: 'Иван', lastName: 'Иванов', divisionID: 1 },
      { id: 2, firstName: 'Петр', lastName: 'Петров', divisionID: 2 },
      { id: 3, firstName: 'Алексей', lastName: 'Сидоров', divisionID: 2 },
      { id: 4, firstName: 'Мария', lastName: 'Кузнецова', divisionID: 3 },
      { id: 5, firstName: 'Ольга', lastName: 'Смирнова', divisionID: 4 },
      { id: 6, firstName: 'Алексей', lastName: 'Сидоров', divisionID: 2 },
      { id: 7, firstName: 'Алексей', lastName: 'Сидоров', divisionID: 2 },
      { id: 8, firstName: 'Алексей', lastName: 'Сидоров', divisionID: 2 },
    ]);

    return {
      staff
    }
  },
  persist: true
})