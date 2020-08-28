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
      '😀': '😀',
      '😁': '😁',
      '😂': '😂',
      '😃': '😃',
      '😄': '😄',
      '😅': '😅',
      '😆': '😆',
      '😉': '😉',
      '😊': '😊',
      '😋': '😋',
      '😎': '😎',
      '😍': '😍',
      '😘': '😘',
      '😗': '😗',
      '😙': '😙',
      '😚': '😚',
      '😇': '😇',
      '😐': '😐',
      '😑': '😑',
      '😶': '😶',
      '😏': '😏',
      '😣': '😣',
      '😥': '😥',
      '😮': '😮',
      '😯': '😯',
      '😪': '😪',
      '😫': '😫',
      '😴': '😴',
      '😌': '😌',
      '😛': '😛',
      '😜': '😜',
      '😝': '😝',
      '😒': '😒',
      '😓': '😓',
      '😔': '😔',
      '😕': '😕',
      '😲': '😲',
      '😷': '😷',
      '😖': '😖',
      '😞': '😞',
      '😟': '😟',
      '😤': '😤',
      '😢': '😢',
      '😭': '😭',
      '😦': '😦',
      '😧': '😧',
      '😨': '😨',
      '😬': '😬',
      '😰': '😰',
      '😱': '😱',
      '😳': '😳',
      '😵': '😵',
      '😡': '😡',
      '😠': '😠',
      '💪': '💪',
      '👈': '👈',
      '👉': '👉',
      '👆': '👆',
      '👇': '👇',
      '✋': '✋',
      '👌': '👌',
      '👍': '👍',
      '👎': '👎',
      '✊': '✊',
      '👊': '👊',
      '👋': '👋',
      '👏': '👏',
      '👐': '👐',
      '🙋': '🙋',
      '🙇': '🙇',
      '🙌': '🙌',
      '🙏': '🙏',
      '👨': '👨',
      '[微笑]': require('@/assets/face/weixiao.gif'),
      '[撇嘴]': require('@/assets/face/pizui.gif'),
      '[色]': require('@/assets/face/se.gif'),
      '[发呆]': require('@/assets/face/fadai.gif'),
      '[得意]': require('@/assets/face/deyi.gif'),
      '[流泪]': require('@/assets/face/liulei.gif'),
      '[害羞]': require('@/assets/face/haixiu.gif'),
      '[闭嘴]': require('@/assets/face/bizui.gif'),
      '[睡觉]': require('@/assets/face/shuijiao.gif'),
      '[大哭]': require('@/assets/face/daku.gif'),
      '[尴尬]': require('@/assets/face/gangga.gif'),
      '[大怒]': require('@/assets/face/danu.gif'),
      '[调皮]': require('@/assets/face/tiaopi.gif'),
      '[呲牙]': require('@/assets/face/ciya.gif'),
      '[惊讶]': require('@/assets/face/jingya.gif'),
      '[难过]': require('@/assets/face/nanguo.gif'),
      '[酷]': require('@/assets/face/ku.gif'),
      '[冷汗]': require('@/assets/face/lenghan.gif'),
      '[抓狂]': require('@/assets/face/zhuakuang.gif'),
      '[吐]': require('@/assets/face/tu.gif'),
      '[偷笑]': require('@/assets/face/touxiao.gif'),
      '[可爱]': require('@/assets/face/keai.gif'),
      '[白眼]': require('@/assets/face/baiyan.gif'),
      '[饥饿]': require('@/assets/face/er.gif'),
      '[困]': require('@/assets/face/kun.gif'),
      '[惊恐]': require('@/assets/face/jingkong.gif'),
      '[流汗]': require('@/assets/face/liuhan.gif'),
      '[憨笑]': require('@/assets/face/haha.gif'),
      '[大兵]': require('@/assets/face/dabing.gif'),
      '[奋斗]': require('@/assets/face/fendou.gif'),
      '[咒骂]': require('@/assets/face/ma.gif'),
      '[疑问]': require('@/assets/face/wen.gif'),
      '[嘘]': require('@/assets/face/xu.gif'),
      '[晕]': require('@/assets/face/yun.gif'),
      '[折磨]': require('@/assets/face/zhemo.gif'),
      '[衰]': require('@/assets/face/shuai.gif'),
      '[骷髅]': require('@/assets/face/kulou.gif'),
      '[敲打]': require('@/assets/face/da.gif'),
      '[再见]': require('@/assets/face/zaijian.gif'),
      '[擦汗]': require('@/assets/face/cahan.gif'),
      '[挖鼻]': require('@/assets/face/wabi.gif'),
      '[鼓掌]': require('@/assets/face/guzhang.gif'),
      '[糗大了]': require('@/assets/face/qioudale.gif'),
      '[坏笑]': require('@/assets/face/huaixiao.gif'),
      '[左哼哼]': require('@/assets/face/zuohengheng.gif'),
      '[右哼哼]': require('@/assets/face/youhengheng.gif'),
      '[哈欠]': require('@/assets/face/haqian.gif'),
      '[鄙视]': require('@/assets/face/bishi.gif'),
      '[委屈]': require('@/assets/face/weiqu.gif'),
      '[哭了]': require('@/assets/face/ku.gif'),
      '[快哭了]': require('@/assets/face/kuaikule.gif'),
      '[阴险]': require('@/assets/face/yinxian.gif'),
      '[亲亲]': require('@/assets/face/qinqin.gif'),
      '[亲吻]': require('@/assets/face/kiss.gif'),
      '[吓]': require('@/assets/face/xia.gif'),
      '[可怜]': require('@/assets/face/kelian.gif'),
      '[菜刀]': require('@/assets/face/caidao.gif'),
      '[西瓜]': require('@/assets/face/xigua.gif'),
      '[啤酒]': require('@/assets/face/pijiu.gif'),
      '[篮球]': require('@/assets/face/lanqiu.gif'),
      '[乒乓]': require('@/assets/face/pingpang.gif'),
      '[咖啡]': require('@/assets/face/kafei.gif'),
      '[饭]': require('@/assets/face/fan.gif'),
      '[猪头]': require('@/assets/face/zhutou.gif'),
      '[玫瑰]': require('@/assets/face/hua.gif'),
      '[凋谢]': require('@/assets/face/diaoxie.gif'),
      '[爱心]': require('@/assets/face/love.gif'),
      '[心碎]': require('@/assets/face/xinsui.gif'),
      '[蛋糕]': require('@/assets/face/dangao.gif'),
      '[闪电]': require('@/assets/face/shandian.gif'),
      '[地雷]': require('@/assets/face/zhadan.gif'),
      '[刀]': require('@/assets/face/dao.gif'),
      '[足球]': require('@/assets/face/qiu.gif'),
      '[虫]': require('@/assets/face/chong.gif'),
      '[便便]': require('@/assets/face/dabian.gif'),
      '[月亮]': require('@/assets/face/yueliang.gif'),
      '[太阳]': require('@/assets/face/taiyang.gif'),
      '[礼物]': require('@/assets/face/liwu.gif'),
      '[拥抱]': require('@/assets/face/yongbao.gif'),
      '[强]': require('@/assets/face/qiang.gif'),
      '[弱]': require('@/assets/face/ruo.gif'),
      '[握手]': require('@/assets/face/woshou.gif'),
      '[胜利]': require('@/assets/face/shengli.gif'),
      '[佩服]': require('@/assets/face/peifu.gif'),
      '[勾引]': require('@/assets/face/gouyin.gif'),
      '[拳头]': require('@/assets/face/quantou.gif'),
      '[差劲]': require('@/assets/face/chajin.gif'),
      '[干杯]': require('@/assets/face/cheer.gif'),
      '[NO]': require('@/assets/face/no.gif'),
      '[OK]': require('@/assets/face/ok.gif'),
      '[给力]': require('@/assets/face/geili.gif'),
      '[飞吻]': require('@/assets/face/feiwen.gif'),
      '[跳跳]': require('@/assets/face/tiao.gif'),
      '[发抖]': require('@/assets/face/fadou.gif'),
      '[怄火]': require('@/assets/face/dajiao.gif'),
      '[转圈]': require('@/assets/face/zhuanquan.gif'),
      '[磕头]': require('@/assets/face/ketou.gif'),
      '[回头]': require('@/assets/face/huitou.gif'),
      '[跳绳]': require('@/assets/face/tiaosheng.gif'),
      '[挥手]': require('@/assets/face/huishou.gif'),
      '[激动]': require('@/assets/face/jidong.gif'),
      '[街舞]': require('@/assets/face/tiaowu.gif'),
      '[献吻]': require('@/assets/face/xianwen.gif'),
      '[左太极]': require('@/assets/face/youtaiji.gif'),
      '[右太极]': require('@/assets/face/zuotaiji.gif')
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
