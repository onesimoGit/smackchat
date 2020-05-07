
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AuthPage.vue') },
      { path: '/chat/:blablabla', component: () => import('pages/ChatPage.vue') },
      { path: '/auth', component: () => import('pages/AuthPage.vue') },
      { path: '/users', component: () => import('pages/UserPage.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
