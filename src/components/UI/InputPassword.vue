<template>
    <div class="input-password"
        :class="{
            'input-password_focused': focused
        }"
    >
        <i 
        class="icon-password input-password__icon" 
        :class="{
            'input-password__icon_filled': !!password || focused
        }"
        />
        <input
          class="input-password__input"
          v-model="password"
          @focus="onFocus"
          @blur="onBlur"
          @input="onInput"
          placeholder="Пароль"
          :type="passwordShown ? 'text' : 'password'"
        />
        <i 
        class="icon-eye input-password__eye" 
        :class="{
            'input-password__eye_show': passwordShown
        }"
        @click="switchPasswordShown"
        />
    </div>
</template>
  
<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['change']);

const password = ref<string>('');

const onInput = () => {
  emit('change', password);
};

const focused = ref<boolean>(false)

const onFocus = () => focused.value = true
const onBlur = () => focused.value = false

const passwordShown = ref<boolean>(false)

const switchPasswordShown = () => {
    passwordShown.value = !passwordShown.value
}
</script>
  
<style lang="scss">
@import '../../styles/_colors';

.input-password {
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

.input-password__input {
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

i.input-password__icon {
    width: 20px;
    height: 20px;
    background-color: $input_placeholder;
    &_filled {
        background-color: $main;
    }
}

i.input-password__eye {
    width: 20px;
    height: 20px;
    background-color: $input_placeholder;
    &_show {
        background-color: $main;
    }
}
</style>