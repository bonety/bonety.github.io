var app = new Vue({
    el: '#app',
    data: {
      message: '1'
    }
  })

  //this should work in github page too
var app2 = new Vue({
    el: '#app-2',
    data: {
      message: 'You loaded this page on ' + new Date().toLocaleString()
    }
  })