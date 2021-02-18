<template>
  <div>
   <div class="topBar">
     <div class="home-top bg-dark d-flex  pl-3 pt-3 pr-4 ">
       <div class="logo d-flex flex-1 ">
         <img class="mr-3" src="../assets/logo.png">
         <div class="logo-title text-white  " >
           <p class="m-0 fs-lg mb-1">王者荣耀</p>
           <p class="m-0 fs-xs text-grey">团队成就更多</p>
         </div>
       </div>
       <div class="download">
         <button class="bg-primary text-dark fs-xxs">立即下载</button>
       </div>
     </div>
     <div class="nav-link d-flex jc-around ai-center pl-2 pr-2
       bg-primary text-white fs-md">

       <div class="nav-item active pb-1">
         <router-link tag='div' to="/">主页</router-link>
       </div>
       <div class="nav-item  pb-1">
         <router-link tag='div' to="/">攻略中心</router-link>
       </div>
       <div class="nav-item  pb-1">
         <router-link tag='div' to="/">赛事中心</router-link>
       </div>
       <div class="nav-item  pb-1">
         <router-link tag='div' to="/">IP新游</router-link>
       </div>
     </div>
   </div>
   <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
.topBar {
 
  .home-top {
    height: 4rem;
    position: sticky;
    top:0;
    z-index: 1000;
    img {
      width: 2.2rem;
      height: 2.2rem;
    }
    .download {
      button {
        width: 4.7rem;
        height: 2rem;
        border: none;
        border-radius: 0.25rem;
      }
    }
  }
  .nav-link {
    height: 3rem;
    .nav-item {
      border-bottom: 2px solid transparent;
      &.active {
        border-bottom: 2px solid white;
      }
     
    }
    
  }
}
</style>