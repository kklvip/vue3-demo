import { createRouter, createWebHashHistory } from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// import HomePage from '../views/Index.vue'
import Login from '../views/forward/login/index.vue'
import error404 from '../views/errorpage/404.vue'
import Weblayout from  "@/components/Webout/index.vue"
import Empty from  "@/components/empty.vue"
import Layout from "@/components/Layout"
// import video from "@/components/video/index.vue"


const routes = [
  {
    path: '',
    name: 'index',
    component: Weblayout,
    children:[{
      path:'/home',
      name:'index',
      component: _import('Home'),
      hidden:false,
      meta:{title:"首页"}
    },
    {
      path:'/',
      name:'home',
      component: _import('Home'),
      hidden:false,
      meta:{title:"首页"}
    }]
  },
  {
    path: '/404',
    name: '', 
    component: Weblayout,
    children:[{
      path:'',
      name:'404',
      component: error404,
      hidden:false,
      meta:{title:"404"}
    }],
  },
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Weblayout,
  //   children:[{
  //     path:'/',
  //     name:'home',
  //     component: _import('Home'),
  //     hidden:false,
  //     meta:{title:"首页"}
  //   }]
  // },
  {
    path: '/test',
    name: '', 
    component: Empty,
    children:[{
      path:'',
      name:'test',
      component: _import('test'),
      hidden:false,
      meta:{title:"测试界面"}
    }]
  },
  //活动
  {
    path: '/active',
    name: '', 
    component: Empty,
    children:[{
      path:'',
      name:'active',
      component: _import('active'),
      hidden:false,
      meta:{title:"博客"}
    }]
  },
  //活动
  {
    path: '/active2',
    name: '', 
    component: Empty,
    children:[{
      path:'',
      name:'active2',
      component: _import('active2'),
      hidden:false,
      meta:{title:"博客"}
    }]
  },
  //宝贝
  {
    path: '/baobao',
    name: '', 
    component: Empty,
    children:[{
      path:'',
      name:'baobei',
      component: _import('demo/baby'),
      hidden:false,
      meta:{title:"宝贝"}
    }]
  },
  //修改密码
  {
    path: '/modifyPwd',
    name: '', 
    component: Empty,
    children:[{
      path:'',
      name:'modifyPwd',
      component: _import('forward/login/modifyPwd'),
      hidden:false,
      meta:{title:"修改密码"}
    }]
  },
//前端博客
  {
    path: '/blog',
    name: '', 
    component: Weblayout,
    children:[{
      path:'',
      name:'blogs',
      component: _import('blog'),
      hidden:false,
      meta:{title:"博客"}
    },
    {
      path:'detail',
      name:'blogDetail',
      component: _import('blogDetail'),
      hidden:false,
      meta:{title:"博客详情"}
    }]
  },
  //前端电影
  {
    path: '/movie',
    name: '', 
    component: Weblayout,
    children:[{
      path:'',
      name:'movies',
      component: _import('forward/movie/list'),
      hidden:false,
      meta:{title:"电影"}
    },
    {
      path:'detail',
      name:'movieDetail',
      // component:video,
      component: _import('forward/movie/detail'),
      hidden:false,
      meta:{title:"电影详情"}
    }]
  },
  //前端软件
  {
    path: '/soft',
    name: '', 
    component: Weblayout,
    children:[{
      path:'',
      name:'softs',
      component: _import('Soft'),
      hidden:false,
      meta:{title:"软件"}
    },
    {
      path:'detail',
      name:'softDeatil',
      component: _import('softDetail'),
      hidden:false,
      meta:{title:"软件详情"}
    }]
  },
  //前端笔记
  {
    path: '/note',
    name: '',
    component: Weblayout,
    children:[{
      path:'',
      name:'notes',
      component: _import('Note'),
      hidden:false,
      meta:{title:"笔记"}
    },
    {
      path:'detail',
      name:'noteDetail',
      component: _import('noteDetail'),
      hidden:false,
      meta:{title:"笔记详情"}
    }]
  },
  //前端关于
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  //登录
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  //后台banner
  {
    path: '',name: 'admin',
    component: Layout,
    meta: {title: 'banner管理'},
    alwaysShow: true,
    children: [
      {
        path: '/banner/list',
        name: 'adminbanner',
        component: _import('admin/banner/list'),
        hidden: false,
        meta: {title: 'banner列表'}
      },
      {
        path: '/banner/add',
        name: 'bannerAdd',
        component: _import('admin/banner/edit'),
        hidden: false,
        meta: {title: 'banner添加'}
      },
      {
        path: '/banner/edit',
        name: 'bannerEdit',
        component: _import('admin/banner/edit'),
        hidden: false,
        meta: {title: 'banner编辑'}
      },
    ]
  },
  //后台BLOG
  {
    path: '',name: 'blog',
    component: Layout,
    meta: {title: 'Blog管理'},
    alwaysShow: true,
    children: [{
      path: '/blog/list',
      name: 'blogList',
      component: _import('admin/blog/list'),
      hidden: false,
      meta: {title: 'blog列表'}
    },
    {
      path: '/blog/add',
      name: 'blogAdd',
      component: _import('admin/blog/edit'),
      hidden: false,
      meta: {title: '博客添加'}
    },
    {
      path: '/blog/edit',
      name: 'blogEdit',
      component: _import('admin/blog/edit'),
      hidden: false,
      meta: {title: '博客编辑'}
    },
    {
      path: '/blog/classity',
      name: 'blogType',
      component: _import('admin/blog/type'),
      hidden: false,
      meta: {title: 'blog分类管理'}
    }]
  },
  //后台NOTE
  {
    path: '',name: 'NOTE',
    component: Layout,
    meta: {title: 'Note管理'},
    alwaysShow: true,
    children: [{
      path: '/note/list',
      name: 'noteList',
      component: _import('admin/note/list'),
      hidden: false,
      meta: {title: 'note列表'}
    },
    {
      path: '/note/add',
      name: 'noteAdd',
      component: _import('admin/note/edit'),
      hidden: false,
      meta: {title: '博客添加'}
    },
    {
      path: '/note/edit',
      name: 'noteEdit',
      component: _import('admin/note/edit'),
      hidden: false,
      meta: {title: '博客编辑'}
    },
    {
      path: '/note/classity',
      name: 'noteType',
      component: _import('admin/note/type'),
      hidden: false,
      meta: {title: 'note分类管理'}
    }]
  },
    //后台软件
    {
      path: '',name: 'SOFT',
      component: Layout,
      meta: {title: '软件管理'},
      alwaysShow: true,
      children: [{
        path: '/soft/list',
        name: 'softList',
        component: _import('admin/soft/list'),
        hidden: false,
        meta: {title: '软件列表'}
      },
      {
        path: '/soft/add',
        name: 'softAdd',
        component: _import('admin/soft/edit'),
        hidden: false,
        meta: {title: '软件添加'}
      },
      {
        path: '/soft/edit',
        name: 'softEdit',
        component: _import('admin/soft/edit'),
        hidden: false,
        meta: {title: '博客编辑'}
      },
      {
        path: '/soft/classity',
        name: 'softType',
        component: _import('admin/soft/type'),
        hidden: false,
        meta: {title: '软件分类管理'}
      }]
    },
  //后台roles
  {
    path: '',name: 'roles',
    component: Layout,
    meta: {title: '角色管理'},
    alwaysShow: true,
    children: [{
      path: '/roles/list',
      name: 'rolesList',
      component: _import('admin/roles/list'),
      hidden: false,
      meta: {title: 'roles列表'}
    },
    {
      path: '/roles/add',
      name: 'rolesAdd',
      component: _import('admin/roles/edit'),
      hidden: false,
      meta: {title: '角色添加'}
    },
    {
      path: '/roles/edit',
      name: 'rolesEdit',
      component: _import('admin/roles/edit'),
      hidden: false,
      meta: {title: '角色编辑'}
    },
    {
      path: '/roles/menu',
      name: 'rolesMenu',
      component: _import('admin/roles/menu'),
      hidden: false,
      meta: {title: '角色关联菜单'}
    }]
  },
  //后台用户列表
  {
    path: '',name: 'customer',
    component: Layout,
    meta: {title: '用户管理'},
    alwaysShow: true,
    children: [{
      path: '/customer/list',
      name: 'customerList',
      component: _import('admin/customer/list'),
      hidden: false,
      meta: {title: 'customer列表'}
    },
    {
      path: '/customer/add',
      name: 'customerAdd',
      component: _import('admin/customer/edit'),
      hidden: false,
      meta: {title: '用户添加'}
    },
    {
      path: '/customer/edit',
      name: 'customerEdit',
      component: _import('admin/customer/edit'),
      hidden: false,
      meta: {title: '用户编辑'}
    }]
  },
  //后台菜单列表
  {
    path: '',name: 'menus',
    component: Layout,
    meta: {title: '菜单管理'},
    alwaysShow: true,
    children: [{
      path: '/menus/admin/list',
      name: 'menusadminList',
      component: _import('admin/menus/list'),
      hidden: false,
      meta: {title: '后端菜单列表'}
    },
    {
      path: '/menus/front/list',
      name: 'menusList',
      component: _import('admin/menus/front'),
      hidden: false,
      meta: {title: '首页菜单列表'}
    },
    {
      path: '/menus/add',
      name: 'menusAdd',
      component: _import('admin/menus/edit'),
      hidden: false,
      meta: {title: '菜单添加'}
    },
    {
      path: '/menus/edit',
      name: 'menusEdit',
      component: _import('admin/menus/edit'),
      hidden: false,
      meta: {title: '菜单编辑'}
    }]
  },
  //后台电影列表
  {
    path: '',name: 'movie',
    component: Layout,
    meta: {title: '电影管理'},
    alwaysShow: true,
    children: [{
      path: '/movie/list',
      name: 'moviesadminList',
      component: _import('admin/movie/list'),
      hidden: false,
      meta: {title: '后端视频列表'}
    },
    {
      path: '/movie/classity',
      name: 'movieClassityList',
      component: _import('admin/movie/classitylist'),
      hidden: false,
      meta: {title: '视频分类列表'}
    },
    {
      path: '/movie/add',
      name: 'movieAdd',
      component: _import('admin/movie/edit'),
      hidden: false,
      meta: {title: '视频添加'}
    },
    {
      path: '/movie/edit',
      name: 'movieEdit',
      component: _import('admin/movie/edit'),
      hidden: false,
      meta: {title: '视频编辑'}
    }]
  },
  //个人中心
  {
    path: '',name: 'user',
    component: Layout,
    meta: {title: '个人中心'},
    alwaysShow: true,
    children: [{
      path: '/user/info',
      name: 'userInfo',
      component: _import('admin/user/index'),
      hidden: false,
      meta: {title: '个人中心'}
    }]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
