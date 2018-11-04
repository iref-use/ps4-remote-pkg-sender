const express = require('express');
const app = express();
const server = require('http').createServer(app);
server.listen(jQuery('#portNumber').val());
var shell = require('electron').shell;
const torrentClient = new WebTorrent();

var files = [];
var queue = [];
const Config = require('electron-config');
const config = new Config();
let ps4ip = config.get('ps4ip');
if (typeof ps4ip !== 'undefined') {
  jQuery('#PS4IP').val(ps4ip);
}
function getNetWorkInterfaces() {
  let os = require('os');
  let ifaces = [];
  Object.keys(os.networkInterfaces()).forEach(function (ifname) {
    var alias = 0;
    os.networkInterfaces()[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        return;
      }

      if (alias >= 1) {
        ifaces.push({
          title: `${ifname}-${alias}:${iface.address}`,
          ip: iface.address
        });
      } else {
        ifaces.push({
          title: `${ifname}: ${iface.address}`,
          ip: iface.address
        });
      }
      ++alias;
    });
  });
  return ifaces;
}
getNetWorkInterfaces().forEach(function (iface) {
  jQuery('#localIP').append('<option value="' + iface.ip + '">' + iface.title + '</option>');
});

jQuery('#changePort').on('click', function () {
    server.close();
    server.listen(jQuery('#portNumber').val());
    jQuery('.files').html('');
    if (files.length) {
      Array.from(files).forEach(function (file) {
        let niceFileName = file.name.replace(/[^a-zA-Z0-9-_.]/g, '');
        jQuery('.files').append(`${file.name} <a href="http://${document.querySelector('#localIP').value}:${jQuery('#portNumber').val()}/${niceFileName}">Test (Open in browser)</a></br>`);
      });
    }
});

jQuery('#PS4IP').on('change', function () {
  config.set('ps4ip', jQuery(this).val());
});

jQuery('#filePicker').on('change', function (ev) {
  files = ev.currentTarget.files;
  if (files.length) {
    let html = '';
    Array.from(files).forEach(function (file) {
      let niceFileName = file.name.replace(/[^a-zA-Z0-9-_.]/g, '');
      html += `${file.name} <a class="testFile" href="http://${document.querySelector('#localIP').value}:${jQuery('#portNumber').val()}/${niceFileName}">Test (Open in browser)</a></br>`;
      app.get(`/${niceFileName}`, function(request, response){
        response.status(200).download(file.path, niceFileName);
      });
    });
    jQuery('.files').html(html);
    jQuery('#send').removeAttr('disabled');
  } else {
    jQuery('.files').html('');
    jQuery('#send').attr('disabled', 'disabled');
  }
});

jQuery(document).on('click', '.testFile', function(event) {
  event.preventDefault();
  shell.openExternal(this.href);
});

jQuery('#send').on('click', function (ev) {
  jQuery(this).attr('disabled', 'disabled');
  Array.from(files).forEach(function (file) {
    let niceFileName = file.name.replace(/[^a-zA-Z0-9-_.]/g, '');
    queue.push({
      "type": "direct",
      "packages": [`http://${document.querySelector('#localIP').value}:${jQuery('#portNumber').val()}/${niceFileName}`]
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
          jQuery('#send').removeAttribute('disabled');
          return;
        }
        data = JSON.parse(data);
        if (data.status === 'success') {
          jQuery('.tasks').append(`<div data-task-id="${data.task_id}">${data.task_id}: ${data.title} <a href="#" class="check_task">Check</a> <a href="#" class="pause_task">Pause</a> <a href="#" class="resume_task">Resume</a> <a href="#" class="remove_task">Remove</a></div>`);
          jQuery('#log').val(function(i, text) {
            return text + JSON.stringify(data) + "\n";
          });
          setTimeout(function () {
            worker(queue);
          }, 2500);
        }
      });
    } else {
      jQuery('#send').removeAttr('disabled');
    }
  })(queue);
});

jQuery('#sendTorrent').on('click', function () {
  let torrentId = jQuery('#magnetLink').val();
  torrentClient.add(torrentId, function (torrent) {
    var torrentServ = torrent.createServer();
    torrentServ.listen(jQuery('#torrentPortNumber').val());
    torrent.files.forEach(function (file, index) {
      queue.push({
        "type": "direct",
        "packages": [`http://${document.querySelector('#localIP').value}:${jQuery('#torrentPortNumber').val()}/${index}/${file.name}`]
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
            jQuery('#send').removeAttribute('disabled');
            return;
          }
          data = JSON.parse(data);
          if (data.status === 'success') {
            jQuery('.tasks').append(`<div data-task-id="${data.task_id}">${data.task_id}: ${data.title} <a href="#" class="check_task">Check</a> <a href="#" class="pause_task">Pause</a> <a href="#" class="resume_task">Resume</a> <a href="#" class="remove_task">Remove</a></div>`);
            jQuery('#log').val(function(i, text) {
              return text + JSON.stringify(data) + "\n";
            });
            setTimeout(function () {
              worker(queue);
            }, 2500);
          }
        });
      }
    })(queue);
  });
});

jQuery(document).on('click', '.check_task', function () {
  let taskId = jQuery(this).parents('div:first').attr('data-task-id');
  let data = JSON.stringify({"task_id":parseInt(taskId)});
  fetch(`http://${document.querySelector('#PS4IP').value}:12800/api/get_task_progress`, {
    method: 'post',
    body: data
  }).then(function(res) {
    return res.text();
  }).then(function (resData) {
    jQuery('#log').val(function(i, text) {
      return text + JSON.stringify(resData) + "\n";
    });
  });
});

jQuery(document).on('click', '.pause_task', function () {
  let taskId = jQuery(this).parents('div:first').attr('data-task-id');
  let data = JSON.stringify({"task_id":parseInt(taskId)});
  fetch(`http://${document.querySelector('#PS4IP').value}:12800/api/pause_task`, {
    method: 'post',
    body: data
  }).then(function(res) {
    return res.text();
  }).then(function (resData) {
    jQuery('#log').val(function(i, text) {
      return text + JSON.stringify(resData) + "\n";
    });
  });
});

jQuery(document).on('click', '.resume_task', function () {
  let taskId = jQuery(this).parents('div:first').attr('data-task-id');
  let data = JSON.stringify({"task_id":parseInt(taskId)});
  fetch(`http://${document.querySelector('#PS4IP').value}:12800/api/resume_task`, {
    method: 'post',
    body: data
  }).then(function(res) {
    return res.text();
  }).then(function (resData) {
    jQuery('#log').val(function(i, text) {
      return text + JSON.stringify(resData) + "\n";
    });
  });
});

jQuery(document).on('click', '.remove_task', function () {
  let taskId = jQuery(this).parents('div:first').attr('data-task-id');
  let data = JSON.stringify({"task_id":parseInt(taskId)});
  fetch(`http://${document.querySelector('#PS4IP').value}:12800/api/unregister_task`, {
    method: 'post',
    body: data
  }).then(function(res) {
    return res.text();
  }).then(function (resData) {
    jQuery('#log').val(function(i, text) {
      return text + JSON.stringify(resData) + "\n";
    });
  });
  jQuery(this).parents('div:first').remove();
});