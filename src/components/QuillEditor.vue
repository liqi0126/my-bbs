<template>
  <div>
    <quill-editor
      ref="myTextEditor"
      class="editor"
      v-model="content"
      :options="editorOption"
      @change="onEditorChange($event)"
    >
      <div :id="id" slot="toolbar">
        <span class="ql-formats">
          <button class="bold" @click="setBold">
            <svg viewBox="0 0 18 18">
              <path
                class="ql-stroke"
                d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"
              />
              <path
                class="ql-stroke"
                d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"
              />
            </svg>
          </button>

          <button class="italic" @click="setItalic">
            <svg viewBox="0 0 18 18">
              <line class="ql-stroke" x1="7" x2="13" y1="4" y2="4" />
              <line class="ql-stroke" x1="5" x2="11" y1="14" y2="14" />
              <line class="ql-stroke" x1="8" x2="10" y1="14" y2="4" />
            </svg>
          </button>

          <button class="underline" @click="setUnderline">
            <svg viewBox="0 0 18 18">
              <path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3" />
              <rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15" />
            </svg>
          </button>

          <button class="strike" @click="setStrike">
            <svg viewBox="0 0 18 18">
              <line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5" />
              <path
                class="ql-fill"
                d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"
              />
              <path
                class="ql-fill"
                d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"
              />
            </svg>
          </button>
        </span>

        <span class="ql-formats">
          <Emoji @addEmoji="addEmoji"></Emoji>
        </span>

        <span class="ql-formats">
          <button class="script" value="sub" @click="setSubScript">
            <svg viewBox="0 0 18 18">
              <path
                class="ql-fill"
                d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"
              />
              <path
                class="ql-fill"
                d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"
              />
            </svg>
          </button>

          <button class="ql-script" value="super">
            <svg viewBox="0 0 18 18">
              <path
                class="ql-fill"
                d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"
              />
              <path
                class="ql-fill"
                d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"
              />
            </svg>
          </button>
        </span>

        <span class="ql-formats">
          <button class="header" value="1" @click="setHeaderLevelOne">
            <svg viewBox="0 0 18 18">
              <path
                class="ql-fill"
                d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"
              />
            </svg>
          </button>

          <button class="header" value="2" @click="setHeaderLevelTwo">
            <svg viewBox="0 0 18 18">
              <path
                class="ql-fill"
                d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"
              />
            </svg>
          </button>
        </span>

        <span class="ql-formats">
          <button class="ql-indent" value="-1" @click="indentMinusOne">
            <svg viewBox="0 0 18 18">
              <path
                class="ql-fill"
                d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"
              />
              <path
                class="ql-fill"
                d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"
              />
            </svg>
          </button>

          <button class="indent" value="+1" @click="indentPlusOne">
            <svg viewBox="0 0 18 18">
              <line class="ql-stroke" x1="3" x2="15" y1="14" y2="14" />
              <line class="ql-stroke" x1="3" x2="15" y1="4" y2="4" />
              <line class="ql-stroke" x1="9" x2="15" y1="9" y2="9" />
              <polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7" />
            </svg>
          </button>

          <select class="ql-align"></select>
        </span>

        <span class="ql-formats">
          <button class="list" value="ordered" @click="setOrderedList">
            <svg viewBox="0 0 18 18">
              <line class="ql-stroke" x1="7" x2="15" y1="4" y2="4" />
              <line class="ql-stroke" x1="7" x2="15" y1="9" y2="9" />
              <line class="ql-stroke" x1="7" x2="15" y1="14" y2="14" />
              <line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5" />
              <path
                class="ql-fill"
                d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"
              />
              <path
                class="ql-stroke ql-thin"
                d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"
              />
              <path
                class="ql-stroke ql-thin"
                d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"
              />
            </svg>
          </button>

          <button class="list" value="bullet" @click="setBulletList">
            <svg viewBox="0 0 18 18">
              <line class="ql-stroke" x1="6" x2="15" y1="4" y2="4" />
              <line class="ql-stroke" x1="6" x2="15" y1="9" y2="9" />
              <line class="ql-stroke" x1="6" x2="15" y1="14" y2="14" />
              <line class="ql-stroke" x1="3" x2="3" y1="4" y2="4" />
              <line class="ql-stroke" x1="3" x2="3" y1="9" y2="9" />
              <line class="ql-stroke" x1="3" x2="3" y1="14" y2="14" />
            </svg>
          </button>
        </span>

        <span class="ql-formats">
          <select class="ql-size">
            <option value="small"></option>
            <option value="normal" selected></option>
            <option value="large"></option>
            <option value="huge"></option>
          </select>
        </span>

        <span class="ql-formats">
          <button class="ql-image"></button>
          <el-popover ref="popover" placement="top" width="400" v-model="imagePopVisible">
            <el-button class="image-url" slot="reference" icon="el-icon-upload" />
            <el-input v-model="imageUrl" placeholder="请输入图片URL"></el-input>
            <div style="text-align:center;margin-top:10px">
              <el-button type="success" icon="el-icon-check" round @click="addImageUrl"></el-button>
              <el-button type="danger" icon="el-icon-delete" round @click="closeImagePopover"></el-button>
            </div>
          </el-popover>
        </span>

        <span class="ql-formats">
          <select class="ql-color"></select>
          <select class="ql-background"></select>
        </span>

        <span class="ql-formats">
          <button class="ql-blockquote"></button>
          <el-button @click="setCodeBlock">
            <svg viewBox="0 0 18 18">
              <polyline class="ql-even ql-stroke" points="5 7 3 9 5 11" />
              <polyline class="ql-even ql-stroke" points="13 7 15 9 13 11" />
              <line class="ql-stroke" x1="10" x2="8" y1="5" y2="13" />
            </svg>
          </el-button>

          <el-popover ref="popover" placement="top" width="400" v-model="codePopVisible">
            <el-button slot="reference" icon="el-icon-edit-outline"></el-button>
            <el-input type="textarea" autosize placeholder="请输入代码" v-model="code"></el-input>
            <div style="text-align:center;margin-top:10px">
              <el-button type="success" icon="el-icon-check" round @click="addCode"></el-button>
              <el-button type="danger" icon="el-icon-delete" round @click="closeCodePopover"></el-button>
            </div>
          </el-popover>
        </span>
      </div>
    </quill-editor>
  </div>
