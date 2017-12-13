<template>
  <div class="search-container">
    <!-- <img class="logo" src="../../assets/logo.png"/> -->
    <el-form class="card-box search-form" autoComplete="on" ref="searchForm" label-position="left">
      <h3 class="title">搜索</h3>
      <el-form-item prop="username">
        <el-autocomplete v-model="keyword" :trigger-on-focus="false" :fetch-suggestions="handleSearch" placeholder="请输入搜索内容" @select="handleSelect">
          <!--           <template >
            <div class="zh"></div>
            <span class="en"></span>
          </template> -->
        </el-autocomplete>
      </el-form-item>
    </el-form>
    <el-button v-if="showLogin" type="primary" class="login-btn" :loading="loading" @click.native.prevent="handleLogin">登陆</el-button>
    <el-button v-if="!showLogin" type="primary" class="login-btn" @click.native.prevent="handleClickUserCenter">用户中心</el-button>
    <el-dialog title="第三方验证" :visible.sync="showDialog">
      本地不能模拟，请结合自己业务进行模拟！！！
      <br/>
      <br/>
      <br/> 邮箱登录成功,请选择第三方验证
      <br/>
      <!-- <social-sign /> -->
    </el-dialog>
  </div>
</template>
<script>
import _ from 'lodash';
import { getToken } from '@/utils/auth' // 验权
// import { isvalidUsername } from '@/utils/validate'
// import socialSign from './socialsignin'

export default {
  name: 'search',
  data() {
    const validateUsername = (rule, value, callback) => {
      /*      if (!isvalidUsername(value)) {
              callback(new Error('请输入正确的用户名'))
            } else {
              callback()
            }*/
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }

    return {
      keyword: '',
      searchList: [],
      searchForm: {
        username: '',
        password: ''
      },
      showLogin: !getToken(),
      loading: false,
      showDialog: false
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleSelect(item) {
      this.$router.push({ name: 'word', params: item });
    },
    handleClickUserCenter(){
       this.$router.push('/wordAdd/index');
     },
    handleSearch(queryString, cb) {

      let me = this;
      if (!queryString) {
        return;
      }
      me.loading = true;
      me.$store.dispatch('search', { keyword: queryString }).then((res) => {
        me.loading = false;
        me.searchList = res;
        me.searchList.forEach((item) => {
          item.value = item.zh;
        });
        console.log(me.searchList);
        cb(me.searchList);
      }).catch(() => {
        me.loading = false;
      })
    },
    handleLogin() {
      this.$router.push('/login');
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.search-container {
  @include relative;
  height: 100vh;
  background-color: $bg;
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: $light_gray;
    height: 47px;
  }
  .logo {
    width: 200px;
    margin-top: 20px;
    margin-left: 20px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_search {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .search-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
  .login-btn {
    float: right;
    margin-top: 20px;
    margin-right: 20px;
  }
}

</style>
