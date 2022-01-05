/*
    Autoload all current vue files as component and register them by their name.
    ---
    Author: Gkiokan Sali
    Date: 2019-05-09
*/

import Vue from 'vue'

const requireContext = require.context('./', false, /.*\.vue$/)
const layouts = requireContext.keys()
  .map(file =>
    [file.replace(/(^.\/)|(\.vue$)/g, ''), requireContext(file)]
  )
  .reduce((components, [name, component]) => {
    let Component = component.default || component
    Vue.component(Component.name, Component)
  }, {})
