<template>
    <div class="login-form">
      <InputTel @change="(login) => formState.login = login" />
      <InputPassword @change="(password) => formState.password = password" />
      <Button @click="onClick" title="Войти"></Button>
      <p class="terms-of-service">
        Нажимая "Войти", вы принимаете<br />
        <a href="#">пользовательское соглашение</a>
      </p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import InputTel from './UI/InputTel';
  import InputPassword from './UI/InputPassword';
  import Button from './UI/Button.vue';
  
  type FormState = {
    login: string;
    password: string;
  };
  
  const formState = ref<FormState>({
    login: '',
    password: '',
  });
  
  const onClick = () => {
    if (!formState.value.login) {
        alert('Введите номер телефона!')
        return
    }
    if (!formState.value.password) {
        alert('Введите пароль!')
        return
    }
    alert(`
      Логин: ${formState.value.login}
      Пароль: ${formState.value.password}
    `);
  };
  </script>
  
<style lang="scss">
@import '../styles/_colors';

  .login-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .terms-of-service {
    font-family: Inter;
    font-weight: 400;
    font-size: 14px;
    line-height: 134%;
    letter-spacing: 0%;
    text-align: center;
    color: $text-secondary;

    a {
        color: $main;
        &:hover {
            cursor: pointer;
        }
    }
  }
</style>