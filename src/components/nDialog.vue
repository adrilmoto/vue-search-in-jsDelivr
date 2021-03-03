<template lang="pug">
  v-card
    v-card-title(class="headline white lighten-2")
      span {{package.name}}
    v-card-text
      span {{package.type}}
    v-divider
    v-card-actions
      v-spacer
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'nDialog',
  props: {
    package: Object
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions(['addInfoPackage']),
    getPackage() {
      this.addInfoPackage(this.package)
    },
    clearAboutPackage() {
      console.log('clearAboutPackage')
    }
  },
  mounted () {
    this.getPackage()
  },
  destroy () {
    this.clearAboutPackage()
  }
}
</script>