</template>

<script>
import Emoji from '@/components/Emoji'

export default {
  props: ['id'],
  components: {
    Emoji
  },
  // name: 'quill-example-register-modules',
  // title: 'Register modules',
  data () {
    return {
      imagePopVisible: false,
      codePopVisible: false,
      code: '',
      imageUrl: '',
      content: '',
      editorOption: {
        theme: 'snow',
        modules: {
          toolbar: '#' + this.id
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
        },
        placeholder: '在这里编写帖子内容',
        syntax: true
      }
    }
  },
  computed: {
    editor () {
      return this.$refs.myTextEditor.quillEditor
    }
  },
  methods: {
    onEditorChange (editor) {
      this.content = editor.html
    },
    setBold () {
      const quill = this.$refs.myTextEditor.quill
      if (quill.getFormat().bold) {
        quill.format('bold', false)
      } else {
        quill.format('bold', true)
      }
    },
    setItalic () {
      const quill = this.$refs.myTextEditor.quill
      if (quill.getFormat().italic) {
        quill.format('italic', false)
      } else {
        quill.format('italic', true)
      }
    },
    setUnderline () {
      const quill = this.$refs.myTextEditor.quill
      if (quill.getFormat().underline) {
        quill.format('underline', false)
      } else {
        quill.format('underline', true)
      }
    },

    setStrike () {
      const quill = this.$refs.myTextEditor.quill
      if (quill.getFormat().strike) {
        quill.format('strike', false)
      } else {
        quill.format('strike', true)
      }
    },

    setSubScript () {
      const quill = this.$refs.myTextEditor.quill
      if (quill.getFormat().script !== 'sub') {
        quill.format('script', 'sub')
      } else {
        quill.format('script', '')
      }
    },
    setSuperScript () {
      const quill = this.$refs.myTextEditor.quill
      if (quill.getFormat().script !== 'super') {
        quill.format('script', 'super')
      } else {
        quill.format('script', '')
      }
    },

    addEmoji (emoji) {
      const quill = this.$refs.myTextEditor.quill
      const range = quill.selection.savedRange
      quill.insertText(range.index, emoji)
    },

    addImageUrl () {
      const quill = this.$refs.myTextEditor.quill
      const range = quill.selection.savedRange
      // quill.insertEmbed(range.index, 'image', this.imageUrl)
      this.content += `<img src=${this.imageUrl} />`
      this.imageUrl = ''
      this.imagePopVisible = false
    },

    addCode () {
      const quill = this.$refs.myTextEditor.quill
      const range = quill.selection.savedRange
      this.content += '<pre>' + this.code + '</pre>'
      this.code = ''
      this.codePopVisible = false
    },

    setHeaderLevelOne () {
      const quill = this.$refs.myTextEditor.quill
      const { index, length } = quill.selection.savedRange
      if (quill.getFormat().header !== 1) {
        quill.formatLine(index, length, 'header', 1)
      } else {
        quill.formatLine(index, length, 'header', 0)
      }
    },
    setHeaderLevelTwo () {
      const quill = this.$refs.myTextEditor.quill
      const { index, length } = quill.selection.savedRange
      if (quill.getFormat().header !== 2) {
        quill.formatLine(index, length, 'header', 2)
      } else {
        quill.formatLine(index, length, 'header', 0)
      }
    },

    indentMinusOne () {
      const quill = this.$refs.myTextEditor.quill
      const { index, length } = quill.selection.savedRange
      if (quill.getFormat().indent) {
        quill.formatLine(index, length, 'indent', quill.getFormat().indent - 1)
      }
    },
    indentPlusOne () {
      const quill = this.$refs.myTextEditor.quill
      const { index, length } = quill.selection.savedRange
      if (quill.getFormat().indent) {
        quill.formatLine(index, length, 'indent', quill.getFormat().indent + 1)
      } else {
        quill.formatLine(index, length, 'indent', 1)
      }
    },

    setOrderedList () {
      const quill = this.$refs.myTextEditor.quill
      const { index, length } = quill.selection.savedRange
      if (quill.getFormat().list !== 'ordered') {
        quill.formatLine(index, length, 'list', 'ordered')
      } else {
        quill.formatLine(index, length, 'list', '')
      }
    },

    setBulletList () {
      const quill = this.$refs.myTextEditor.quill
      const { index, length } = quill.selection.savedRange
      if (quill.getFormat().list !== 'bullet') {
        quill.formatLine(index, length, 'list', 'bullet')
      } else {
        quill.formatLine(index, length, 'list', '')
      }
    },

    setCodeBlock () {
      const quill = this.$refs.myTextEditor.quill
      const { index, length } = quill.selection.savedRange
      if (quill.getFormat()['code-block']) {
        quill.formatLine(index, length, 'code-block', false)
      } else {
        quill.formatLine(index, length, 'code-block', true)
      }
    },

    closeImagePopover () {
      this.imageUrl = ''
      this.imagePopVisible = false
    },

    closeCodePopover () {
      this.code = ''
      this.codePopVisible = false
    }
  }
}
</script>

<style lang="scss">
.editor {
  line-height: normal !important;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 80px;
  max-width: 900px;
  height: 200px;

  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: "14px";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
    content: "10px";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
    content: "18px";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
    content: "32px";
  }
}
</style>
