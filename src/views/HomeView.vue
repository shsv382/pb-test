<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>
      Уважаемые коллеги!
    </h1>
    <p>Благодарю за столь интересное тестовое задание. Было приятно вспомнить, как выстраивать приложение с нуля, продумать некоторые архитектурные моменты, а также прикрутить кое-какие старые фичи из прошлых проектов!</p>
    <p>Конечно, ограничения по времени заставляют выбирать между "быстро" и "качественно", но я всегда стараюсь находить баланс.</p>
    <p>Проект выстроен, чтобы сделать оценку максимально удобной.</p>
    <p>Ссылка на репозиторий здесь - <a href="https://github.com/shsv382/service-structure" target="_blank">https://github.com/shsv382/service-structure</a>. Деплоить на мой сервер не надо. А вот о развертывании я позаботился: 
    </p>
    <p>
      <code @click.prevent="copyCode">cp deploy/* dist</code> - нужные конфигурационные файлы для поднятия контейнера с Nginx уже внутри.
    </p>
    <p>
      <code>cd dist</code> - перейдите в директорию.
    </p>
    <p>
      <code>./start.sh</code> - если у вас установлен Docker, то эта команда скопирует настройки в контейнер и запустит его на порту 5050
    </p>
    <p>
      Прошу обратить внимание на некоторые моменты:
      <ul>
        <li>В некоторых местах есть индикаторы загрузки. Они настроены на таймаут-заглушку - иначе вы бы их просто не увидели.</li>
        <li>Расчет численности подразделения идет с учетом ВСЕХ ДОЧЕРНИХ ПОДРАЗДЕЛЕНИЙ! Не удивляйтесь, что на экране 6 карточек, а в чистенности указано 22.</li>
        <li>Если что-то еще будет смущать - обращайтесь, отвечу на любые вопросы!</li>
      </ul>
    </p>
  </div>
</template>

<script setup lang="ts">
const copyCode = async (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const textToCopy = target.innerText; 
    try {
      await navigator.clipboard.writeText(textToCopy); 
      alert('Текст скопирован: ' + textToCopy); 
    } catch (err) {
      console.error('Ошибка при копировании: ', err); 
    }
  }
</script>

<style>
.home, ul {
  display: grid;
  place-items: center;
  gap: 1em;
  padding-top: 1em;
  padding-bottom: 30px;
  p, li {
    text-align: justify;
    width: 80%;
    margin: auto;
    place-self: left;
  }
}

code {
  background-color: rgb(189, 208, 228);
  padding: 2px;
  cursor: pointer;
}
</style>