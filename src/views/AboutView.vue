<template>
  <div class="home">
    <img alt="Vue logo" style="max-width: 320px; max-height: 320px; overflow: hidden; border-radius: 50%;" src="https://avatars.githubusercontent.com/u/23529942?v=4">
    <el-text tag="h1" size="large">
      Друзья!
    </el-text>
    <el-text tag="p">Благодарю за столь интересное тестовое задание!</el-text>
    <el-text tag="p">Конечно, ограничения по времени заставляют выбирать между "быстро" и "качественно", но я всегда стараюсь находить баланс.</el-text>
    <el-text tag="p"><a href="https://https://github.com/shsv382/pb-test" target="_blank">Ссылка на основной репозиторий здесь</a></el-text>
    <el-text tag="p"><a href="/login">Вернуться на страницу с формой</a></el-text>
</div>
</template>

<style scoped lang="scss">
.home {
  width: 100%;
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