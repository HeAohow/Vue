// import { reject, resolve } from 'core-js/fn/promise'
// import vm from '../main'
import dialogStore from '../components/ConfirmDialog/dialogStore'

export function confirmDialog ({ title, text, cancelText, confirmText }) {
  return new Promise((resolve, reject) => {
    dialogStore.commit('setDialog', { title, text, cancelText, confirmText, resolve, reject })
    // vm.$emit('setDialog', {
    //   title,
    //   text,
    //   cancelText,
    //   confirmText,
    //   resolve,
    //   reject
    // })
  })
}

export default confirmDialog
