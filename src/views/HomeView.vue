<template>
  <div class="home">
    <img alt="Vue logo" style="max-width: 320px; max-height: 320px; overflow: hidden; border-radius: 50%;" src="https://avatars.githubusercontent.com/u/23529942?v=4">
    <h1>
      Уважаемые коллеги!
    </h1>
    <p>Благодарю за столь интересное тестовое задание!</p>
    <p>Конечно, ограничения по времени заставляют выбирать между "быстро" и "качественно", но я всегда стараюсь находить баланс.</p>
    <p><a href="https://github.com/shsv382/service-structure" target="_blank">Ссылка на основной репозиторий здесь</a></p>
    <p><a href="https://github.com/shsv382/service-structure-api" target="_blank">Ссылка на репозиторий с API-сервером</a></p>
    <p>
      Прошу обратить внимание на некоторые моменты:
      <ul>
        <li>На API-сервере использован миддлвар, который задерживает выдачу ответа на 1 секунду - чтобы вы могли видеть индикатор загрузки</li>
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

<style scoped lang="scss">
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