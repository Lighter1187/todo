import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'note', ...(require('D:/学习/React/todo/src/models/note.js').default) });
app.model({ namespace: 'position', ...(require('D:/学习/React/todo/src/models/position.js').default) });
app.model({ namespace: 'project', ...(require('D:/学习/React/todo/src/models/project.js').default) });
app.model({ namespace: 'search', ...(require('D:/学习/React/todo/src/models/search.js').default) });
app.model({ namespace: 'tag', ...(require('D:/学习/React/todo/src/models/tag.js').default) });
app.model({ namespace: 'task', ...(require('D:/学习/React/todo/src/models/task.js').default) });
