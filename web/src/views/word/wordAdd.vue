<template>
  <div class="app-container">
    <div class="wrap">
      <h3>词汇：</h3>
      <el-input autosize v-model="en" placeholder="请输入内容"></el-input>
      <h3>释义：</h3>
      <el-input autosize v-model="zh" placeholder="请输入内容"></el-input>
      <h3>例句：</h3>
      <h5>中：</h5>
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="ex_zh">
      </el-input>
      <!-- <tinymce :editor-image="false" :height='200' v-model="ex_zh"></tinymce> -->
      <h5>英：</h5>
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="ex_en">
      </el-input>
      <!-- <tinymce :editor-image="false" :height='200' v-model="ex_en"></tinymce> -->
    </div>
    <el-button class="submit-btn" size="large" type="primary" @click="handelClickAdd">提交
    </el-button>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import { parseTime } from '@/utils'
import { wordAdd } from '../../api/word';

export default {
  name: 'wordAdd',
  components: {
    Tinymce: Tinymce
  },
  data() {
    return {
      en: '',
      zh: '',
      ex_zh: '',
      ex_en: ''
    }
  },

  methods: {
    handelClickAdd() {
      wordAdd({
        en: this.$data.en,
        zh: this.$data.zh,
        ex_zh: this.$data.ex_zh,
        ex_en: this.$data.ex_en
      });
    }
  }
}

</script>
<style scoped>
.wrapper {
  width: 800px;
  margin: 30px auto;
}

.submit-btn {
  float: right;
  margin-top: 20px;
  margin-right: 20px;
}

.edit-icon {
  width: 16px;
  margin-left: 15px;
  cursor: pointer;
}

</style>
