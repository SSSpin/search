<template>
  <div class="app-container">
    <div class="wrap">
      <h1>{{en}}</h1>
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
    <el-button class="submit-btn" size="large" type="primary" @click="handelClickEdit">提交
    </el-button>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import { parseTime } from '@/utils'
import { wordEdit } from '../../api/word';

export default {
  name: 'wordEdit',
  components: {
    Tinymce: Tinymce
  },
  data() {
    let data = this.$route.query;
    return {
      id: data.id,
      en: data.en,
      zh: data.zh,
      ex_zh: data.ex_zh,
      ex_en: data.ex_en
    }
  },

  methods: {
    handelClickEdit() {
      wordEdit({
        id: this.$data.id,
        en: this.$data.en,
        zh: this.$data.zh,
        ex_zh: this.$data.ex_zh,
        ex_en: this.$data.ex_en
      }).then((res) => {

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
