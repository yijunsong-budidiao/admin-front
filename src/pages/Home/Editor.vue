<template>
 <div>
     <h1>富文本编辑器</h1>
     <vue-wangeditor ref="editor" id="editor" style="width:100%;"></vue-wangeditor>
     <button @click="get">点击获取内容</button>
     <button @click="set">点击设置内容</button>
 </div>
</template>

<script>
// 导入vue-wangeditor
import vueWangeditor from 'vue-wangeditor';
export default {
    data(){
         return{
             content:`
                <div>
                    <h1>大标题</h1>
                </div>
             `
         }
    },
    created(){},
    methods:{
        get(){
            let editor = this.$refs.editor
            console.log(editor)
            console.log(editor.getHtml())
        },
        set(){
            this.$refs.editor.setHtml(this.content)
        }
    },
    components:{
        vueWangeditor
    }
}

</script>
<style>
#editor {
    width: 100%;
    height: 300px;
}
</style>