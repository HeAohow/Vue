<template>
  <div>
    <router-view></router-view>
    <!-- <component
      v-for="(item, index) in items"
      :key="index"
      :is="item.component"
      :dialogInfo="item.dialogInfo"
      @done="doneDialog(index)"
    /> -->
    <component
      v-for="(dialogInfo, index) in dialogList"
      :key="index"
      :is="ConfirmDialog"
      :dialogInfo="dialogInfo"
      :index="index"/>
  </div>
</template>

<script>
import ConfirmDialog from './components/ConfirmDialog/ConfirmDialog'
import dialogStore from './components/ConfirmDialog/dialogStore'

export default {
  name: 'app',
  computed: {
    dialogList () {
      return dialogStore.state.dialogList
    }
  },

  data () {
    return { ConfirmDialog }
  }
}
// import vm from './main'

// export default {
//   name: 'app',
//   data () {
//     return {
//       items: []
//     }
//   },

//   mounted () {
//     this.$nextTick(() => {
//       vm.$on('setDialog', dialogInfo => {
//         this.items.push({ dialogInfo, component: ConfirmDialog })
//       })
//     })
//   },

//   methods: {
//     doneDialog (index) {
//       this.items.splice(index, 1)
//     }
//   }
// }
</script>
