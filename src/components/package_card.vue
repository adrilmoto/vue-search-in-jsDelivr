<template lang="pug">
v-container(
  v-if="packageFull"
  :style=`{borderRadius: '4px'}`).pa-5
  //- header
  v-row.d-flex.align-center
    span.text-h5 {{ package.name }}
    span.ml-2.caption Latest {{ packageFull.versions.tags.latest }}
  v-row
    span {{ package.type }}
  v-row.justify-end
    div(v-html="packageFull.package")
  //- versions
  v-row.subtitle-1.font-weight-bold Versions
  v-row
    div(v-for="version in packageFull.versions.versions" :key="version.id" style=`maxWidth: 80px; width: 100%; height: 20px`).d-flex.align-center
      span.caption {{version}}
  //- files
  v-row.subtitle-1.font-weight-bold Files
  v-row(
    :style=`{
      width: '100%'
    }`
    ).d-flex
    base-tree(
      v-for="(f,fi) in packageFull.files.files" :key="fi"
      :childrens="f.files"
      :childrensKey="'files'"
      :childrenKeyLabel="'name'"
      :whenToShowChildrens="(i) => i.files"
      :depth="0"
      :depthSize="6")
</template>

<script>
import baseTree from '@/components/base_tree.vue'

export default {
  name: 'packageCard',
  props: ['package'],
  components: {
    baseTree,
  },
  data () {
    return {
      packageFull: null,
    }
  },
  async mounted () {
    this.$log('mounted')
    this.packageFull = await this.$store.dispatch('fetchPackage', this.package)
  }
}
</script>
