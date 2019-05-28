function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

// 搜索任务
export async function serachTask(params) {
  return fetch('/dev/testSearch', {
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
    method: 'POST',
    body: JSON.stringify({
      ...params,
      method: 'query',
    }),
  }).then(response => {
    return response.json();
  });
}
// 删除便签
export async function delNote(params) {
  return fetch('/dev/testNote', {
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
    method: 'POST',
    body: JSON.stringify({
      ...params,
      method: 'del',
    }),
  }).then(response => {
    return response.json();
  });
};
// 添加便签
export async function addNote(params) {
  return fetch('/dev/testNote', {
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
    method: 'POST',
    body: JSON.stringify({
      ...params,
      method: 'add',
    }),
    // JSON.stringify(params),
  }).then(response => {
    return response.json();
  });
};
// 删除项目
export async function delProject(params) {
  return fetch('/dev/testProject', {
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
    method: 'POST',
    body: JSON.stringify({
      ...params,
      method: 'del',
    }),
  }).then(response => {
    return response.json();
  });
};
// 添加项目
export async function addProject(params) {
  return fetch('/dev/testProject', {
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
    method: 'POST',
    body: JSON.stringify({
      ...params,
      method: 'add',
    }),
  }).then(response => {
    return response.json();
  });
};
// 删除位置
export async function delPosition(params) {
  return fetch('/dev/testPosition', {
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
    method: 'POST',
    body: JSON.stringify({
      ...params,
      method: 'del',
    }),
  }).then(response => {
    return response.json();
  });
};
// 添加位置
export async function addPosition(params) {
  return fetch('/dev/testPosition', {
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
    method: 'POST',
    body: JSON.stringify({
      ...params,
      method: 'add',
    }),
  }).then(response => {
    return response.json();
  });
};
// 删除标签
export async function delTag(params) {
  return fetch('/dev/testTag', {
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
    method: 'POST',
    body: JSON.stringify({
      ...params,
      method: 'del',
    }),
  }).then(response => {
    return response.json();
  });
};
// 添加标签
export async function addTag(params) {
  return fetch('/dev/testTag', {
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
    method: 'POST',
    body: JSON.stringify({
      ...params,
      method: 'add',
    }),
  }).then(response => {
    return response.json();
  });
};

export async function delTask(params) {
  return fetch('/dev/testTask', {
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
    method: 'POST',
    body: JSON.stringify({
      ...params,
      method: 'del',
    }),
  }).then(response => {
    return response.json();
  });
};
export async function queryTask(params) {
  return fetch('/dev/testTask', {
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
    method: 'POST',
    body: JSON.stringify({
      ...params,
      method: 'query',
    }),
  }).then(response => {
    return response.json();
  });
};
export async function addTask(params) {
  return fetch('/dev/testTask', {
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
    method: 'POST',
    body: JSON.stringify({
      ...params,
      method: 'add',
    }),
  }).then(response => {
    return response.json();
  });
};
export async function updateTask(params) {
  return fetch('/dev/testTask', {
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
    method: 'POST',
    body: JSON.stringify({
      ...params,
      method: 'update',
    }),
  }).then(response => {
    return response.json();
  });
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export async function request(url, options) {
  const response = await fetch(url, options);
  checkStatus(response);
  return await response.json();
};