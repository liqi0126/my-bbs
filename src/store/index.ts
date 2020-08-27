import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userId: 0,
    // currentPage: 1,
    showBookmark: false,
    bookmark: {},
    showHistory: false,
    browseHistory: [],
    currentTags: [],
    tagsByPostId: {},
    postsByTag: {}
  },
  mutations: {
    // setCurrentPage (state, page) {
    //   state.currentPage = page
    //   localStorage.currentPage = page
    // },
    login (state, payload) {
      state.token = payload.token
      localStorage.token = payload.token

      state.userId = payload.userId
      localStorage.userId = payload.userId
    },
    logout (state) {
      state.token = ''
      localStorage.removeItem('token')

      state.userId = 0
      localStorage.removeItem('userId')
      localStorage.clear()
    },
    addBookMark (state, post) {
      if (localStorage.bookmark) {
        state.bookmark = JSON.parse(localStorage.bookmark)
      }
      state.bookmark[post.id] = post
      localStorage.bookmark = JSON.stringify(state.bookmark)
    },
    removeBookMark (state, id) {
      if (localStorage.bookmark) {
        state.bookmark = JSON.parse(localStorage.bookmark)
      }
      delete state.bookmark[id]
      localStorage.bookmark = JSON.stringify(state.bookmark)
    },
    enableBookmark (state) {
      state.showBookmark = true
    },
    disableBookmark (state) {
      state.showBookmark = false
    },
    enableHistory (state) {
      state.showHistory = true
    },
    disableHistory (state) {
      state.showHistory = false
    },
    addHistory (state, newHistory) {
      if (localStorage.browseHistory) {
        state.browseHistory = JSON.parse(localStorage.browseHistory)
      }
      state.browseHistory.push(newHistory)
      localStorage.browseHistory = JSON.stringify(state.browseHistory)
    },
    updateCurrentTags (state, tags) {
      state.currentTags = tags
      localStorage.currentTags = JSON.stringify(tags)
    },
    addTag (state, payload) {
      if (localStorage.tagsByPostId) {
        state.tagsByPostId = JSON.parse(localStorage.tagsByPostId)
      }
      if (localStorage.postsByTag) {
        state.postsByTag = JSON.parse(localStorage.postsByTag)
      }

      if (localStorage.tagsList) {
        state.tagsList = JSON.parse(localStorage.tagsList)
      }

      if (!state.tagsByPostId[payload.post.id]) {
        state.tagsByPostId[payload.post.id] = []
      }

      if (!state.postsByTag[payload.tag]) {
        state.postsByTag[payload.tag] = {}
      }

      // duplicated tag
      if (state.tagsByPostId[payload.post.id].indexOf(payload.tag) !== -1) {
        alert('这个标签已经被添加过了~')
        return
      }
      state.tagsByPostId[payload.post.id].push(payload.tag)
      state.postsByTag[payload.tag][payload.post.id] = payload.post

      localStorage.tagsByPostId = JSON.stringify(state.tagsByPostId)
      localStorage.postsByTag = JSON.stringify(state.postsByTag)
    },
    removeTag (state, payload) {
      if (localStorage.tagsByPostId) {
        state.tagsByPostId = JSON.parse(localStorage.tagsByPostId)
      }
      if (localStorage.postsByTag) {
        state.postsByTag = JSON.parse(localStorage.postsByTag)
      }
      state.tagsByPostId[payload.postId].splice(state.tagsByPostId[payload.postId].indexOf(payload.tag), 1)
      delete state.postsByTag[payload.tag][payload.postId]

      localStorage.tagsByPostId = JSON.stringify(state.tagsByPostId)
      localStorage.postsByTag = JSON.stringify(state.postsByTag)
    }
  },
  getters: {
    // getCurrentPage (state) {
    //   if (localStorage.currentPage) {
    //     state.currentPage = localStorage.currentPage
    //   }
    //   return state.currentPage
    // },
    getToken (state) {
      if (localStorage.token) {
        state.token = localStorage.token
      }
      return state.token
    },
    getUserId (state) {
      if (localStorage.userId) {
        state.userId = localStorage.userId
      }
      return state.userId
    },
    getBookmark (state) {
      if (localStorage.bookmark) {
        state.bookmark = JSON.parse(localStorage.bookmark)
      }
      return state.bookmark
    },
    getHistory (state) {
      if (localStorage.browseHistory) {
        state.browseHistory = JSON.parse(localStorage.browseHistory)
      }
      if (state.browseHistory) {
        return state.browseHistory.reverse()
      } else {
        return null
      }
    },
    getPostsByTagDict (state) {
      if (localStorage.postsByTag) {
        state.postsByTag = JSON.parse(localStorage.postsByTag)
      }
      return state.postsByTag
    },
    getCurrentTags (state) {
      if (localStorage.currentTags) {
        state.currentTags = JSON.parse(localStorage.currentTags)
      }
      return JSON.parse(state.currentTags)
    },
    getTagsList (state) {
      if (localStorage.postsByTag) {
        state.postsByTag = JSON.parse(localStorage.postsByTag)
      }
      const tags = []
      for (const tag in state.postsByTag) {
        if (JSON.stringify(state.postsByTag[tag]) !== '{}') {
          tags.push(tag)
        }
      }
      return tags
    },
    getTagsByPostIdDict (state) {
      if (localStorage.tagsByPostId) {
        state.tagsByPostId = JSON.parse(localStorage.tagsByPostId)
      }
      return state.tagsByPostId
    }
  },
  actions: {
  },
  modules: {
  }
})
