<template>
  <div class="example">
    <quill-editor ref="myTextEditor" class="editor" v-model="content" :options="editorOption">
      <div id="toolbar" slot="toolbar">
        <button class="ql-link"></button>
        <button class="ql-image"></button>
        <button class="ql-emoji"></button>
        <button class="ql-code-block"></button>

        <el-popover ref="popover" placement="top" width="400" v-model="popVisible">
          <el-button class="ql-image-url" slot="reference" icon="el-icon-upload" />
          <el-input v-model="imageUrl" placeholder="请输入图片URL"></el-input>
          <div style="text-align:center;margin-top:10px">
            <el-button type="success" icon="el-icon-check" round @click="addImageUrl"></el-button>
            <el-button type="danger" icon="el-icon-delete" round @click="closePopover"></el-button>
          </div>
        </el-popover>

        <button @click="codeBlock">
          <i class="el-icon-edit-outline"></i>
        </button>
        <!-- <button @click="emojiShow">
          <i></i>
        </button>-->
      </div>
    </quill-editor>

    <div class="output ql-snow">
      <div class="title">Output</div>
      <div class="ql-editor" v-html="$options.filters.setEmoji(this.content)"></div>
    </div>
    <div class="ql-editor" style="display:block">{{ this.content }}</div>
  </div>
</template>

<script>
// import dedent from 'dedent'
import { Quill } from 'vue-quill-editor'
import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'
import quillEmoji from 'quill-emoji'
import 'quill-emoji/dist/quill-emoji.css'
const testImageAPI = 'https://github.surmon.me/images/'
const testImageUrl = testImageAPI + 'background.jpg'

// Custom emoji-list
const emojiList = []

// MDI emojicon instead of default icon
const emojiIcon = '<svg class="i" viewBox="0 0 24 24"><use href="#emoticon-happy"></use></svg>'

Quill.register('modules/ImageExtend', ImageExtend)

export default {
  name: 'quill-example-register-modules',
  title: 'Register modules',
  data () {
    return {
      imageUrl: '',
      popVisible: false,

      name: 'register-modules-example',
      content: `
        <p><span class="ql-emojiblot" data-name="grinning"><span contenteditable="false"><span class="ap ap-grinning">😀</span></span></span></p><p><br></p><p><em>Register </em><a href="https://github.com/contentco/quill-emoji" rel="noopener noreferrer" target="_blank"><em>Quill emoji module</em></a></p><p><br></p><p><em>Register </em><a href="https://github.com/NextBoy/quill-image-extend-module" rel="noopener noreferrer" target="_blank"><em>Quill image extend module</em></a></p>
        `,
      editorOption: {
        theme: 'snow',
        modules: {
          'emoji-shortname': true,
          'emoji-toolbar': true,
          'emoji-textarea': true,
          toolbar: '#toolbar'
          // toolbar: {
          //   container: [
          //     ['link', 'image', 'emoji']
          //   ],
          //   handlers: {
          //     image: function () {
          //       QuillWatch.emit(this.quill.id)
          //     }
          //   }
          // }
        }
      },
      ImageExtend: {
        loading: true,
        name: 'img',
        action: 'https://github.surmon.me/images/',
        response: (res) => {
          return testImageUrl
        }
      }
    }
  },
  methods: {
    addImageUrl () {
      const quill = this.$refs.myTextEditor.quill
      const range = quill.selection.savedRange
      quill.insertEmbed(range.index, 'image', this.imageUrl)
      this.imageUrl = ''
      this.popVisible = false
    },
    closePopover () {
      this.imageUrl = ''
      this.popVisible = false
    },
    codeBlock () {
      const quill = this.$refs.myTextEditor.quill
      const { index, length } = quill.selection.savedRange
      if (quill.getFormat()['code-block']) {
        quill.formatLine(index, length, 'code-block', false)
      } else {
        quill.formatLine(index, length, 'code-block', true)
      }
    }
  },
  filters: {
    setEmoji: function (msg) {
      msg = msg.replace('[smile]', `<img src=${require('@/assets/logo.png')} />`)
      return msg
    }
  }
}
</script>

<style lang="scss" scoped>
.example {
  display: flex;
  height: 20rem;
  .editor,
  .output {
    width: 50%;
    height: 100%;
  }
  $toolbar-height: 42px;
  .editor {
    padding-bottom: $toolbar-height;
  }
  .output {
    border: none;
    .title {
      height: $toolbar-height;
      line-height: $toolbar-height;
      padding-left: 0;
      border-bottom: 1px solid #ccc;
    }
    > code {
      width: 100%;
      margin: 0;
      padding: 1rem;
      border: 1px solid #ccc;
      border-top: none;
      border-left: none;
      border-radius: 0;
      height: 100%;
      overflow-y: auto;
    }
  }
}
</style>
