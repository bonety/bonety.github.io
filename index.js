var app = new Vue({
    el: '#app',
    data: {
      fractals: 0
    },
    methods: {
        inc: function (event) {
        this.fractals += 1;
        }
    }
  })
