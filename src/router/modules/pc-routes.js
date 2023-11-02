export default [
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    name: 'main',
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/main/index.vue')
      }
    ]
  }
]
