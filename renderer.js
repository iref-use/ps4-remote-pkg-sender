const express = require('express');
const server = express();
server.listen(9999);

var files = [];
var queue = [];

document.querySelector('input[type="file"]').addEventListener('change', function (ev) {
  files = ev.currentTarget.files;
  if (files.length) {
    let html = '';
    Array.from(files).forEach(function (file) {
      html += `${file.path}</br>`;
      server.get(`/${file.name.replace(/ /gi, '_')}`, function(request, response){
        response.status(200).download(file.path, file.name.replace(/ /gi, '_'));
      });
    });
    document.querySelector('.files').innerHTML = html;
    document.querySelector('input[type="button"]').removeAttribute('disabled');
  } else {
    document.querySelector('.files').innerHTML = '';
    document.querySelector('input[type="button"]').setAttribute('disabled', 'disabled');
  }
});

document.querySelector('input[type="button"]').addEventListener('click', function (ev) {
  document.querySelector('input[type="button"]').setAttribute('disabled', 'disabled');
  Array.from(files).forEach(function (file) {
    queue.push({
      "type": "direct",
      "packages": [`http://${document.querySelector('#localIP').value}:9999/${file.name.replace(/ /gi, '_')}`]
    });
  });
  (function worker(queue) {
    if (queue.length) {
      let req = queue.shift();
      fetch(`http://${document.querySelector('#PS4IP').value}:12800/api/install`, {
        method: 'post',
        body: JSON.stringify(req)
      }).then(function(res) {
        return res.text();
      }).then(function (data) {
        if (data.indexOf('fail') > -1) {
          alert('FAILED JSON: ' + JSON.stringify(req));
          queue = [];
          document.querySelector('input[type="button"]').removeAttribute('disabled');
          return;
        }
        data = JSON.parse(data);
        if (data.status === 'success') {
          setTimeout(function () {
            worker(queue);
          }, 2000);
        }
      });
    } else {
      document.querySelector('input[type="button"]').removeAttribute('disabled');
    }
  })(queue);
});