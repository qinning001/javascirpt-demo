function ajax(method, url, data) {
  return new Promise((resolve, reject) => {
    let xhr;
    method = method.toUpperCase();
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject("Microsoft.XMLHttp");
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status == 200) {
        resolve(xhr.responseText)
      } else if(xhr.readyState === 4) {
        reject(xhr)
      }
    };

    if (method == "GET") {
      var date = new Date(),
        timer = date.getTime();
      xhr.open("GET", url + "?" + data + "&timer" + timer, true);
      xhr.send();
    } else if (method == "POST") {
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(data);
    }
  });
}

export default () => {
  const url = "https://segmentfault.com/a/1190000038413073"
  ajax("get", url).then(res => {
    console.log(res);
  }, err => {
    console.log(err);
  })
};
