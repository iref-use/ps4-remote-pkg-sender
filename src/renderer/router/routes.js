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
          { path: 'home', name: 'home', component: loadPage('Index') },
          { path: 'config', name: 'config', component: loadPage('Config') },
          { path: 'hb-store', name: 'hb-store', component: loadPage('HBStore') },
          { path: 'server', name: 'server', component: loadPage('Server') },
          { path: 'settings', name: 'settings', component: loadPage('Settings') },
          { path: 'changelog', name: 'changelog', component: loadPage('Changelog') },
          { path: 'downloads', name: 'download', component: loadPage('Download') },
          { path: 'user', name: 'user', component: loadPage('User') },
      ]
  },

  // Full Layout
  {
      path: '/', component: loadLayout('FullLayout'),
      children: [
          { path: 'window.loader', name: 'window.loader', component: loadPage('WindowLoader') },
          { path: 'info', name: 'info', component: loadPage('Info') },
          { path: 'app/server', name: 'server.app', component: loadPage('app/Server') },
          { path: 'ps4', name: 'ps4', component: loadPage('ps4/Index') },
      ]
  },

  // Error handling
  {
    path: '/:catchAll(.*)', name: 'NotFound', component: loadPage('404'),
  }
]
