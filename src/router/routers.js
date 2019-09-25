import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/mpp',
    name: '消息推送中心',
    meta: {
      icon: 'ios-text',
      title: '消息推送中心'
    },
    component: Main,
    children: [
      {
        path: 'level_2_1',
        name: '分类管理',
        meta: {
          icon: 'ios-copy',
          title: '分类管理'
        },
        component: () => import('@/view/mpp/category/category.vue')
      },
      {
        path: 'publish',
        name: '发布管理',
        meta: {
          icon: 'md-funnel',
          title: '发布管理'
        },
        component: parentView,
        children: [
          {
            path: 'add',
            name: '消息发布',
            meta: {
              icon: 'md-funnel',
              title: '消息发布'
            },
            component: () => import('@/view/mpp/publish/add.vue')
          },
          {
            path: 'todo',
            name: '待处理列表',
            meta: {
              icon: 'md-funnel',
              title: '待处理列表'
            },
            component: () => import('@/view/mpp/publish/todo.vue')
          }, {
            path: 'list',
            name: '发布查询',
            meta: {
              icon: 'md-funnel',
              title: '发布查询'
            },
            component: () => import('@/view/mpp/publish/list.vue')
          }, {
            path: 'message_list',
            name: '消息查询',
            meta: {
              icon: 'md-funnel',
              title: '消息查询'
            },
            component: () => import('@/view/mpp/publish/list.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/auth',
    name: '权限引擎',
    meta: {
      icon: 'ios-text',
      title: '权限引擎'
    },
    component: Main,
    children: [
      {
        path: 'policy',
        name: '权限策略',
        meta: {
          icon: 'ios-copy',
          title: 'policy'
        },
        component: () => import('@/view/auth/policy/list.vue')
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  {
    path: '/gateway',
    name: '服务网关',
    meta: {
      icon: 'md-planet',
      title: '服务网关'
    },
    component: Main,
    children: [
      {
        path: 'route_list',
        name: '服务路由',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '服务路由'
        },
        component: () => import('@/view/test/test.vue')
      },
      {
        path: 'count_to_page',
        name: '服务编排',
        meta: {
          icon: 'md-trending-up',
          title: '服务编排'
        },
        component: () => import('@/view/components/count-to/count-to.vue')
      },
      {
        path: 'drag_list_page',
        name: '分析监控',
        meta: {
          icon: 'ios-infinite',
          title: '分析监控'
        },
        component: () => import('@/view/components/drag-list/drag-list.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: '系统设置',
    meta: {
      icon: 'ios-hammer',
      title: '系统设置'
    },
    component: Main,
    children: [
      {
        path: 'dict_manage',
        name: '字典管理',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '字典管理'
        },
        component: () => import('@/view/components/tree-select/index.vue')
      },
      {
        path: 'auth_manage',
        name: '权限管理',
        meta: {
          icon: 'md-trending-up',
          title: '权限管理'
        },
        component: () => import('@/view/components/count-to/count-to.vue')
      },
      {
        path: 'tenant_manage',
        name: '租户管理',
        meta: {
          icon: 'ios-infinite',
          title: '租户管理'
        },
        component: () => import('@/view/components/drag-list/drag-list.vue')
      }
    ]
  },
  {
    path: '/error_logger',
    name: 'error_logger',
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'error_logger_page',
        name: 'error_logger_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集'
        },
        component: () => import('@/view/single-page/error-logger.vue')
      }
    ]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `{{ query }}-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
