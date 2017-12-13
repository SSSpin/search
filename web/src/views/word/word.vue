<template>
  <div class="app-container">
    <div class="wrapper">
      <h1 @click="handelClickEdit">{{data.en}}<icon-svg  class="edit-icon" icon-class="form" /></h1>
      <br>
      <code>
        <h3>释义：</h3>
        <p>{{data.zh}}</p>
        <br>
        <h3>例句：</h3>
        <p><h5>中：</h5>{{data.ex_zh}}</p>
        <p><h5>英：</h5>{{data.ex_en}}</p>
      </code>
    </div>
  </div>
</template>
<script>
import { parseTime } from '@/utils'


export default {
  name: 'word',

  data() {
    return {
      data: this.$route.params
    }
  },

  created() {

  },
  methods: {
    handelClickEdit() {
      this.$router.push({ path: '/wordEdit/index', query: this.$data.data });
    }
  }
}

</script>
<style scoped>
.wrapper {
  width: 800px;
  margin: 30px auto;
}

.edit-icon {
  width: 16px;
  margin-left: 15px;
  cursor: pointer;
}

</style>
