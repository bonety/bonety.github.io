var app = new Vue({
  el: '#app',
  data: {
    player: player
  },
  methods: {
    inc: function (event) {
    this.player.fractals += 1;
    this.draw(this.player.fractals);
    },
    draw: function (a = this.player.fractals) {
      var canvas = document.getElementById("fractalDraw");
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect(a,a,a,a);
        b = a;
        if (b > 150){
          b = 300 - a;
        }
        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect(20 + b, 20 + a, 20 + b , 20 + b);
      }
    }
  },
  created: function () {
    var canvas = document.getElementById("fractalDraw");
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
  
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect(10, 10, 55, 50);
        console.log("HEHEH");
        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect(30, 30, 55, 50);
      }
  }
})
