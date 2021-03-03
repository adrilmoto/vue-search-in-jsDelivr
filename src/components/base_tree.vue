<template lang="pug">
div(
  :style=`{
    width: '100%',
  }`).d-flex.flex-wrap
  //- header
  div(
    :style=`{
      width: '100%',
    }`).d-flex.flex-wrap
    slot
  //- nodes
  div(
    :style=`{
      width: '100%',
      paddingLeft: depth*depthSize+'px',
      borderLeft: '1px solid #999'
    }`
    ).d-flex.flex-wrap
    div(
      v-for="(children,childrenIndex) in childrens" :key="childrenIndex"
      :style=`{
        width: '100%',
      }`).d-flex.flex-wrap
      //- here we go again...
      base-tree(
        v-if="whenToShowChildrens(children)"
        :childrens="children[childrensKey]"
        :childrensKey="childrensKey"
        :childrenKeyLabel="childrenKeyLabel"
        :whenToShowChildrens="whenToShowChildrens"
        :depth="depth+1"
        :depthSize="depthSize")
        span.text-white {{ children[childrenKeyLabel] }}
      //- this is file
      div(
        v-else
        :style=`{
          width: '100%',
          padding: '4px 0',
        }`
        ).d-flex.flex-wrap
        span.text-white {{ children[childrenKeyLabel] }}
</template>

<script>
export default {
  name: 'baseTree',
  props: {
    childrens: {
      type: Array
    },
    childrensKey: {
      type: String,
      required: true
    },
    childrenKeyLabel: {
      type: String,
      require: true,
    },
    whenToShowChildrens: {
      type: Function,
      required: true
    },
    depth: {
      type: Number,
      default: 0,
    },
    depthSize: {
      type: Number,
      default: 6
    }
  },
  data () {
    return {
    }
  }
}
</script>
