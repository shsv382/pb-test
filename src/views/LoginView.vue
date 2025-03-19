<template>
  <div class="login">
    <div class="login-form__container">
      <Logo />
      <LoginForm />
      <div class="login-form__bottom">
        <a style="color: #257AD7" href="/about">Приветствие</a>
        <Button title="Зарегистрироваться" :style="'secondary'"></Button>
        <p>
          Copyright 2021 辽宁未来生物科技有限公司
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '../components/UI/Logo'
import LoginForm from '../components/LoginForm'
import Button from '../components/UI/Button.vue'
</script>

<style lang="scss">
@use '../styles/icons';
@import '../styles/colors';

.login {
  width: 100vw;
  height: 100vh;
  padding: 25px;
  background-image: url(../assets/svg/background.svg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: row-reverse;
}

.login-form__container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: 480px;
  @media (min-width: 481px) {
    padding: 50px;
    margin-right: 5%;
    justify-content: center;
    gap: 80px;
    height: unset;
  }
}

.login-form__bottom {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
  p {
    color: $text-secondary;
  }
}
</style>