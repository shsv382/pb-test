<template>
    <div class="input-tel"
        :class="{
            'input-tel_focused': focused
        }"
    >
        <i 
        class="icon-phone input-tel__icon" 
        :class="{
            'input-tel__icon_filled': !!phoneNumber || focused
        }"
        />
        <input
          class="input-tel__input"
          v-model="phoneNumber"
          @input="formatPhoneNumber"
          @focus="onFocus"
          @blur="onBlur"
          placeholder="8 999 999 99 99"
          maxlength="15"
        />
    </div>
</template>
  
<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['change']);

const phoneNumber = ref<string>('');

const formatPhoneNumber = (event: Event) => {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); 
    emit('change', value);

    if (value.length > 0) {
        value = value[0] + ' ' + value.substring(1, 4) + ' ' + value.substring(4, 7) + ' ' + value.substring(7, 9) + ' ' + value.substring(9, 11);
    }

    phoneNumber.value = value.trim();
};

const focused = ref<boolean>(false)

const onFocus = () => focused.value = true
const onBlur = () => focused.value = false
</script>
  
<style lang="scss">
@import '../../styles/_colors';

.input-tel {
    padding: 10px;
    height: 58px;
    width: 100%;
    border: 1px solid $input_background;
    border-radius: 18px;
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: $input_background;
    &_focused {
        border: 1px solid $main;
        background-color: white;
    }
}

.input-tel__input {
    font-family: Arial, sans-serif;
    font-size: 21px;
    display: inline-block;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    color: $input_text;

    &::placeholder {
        color: $input_placeholder;
    }
}

i.input-tel__icon {
    width: 20px;
    height: 20px;
    background-color: $input_placeholder;
    &_filled {
        background-color: $main;
    }
}
</style>