<style lang="scss">
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
::-webkit-scrollbar-thumb {
  background-color: #8e24aa;
  border-radius: 5px;
  z-index: -1;
}
.nethernite {
  background: url("assets/nethernite.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  border-radius: 10px;
  background-color: #fff;
}
.br {
  border: 1px solid red;
}
.full-width {
  width: 100%;
}
</style>

<template lang="pug">
v-app
  v-app-bar(app elevation="0" dense height="50px" color="primary" dark).flex-row
    base-header
  v-main
    router-view
  v-footer(app color="primary" height="50px" dark).br
    base-footer
</template>

<script>
import baseHeader from '@/components/base_header.vue'
import baseFooter from '@/components/base_footer.vue'

export default {
  name: 'App',
  components: {
    baseHeader,
    baseFooter,
  }
}
</script>
