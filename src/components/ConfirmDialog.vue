<template>
  <div class="modal" tabindex="-1" role="dialog" style="display:block">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">
            {{ dialogInfo.title || '提示' }}
          </h4>
        </div>
        <div class="modal-body">
          <p>{{ dialogInfo.text }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" @click="cancel()">
            {{ dialogInfo.cancelText || '取消' }}
          </button>
          <button type="button" class="btn btn-default" @click="confirm()">
            {{ dialogInfo.confirmText || '确定' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import vm from '../main'

export default {
  props: {
    dialogInfo: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    cancel () {
      if (this.dialogInfo.reject) {
        this.dialogInfo.reject()
        this.$emit('done')
      }
    },

    confirm () {
      if (this.dialogInfo.resolve) {
        this.dialogInfo.resolve()
        this.$emit('done')
      }
    }
  }
}
</script>

<style scoped>
  @import "https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css";
</style>
