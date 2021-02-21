<template>
  <div>
    <div class="block">
      <span class="demonstration"></span>
      <el-carousel trigger="click" >
        <el-carousel-item v-for="item in imgURL" :key="item">
          <img :src="item.url" />
          <!-- <h1>{{ item.content }}</h1> -->
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- <div>
      <h2>{{ $stroe.state.counter }}</h2>
      <h2>{{ counter }}</h2>
      <button @click="increment">数据+1</button>
      <button @click="decrement">数据-1</button>
    </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgURL: [
        {
          url: require("../assets/images/001.jpg"),
          content:
            "世上曾有这么一种男子,从不执着商场错综复杂之事而忧心忡忡,从不一味痴迷小乔流水旁的花前月下不可自拔,也不曾羡慕同伴男子驰骋",
        },
        { url: require("../assets/images/002.png") },
        { url: require("../assets/images/005.jpg") },
        
      ],
      msg: [
        {
          id: 1,
          content:
            "世上曾有这么一种男子,从不执着商场错综复杂之事而忧心忡忡,从不一味痴迷小乔流水旁的花前月下不可自拔,也不曾羡慕同伴男子驰骋",
        },
        {
          id: 2,
          content:
            "世上曾有这么一种男子,从不执着商场错综复杂之事而忧心忡忡,从不一味痴迷小乔流水旁的花前月下不可自拔,也不曾羡慕同伴男子驰骋",
        },
        {
          id: 3,
          content:
            "世上曾有这么一种男子,从不执着商场错综复杂之事而忧心忡忡,从不一味痴迷小乔流水旁的花前月下不可自拔,也不曾羡慕同伴男子驰骋",
        },
      ],
    };
  },
  created: () => {},
//   computed: {
//     counter() {
//       return this.$store.state.counter;
//     },
//   },
//   methods: {
//     increment() {
//       this.$store.commit("increment");
//     },
//     decrement() {
//       this.$store.commit("decrement");
//     },
//   },
};
</script>
<style scope">
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>