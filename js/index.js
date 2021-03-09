var app = new Vue({
  el: '#app',
  data: {
    player: player
  },
  methods: {
    inc: function (event) {
    this.player.fractals += 1;
    }
  }
})
