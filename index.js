var app = new Vue({
    el: '#app',
    data: {
      fractals: 0
    },
    // define methods under the `methods` object
    methods: {
        inc: function (event) {
        this.fractals += 1;
        }
    }
  })
