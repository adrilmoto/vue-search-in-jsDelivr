<template lang="pug">
v-container
  v-row(
    :style=`{
      height: '',
    }`).d-flex.fill-width.align-center.justify-end
    span By Motovilov Roman
    v-btn(href="https://github.com/adrilmoto" target="_blank" color="secondary" dense).white--text.ml-2 Github
    v-btn(href="https://hh.ru/resume/9ff1ca1bff07eddade0039ed1f5738444e3077" target="_blank" color="red" dense).white--text.ml-2.d-none Hh.ru
</template>

<script>
export default {
  name: 'baseFooter'
}
</script>
