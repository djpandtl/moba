<template>
 <el-container style="height: 500px; border: 1px solid #eee">
  <el-aside width="200px" 
    style="background-color: rgb(238, 241, 246);overflow-x: hidden">
    <el-menu router :default-openeds="defaultOpened" 
      unique-opened default-active="$route.path">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-document"></i>内容管理</template>

         <el-menu-item-group>
          <template slot="title" >物品</template>
          <el-menu-item index="/items/create">新建物品</el-menu-item>
          <el-menu-item index="/items/list">分类物品</el-menu-item>
        </el-menu-item-group>

         <el-menu-item-group>
          <template slot="title" >英雄</template>
          <el-menu-item index="/heros/create">新建英雄</el-menu-item>
          <el-menu-item index="/heros/list">分类英雄</el-menu-item>
        </el-menu-item-group>

         <el-menu-item-group>
          <template slot="title" >文章</template>
          <el-menu-item index="/articles/create">新建文章</el-menu-item>
          <el-menu-item index="/articles/list">文章列表</el-menu-item>
        </el-menu-item-group>

      </el-submenu>

      <el-submenu index="2">
        <template slot="title"><i class="el-icon-document"></i>运营管理</template>

          <el-menu-item-group>
          <template slot="title" >广告位</template>
          <el-menu-item index="/ads/create">新建广告位</el-menu-item>
          <el-menu-item index="/ads/list">广告位列表</el-menu-item>
        </el-menu-item-group>

      </el-submenu>

       <el-submenu index="3">
        <template slot="title"><i class="el-icon-document"></i>系统设置</template>
        <el-menu-item-group>
          <template slot="title" >分类</template>
          <el-menu-item index="/categories/create">新建分类</el-menu-item>
          <el-menu-item index="/categories/list">分类列表</el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group>
          <template slot="title" >管理员</template>
          <el-menu-item index="/admin_user/create">新建管理员</el-menu-item>
          <el-menu-item index="/admin_user/list">管理员列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>djping</span>
    </el-header>
    
    <el-main>
     <router-view :key="$route.fullPath"></router-view>
    </el-main>
  </el-container>
 </el-container>
</template>
<script>
export default {
  data() {
    return {
      defaultOpened: ['1'], // 解决打开其他菜单会跟着打开第一个的问题
    }
  },
  created() {
    this.path = this.$route.path
    console.log('$route path', this.path)
  },
  watch: {
    path(val) {
      console.log('new path', val)
    }
  }
}
</script>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

