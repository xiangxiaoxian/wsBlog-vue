<template>
  <div class="blog_makdown">
      <h1>请编辑你的内容：</h1>
      <mavon-editor v-moudle="value"/> 
      <p>编辑器的相关使用方法：
          <!-- <ul>
              <li>加粗 Ctrl + B </li>
              <li>斜体 Ctrl + I</li>
              <li>引用 Ctrl + Q</li>
              <li>插入链接 Ctrl + L</li>
              <li>插入代码 Ctrl + K</li>
              <li>插入图片 Ctrl + G</li>
              <li>提升标题 Ctrl + H</li>
              <li>有序列表 Ctrl + O</li>
              <li>无序列表 Ctrl + U</li>
              <li>横线 Ctrl + R</li>
              <li>撤销 Ctrl + Z</li>
              <li>重做 Ctrl + Y</li>
          </ul> -->
          


          </p>   
  </div>
</template>

<script>
  export default {
      data(){
          return{
              value:'',
              defaultData:'preview'
          };
      },
  };
</script>

<style scoped>

</style>
