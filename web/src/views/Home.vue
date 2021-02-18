<template>
  <div>
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <img src="../assets/images/1.jpeg" class="w-100">
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/2.jpeg" class="w-100">
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/3.jpeg" class="w-100">
      </swiper-slide>
      
      <div class="swiper-pagination pagination-home" slot="pagination">        
      </div>
     </swiper>
    <!-- end of swiper -->
    <div class="entry-data px-2 bg-white ">
      <div class="entry-list ">
        <ul class="d-flex  ai-center flex-wrap">
          <li v-for="n in 10" :key="n" class="mb-2">
            <a class="text-center my-2" href="#">
             <i></i>
            <span class="fs-sm text-grey">爆料站</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- 展开和收起 -->
      <div class="entry-btn">
        <i></i>
        <span class="ml-2">收起</span>
      </div>

    </div>
    <!-- end of entry-data -->

   <!--  <div class="list">
      <span class="iconfont icon-menu text-black"></span>
      <span class="iconfont icon-icon_nav_hero"></span>
      <span class="iconfont icon-zu3649 text-black"></span>
    </div> -->

    <m-card title="新闻资讯" icon="icon-menu"> 
      <div class="card-body">
        <div class="nav d-flex jc-between mt-2 mb-3 text-primary">
          <div class="nav-item">热门</div>
          <div class="nav-item">新闻</div>
          <div class="nav-item">公告</div>
          <div class="nav-item">活动</div>
          <div class="nav-item">赛事</div>
        </div>
        <swiper>
          <swiper-slide v-for="n in 5" :key="n">
            <p class="mt-2">[新闻] | 致一起过峡谷的你  2020/2/17</p>
            <p class="mt-2">[新闻] | 致一起过峡谷的你  2020/2/17</p>
            <p class="mt-2">[新闻] | 致一起过峡谷的你  2020/2/17</p>
            <p class="mt-2">[新闻] | 致一起过峡谷的你  2020/2/17</p>
          </swiper-slide>
        </swiper>
      </div>
    </m-card> 
    <m-card title="英雄列表" icon="icon-menu"></m-card>
    <m-card title="精彩视频" icon="icon-menu"></m-card>
    <m-card title="啦啦啦" icon="icon-menu"></m-card>
  </div>
</template>
<script>
import MCard from '../components/MCard.vue'
  export default {
  components: { MCard },
    name: 'carrousel',
    data() {
      return {
        swiperOptions: {
          pagination: {
            el: '.pagination-home'
          },
          loop: true,
          autoplay: {
            delay: 100,
            stopOnLastSlide: false,
            disableOnInteraction: true,
          },
          // Some Swiper option/callback...
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    mounted() {
      console.log('Current Swiper instance object', this.swiper)
      // this.swiper.slideTo(1, 1000, false)
    }
  }
</script>

<style lang="scss" scoped>
@import '../assets/style/varibles.scss';
@import '../assets/iconfont/iconfont.css';

.entry-data {
  .entry-list {
    
    ul {
      list-style-type:none;
      li {
        width: 25%;
        height: 3.8462rem;
        display: block;
        a {
          height: 100%;
          display: block;
          line-height: 3rem;
          text-decoration: none;
          color: map-get($map: $colors, $key: grey);
          position: relative;
          span {
            display: inline-block;
            position: absolute;
            top: 1.2rem;
            left: 2.2rem;
          }
          i {
             display: inline-block;
             background: url('../assets/images/index.png') no-repeat ;
             background-position:  63.546% 15.517%;
             background-size: 28.8462rem;
             width: 2.3846rem;
             height: 1.9231rem;
          }
         
        }
      }
      
    }
    
  }
  .entry-btn {
    width: 100%;
    height: 2.3077rem;
    line-height: 2.3077rem;
    text-align: center;
    i {
      display: inline-block;
      background: url('../assets/images/index.png') no-repeat ;
      background-size: 28.8462rem;
      background-position: 38.577% 52.076%;
      width: 0.7692rem;
      height: 0.7692rem;
    }
  }
}


</style>