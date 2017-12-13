import { search } from '@/api/search';

const searchStore = {
  state: {
    keyword: '',
    words: []
  },

  mutations: {
    SET_KEYWORD: (state, word) => {
      state.keyword = word
    },
    SET_WORDS: (state, words) => {
      state.words = words;
    }
  },

  actions: {
    search(store, data) {
      return new Promise((resolve, reject) => {
        search(data).then((res) => {
          let data = res.data;
          store.commit('SET_WORDS', data.content);
          resolve(data.content);
        }).catch((error) => {
          reject(error);
        });
      });
    }
  }
}

export default searchStore;
