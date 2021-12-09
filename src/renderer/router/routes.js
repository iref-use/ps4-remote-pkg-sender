function loadTemplate(pre='', page=''){
    // return () => import(__dirname + '/../pages/' + pre + page).then(m => m.default || m)
    return () => import('@/pages/' + pre + page).then(m => m.default || m)
}

function loadLayout(pre='', page=''){
    // return () => import(__dirname + '/../pages/' + pre + page).then(m => m.default || m)
    return () => import('@/layout/' + pre + page).then(m => m.default || m)
}

function loadPage(page){
    return loadTemplate('', page)
}

function loadError(page){
    return loadTemplate('errors/', page)
}

export default [
  // Default Layout
  {
      path: '/', redirect: 'home', component: loadLayout('DefaultLayout'),
      children: [
          { path: '/home', name: 'home', component: loadPage('Index') },
          { path: '/config', name: 'config', component: loadPage('Config') },
          { path: '/server', name: 'server', component: loadPage('Server') },
          { path: '/settings', name: 'settings', component: loadPage('Settings') },
          { path: '/changelog', name: 'changelog', component: loadPage('Changelog') },
      ]
  },

  // Full Layout
  {
      path: '/', component: loadLayout('FullLayout'),
      children: [
          {
              path: 'info', name: 'info', component: loadPage('Info')
          },
      ]
  },

  // Error handling
  {
    path: '/:catchAll(.*)', name: 'NotFound', component: loadPage('404'),
  }
]
