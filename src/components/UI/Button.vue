<template>
    <button class="button" :class="`button-${props.style}`" @click="handleClick">
      <i v-if="icon" class="button__icon" :class="`icon-${icon}`"></i>
      <span>{{ title }}</span>
    </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: '',
  },
  style: {
    type: String,
    default: 'primary', 
    validator: (value: string) => {
      return ['primary', 'secondary', 'success', 'warning', 'danger'].includes(value);
    },
  },
});

const emit = defineEmits(['clicked']);

const handleClick = () => {
  emit('clicked');
};
</script>

<style lang="scss">
@import '../../styles/_colors';

.button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 10px;
    height: 58px;
    width: 100%;
    border-radius: 18px;
    font-size: 21px;
    border-width: 2px;
    border-style: solid;
    &-primary {
        color: white;
        background-color: $main;
        border-color: $main;
    }
    &-secondary {
        color: $main;
        background-color: white;
        border-color: $main;
    }
}

i.button__icon {
    width: 20px;
    height: 20px;
}

.button-primary i.button__icon {
    background-color: white;
}

.button-secondary i.button__icon {
    background-color: $main;
}
</style>