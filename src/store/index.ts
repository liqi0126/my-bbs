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
    postsByTag: {},
    emoji: {
      '[微笑]': require('@/assets/faceweixiao.gif'),
      '[撇嘴]': require('@/assets/facepizui.gif'),
      '[色]': require('@/assets/facese.gif'),
      '[发呆]': require('@/assets/facefadai.gif'),
      '[得意]': require('@/assets/facedeyi.gif'),
      '[流泪]': require('@/assets/faceliulei.gif'),
      '[害羞]': require('@/assets/facehaixiu.gif'),
      '[闭嘴]': require('@/assets/facebizui.gif'),
      '[睡觉]': require('@/assets/faceshuijiao.gif'),
      '[大哭]': require('@/assets/facedaku.gif'),
      '[尴尬]': require('@/assets/facegangga.gif'),
      '[大怒]': require('@/assets/facedanu.gif'),
      '[调皮]': require('@/assets/facetiaopi.gif'),
      '[呲牙]': require('@/assets/faceciya.gif'),
      '[惊讶]': require('@/assets/facejingya.gif'),
      '[难过]': require('@/assets/facenanguo.gif'),
      '[酷]': require('@/assets/faceku.gif'),
      '[冷汗]': require('@/assets/facelenghan.gif'),
      '[抓狂]': require('@/assets/facezhuakuang.gif'),
      '[吐]': require('@/assets/facetu.gif'),
      '[偷笑]': require('@/assets/facetouxiao.gif'),
      '[可爱]': require('@/assets/facekeai.gif'),
      '[白眼]': require('@/assets/facebaiyan.gif'),
      '[傲慢]': require('@/assets/faceaoman.gif'),
      '[饥饿]': require('@/assets/faceer.gif'),
      '[困]': require('@/assets/facekun.gif'),
      '[惊恐]': require('@/assets/facejingkong.gif'),
      '[流汗]': require('@/assets/faceliuhan.gif'),
      '[憨笑]': require('@/assets/facehaha.gif'),
      '[大兵]': require('@/assets/facedabing.gif'),
      '[奋斗]': require('@/assets/facefendou.gif'),
      '[咒骂]': require('@/assets/facema.gif'),
      '[疑问]': require('@/assets/facewen.gif'),
      '[嘘]': require('@/assets/facexu.gif'),
      '[晕]': require('@/assets/faceyun.gif'),
      '[折磨]': require('@/assets/facezhemo.gif'),
      '[衰]': require('@/assets/faceshuai.gif'),
      '[骷髅]': require('@/assets/facekulou.gif'),
      '[敲打]': require('@/assets/faceda.gif'),
      '[再见]': require('@/assets/facezaijian.gif'),
      '[擦汗]': require('@/assets/facecahan.gif'),
      '[挖鼻]': require('@/assets/facewabi.gif'),
      '[鼓掌]': require('@/assets/faceguzhang.gif'),
      '[糗大了]': require('@/assets/faceqioudale.gif'),
      '[坏笑]': require('@/assets/facehuaixiao.gif'),
      '[左哼哼]': require('@/assets/facezuohengheng.gif'),
      '[右哼哼]': require('@/assets/faceyouhengheng.gif'),
      '[哈欠]': require('@/assets/facehaqian.gif'),
      '[鄙视]': require('@/assets/facebishi.gif'),
      '[委屈]': require('@/assets/faceweiqu.gif'),
      '[哭了]': require('@/assets/faceku.gif'),
      '[快哭了]': require('@/assets/facekuaikule.gif'),
      '[阴险]': require('@/assets/faceyinxian.gif'),
      '[亲亲]': require('@/assets/faceqinqin.gif'),
      '[亲吻]': require('@/assets/facekiss.gif'),
      '[吓]': require('@/assets/facexia.gif'),
      '[可怜]': require('@/assets/facekelian.gif'),
      '[菜刀]': require('@/assets/facecaidao.gif'),
      '[西瓜]': require('@/assets/facexigua.gif'),
      '[啤酒]': require('@/assets/facepijiu.gif'),
      '[篮球]': require('@/assets/facelanqiu.gif'),
      '[乒乓]': require('@/assets/facepingpang.gif'),
      '[咖啡]': require('@/assets/facekafei.gif'),
      '[饭]': require('@/assets/facefan.gif'),
      '[猪头]': require('@/assets/facezhutou.gif'),
      '[玫瑰]': require('@/assets/facehua.gif'),
      '[凋谢]': require('@/assets/facediaoxie.gif'),
      '[爱心]': require('@/assets/facelove.gif'),
      '[心碎]': require('@/assets/facexinsui.gif'),
      '[蛋糕]': require('@/assets/facedangao.gif'),
      '[闪电]': require('@/assets/faceshandian.gif'),
      '[地雷]': require('@/assets/facezhadan.gif'),
      '[刀]': require('@/assets/facedao.gif'),
      '[足球]': require('@/assets/faceqiu.gif'),
      '[虫]': require('@/assets/facechong.gif'),
      '[便便]': require('@/assets/facedabian.gif'),
      '[月亮]': require('@/assets/faceyueliang.gif'),
      '[太阳]': require('@/assets/facetaiyang.gif'),
      '[礼物]': require('@/assets/faceliwu.gif'),
      '[拥抱]': require('@/assets/faceyongbao.gif'),
      '[强]': require('@/assets/faceqiang.gif'),
      '[弱]': require('@/assets/faceruo.gif'),
      '[握手]': require('@/assets/facewoshou.gif'),
      '[胜利]': require('@/assets/faceshengli.gif'),
      '[佩服]': require('@/assets/facepeifu.gif'),
      '[勾引]': require('@/assets/facegouyin.gif'),
      '[拳头]': require('@/assets/facequantou.gif'),
      '[差劲]': require('@/assets/facechajin.gif'),
      '[干杯]': require('@/assets/facecheer.gif'),
      '[NO]': require('@/assets/faceno.gif'),
      '[OK]': require('@/assets/faceok.gif'),
      '[给力]': require('@/assets/facegeili.gif'),
      '[飞吻]': require('@/assets/facefeiwen.gif'),
      '[跳跳]': require('@/assets/facetiao.gif'),
      '[发抖]': require('@/assets/facefadou.gif'),
      '[怄火]': require('@/assets/facedajiao.gif'),
      '[转圈]': require('@/assets/facezhuanquan.gif'),
      '[磕头]': require('@/assets/faceketou.gif'),
      '[回头]': require('@/assets/facehuitou.gif'),
      '[跳绳]': require('@/assets/facetiaosheng.gif'),
      '[挥手]': require('@/assets/facehuishou.gif'),
      '[激动]': require('@/assets/facejidong.gif'),
      '[街舞]': require('@/assets/facetiaowu.gif'),
      '[献吻]': require('@/assets/facexianwen.gif'),
      '[左太极]': require('@/assets/faceyoutaiji.gif'),
      '[右太极]': require('@/assets/facezuotaiji.gif')
    }
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
      return state.currentTags
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
