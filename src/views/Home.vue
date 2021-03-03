<style lang="scss">
.pack {
  border: 1px solid rgb(175, 175, 175);
  border-radius: 5px;
  margin: 10px 0px;
  overflow: hidden;
  height: 100px
}
.pack:hover {
  background-color: #F3E5F5
}
</style>

<template lang="pug">
v-container.col.fill-width.pb-15
  v-dialog(
    v-model="packageShow" width="600px")
    package-card(
      v-if="packageShow"
      :package="package"
      @close="packageShow = false").white
  //- search wrapper
  v-row(
    :style=`{
      position: 'sticky', top: '0', zIndex: '100',
      background: 'white', boxShadow: '0 2px 4px #999'
    }`
    ).d-flex.fill-width.justify-center
    v-text-field(
      :rules="rules"
      v-model="searchString"
      placeholder="Search"
      prepend-inner-icon="mdi-magnify"
      dense outlined
      style=`padding-top: 25px; maxWidth: 700px`).my-2.px-3
  //- packages wrapper
  div(:style=`{width: '100%',}`).d-flex.justify-center.pb-4
    v-container(:style=`{maxWidth: '720px', width: '100%'}`)
      v-row(
        v-for="(pack,packIndex) in packagesFiltered" :key="pack.name"
        @click="packageClick(pack)"
        ).d-flex.pack.justify-center.align-center.px-10.cursor
        v-col
          v-row.text-h6 {{pack.name}}
          v-row {{pack.type}}
  //- footer with pagination
  v-row(
    :style=`{
      position: 'fixed', bottom: '60px', zIndex: 100,
      background: 'white',
      width: '100%',
    }`).d-flex.fill-width.justify-center.mt-4.align-center.pr-8
    v-btn(@click="toStart()" fab small elevation="0" color="white")
      v-icon(dark color="primary") mdi-reload
    v-btn(@click="prev()" elevation="0" color="white")
      v-icon(dark color="primary") mdi-chevron-double-left
      span Prev
    span.text-h6.mx-3 {{ page }}
    v-btn(@click="next()" elevation="0" color="white") Next
      v-icon(dark color="primary") mdi-chevron-double-right
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import packageCard from '@/components/package_card.vue'
// import nDialog from '@/components/nDialog'

export default {
  name: 'Home',
  components: {
    packageCard
    // nDialog,
  },
  data () {
    return {
      rules: [
        value => !!value || 'Required.'
      ],
      searchString: '',
      searchStringTimeout: null,
      searchStringChanging: false,
      page: 1,
      // pageSize: 10,
      package: null,
      packageShow: false,
    }
  },
  computed: {
    ...mapGetters(['packages']),
    packagesFiltered () {
      if (this.searchString.length === 0) {
        return this.packages
      }
      else {
        return this.packages.filter(p => {
          return p.name.includes(this.searchString)
        })
      }
    }
  },
  watch: {
    searchString: {
      immediate: true,
      async handler (to, from) {
        // debounce implementation...
        if (this.searchStringTimeout) {
          clearTimeout(this.searchStringTimeout)
          this.searchStringTimeout = null
        }
        if (!this.searchStringChanging) {
          this.$log('searchStringChanging START')
        }
        this.searchStringChanging = true
        this.searchStringTimeout = setTimeout(async () => {
          this.searchStringChanging = false

          // END of jointsWrapperWidthChanging
          this.$log('searchStringChanging END', to, from)
          // await this.fetchPackages({q: to, page: this.page})
        }, 600)
      }
    },
    page: {
      immediate: true,
      async handler (to, from) {
        this.$log('page TO', to, from)
        await this.fetchPackages({q: '', page: to})
      }
    }
  },
  methods: {
    ...mapActions(['fetchPackages']),
    toStart () {
      this.$log('toStart')
      this.page = 1
    },
    prev () {
      this.$log('prev')
      if (this.page === 1) return
      this.page -= 1
    },
    next () {
      this.$log('next')
      // TODO: handle max page...
      this.page += 1
    },
    packageClick (pack) {
      this.$log('packageClick', pack)
      this.package = pack
      this.packageShow = true
    }
  },
  async mounted() {
    this.$log('mounted')
  },
  beforeDestroy () {
    this.$log('beforeDestroy')
  }
}
</script>
