import { acceptHMRUpdate, defineStore } from 'pinia'
import { IDivision, IDivisionRAW } from '@/types';
import { ref } from 'vue'
import { useFetch } from '@/composables/useFetch';
import { baseURL } from '@/constants';

export const useOrgStore = defineStore('orgStore', {
  state: () => {
    interface IOrganization {
      data: IDivision[];
      loading: boolean;
      error?: any;
    }

    const organization = ref<IOrganization>({ data: [], loading: false })
    const setOrganization = (value: {
      data?: IDivision[];
      loading?: boolean;
      error?: any;
    }) => {
      organization.value = Object.assign(organization.value, value)
    }

    const getOrganization = async () => {
      let { data, loading, error, fetchData } = useFetch(baseURL + '/divisions')
      setOrganization({ loading: loading.value })
      try {
        await fetchData()
        setOrganization({ data: data.value || [], loading: loading.value })
      } catch(error) {
        setOrganization({ data: [], error })
      }
      setOrganization({ loading: loading.value })
    }

    interface ICurrentDivision {
      data?: IDivision;
      loading: boolean;
      error?: any;
    }

    const currentDivision = ref<ICurrentDivision>({ loading: false })
    const setCurrentDivision = (value: {
      data?: IDivision;
      loading?: boolean;
      error?: any;
    }) => {
      currentDivision.value = Object.assign(currentDivision.value, value)
    }

    const getCurrentDivision = async (id: number) => {
      let { data, loading, error, fetchData } = useFetch(`${baseURL}/divisions/${id}`)
      setCurrentDivision({ loading: loading.value })
      try {
        await fetchData()
        setCurrentDivision({ data: data.value || [], loading: loading.value })
      } catch(error) {
        setCurrentDivision({ data: undefined, error })
      }
      setCurrentDivision({ loading: loading.value })
    }

    function getAllChildren(division: IDivision, targetId: number): IDivision[] {
      // Если текущее подразделение — это искомое, возвращаем всех его детей
      if (division.id === targetId) {
        return getAllDescendants(division);
      }
    
      // Иначе ищем в дочерних подразделениях
      for (const child of division.children) {
        const result = getAllChildren(child, targetId);
        if (result.length > 0) {
          return result;
        }
      }
    
      // Если ничего не найдено, возвращаем пустой массив
      return [];
    }

    function getAllDescendants(division: IDivision): IDivision[] {
      let descendants: IDivision[] = [];
    
      // Добавляем всех детей текущего подразделения
      for (const child of division.children) {
        descendants.push(child); // Добавляем текущего ребенка
        descendants = descendants.concat(getAllDescendants(child)); // Рекурсивно добавляем его детей
      }
    
      return descendants;
    }

    return {
      organization,
      getOrganization,
      currentDivision,
      getCurrentDivision,
      getAllChildren
    }
  }
})