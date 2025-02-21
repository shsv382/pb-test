import { acceptHMRUpdate, defineStore } from 'pinia'
import { IOfficer, IDivision } from '@/types';
import { ref } from 'vue'
import { useFetch } from '@/composables/useFetch';
import { baseURL } from '@/constants';

export const useStaffStore = defineStore('staffStore', {
  state: () => {
    interface IStaff {
      data: IOfficer[];
      loading: boolean;
      error?: any;
    }

    const staff = ref<IStaff>({ data: [], loading: false })
    const setStaff = (value: {
      data?: IOfficer[];
      loading?: boolean;
      error?: any;
    }) => {
      staff.value = Object.assign(staff.value, value)
    }

    const getStaff = async (id: number) => {
      let { data, loading, error, fetchData } = useFetch(`${baseURL}/divisions/${id}/staff`)
      setStaff({ loading: loading.value })
      try {
        await fetchData()
        setStaff({ data: data.value || [], loading: loading.value })
      } catch(error) {
        setStaff({ data: undefined, error })
      }
      setStaff({ loading: loading.value })
    }

    interface ICurrentDivisionStaff {
      data: IOfficer[];
      loading: boolean;
      error?: any;
    }

    const currentDivisionStaff = ref<ICurrentDivisionStaff>({ data: [], loading: false })
    const setCurrentDivisionStaff = (value: {
      data?: IDivision;
      loading?: boolean;
      error?: any;
    }) => {
      currentDivisionStaff.value = Object.assign(currentDivisionStaff.value, value)
    }

    const getCurrentDivisionStaff = async (id: number) => {
      let { data, loading, error, fetchData } = useFetch(`${baseURL}/divisions/${id}/staff`)
      setCurrentDivisionStaff({ loading: loading.value })
      try {
        await fetchData()
        setCurrentDivisionStaff({ data: data.value || [], loading: loading.value })
      } catch(error) {
        setCurrentDivisionStaff({ data: undefined, error })
      }
      setCurrentDivisionStaff({ loading: loading.value })
    }
    
    return {
      staff,
      currentDivisionStaff,
      getCurrentDivisionStaff,
    }
  },
  persist: true
})