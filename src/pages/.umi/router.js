import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/",
    "component": require('../../layouts/BaseLayout').default,
    "routes": [
      {
        "path": "/",
        "component": require('../task/Task').default,
        "exact": true
      },
      {
        "path": "/task",
        "component": require('../task/Task').default,
        "exact": true
      },
      {
        "path": "/note",
        "component": require('../note/Note').default,
        "exact": true
      },
      {
        "path": "/project",
        "component": require('../project/Project').default,
        "exact": true
      },
      {
        "path": "/tag",
        "component": require('../tag/Tag').default,
        "exact": true
      },
      {
        "path": "/position",
        "component": require('../position/Position').default,
        "exact": true
      },
      {
        "path": "/search",
        "component": require('../search/SearchText').default,
        "exact": true
      },
      {
        "component": () => React.createElement(require('D:/学习/React/todo/node_modules/_umi-build-dev@1.2.8@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('D:/学习/React/todo/node_modules/_umi-build-dev@1.2.8@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

export default function() {
  return (
<Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
