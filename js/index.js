var app = new Vue({
  el: '#app',
  data: {
    player: player
  },
  methods: {
    inc: function (event) {
    this.player.fractals += value;
    if (chargeStatus != 0) chargeStatus -= 5;
    if (chargeStatus < 0) chargeStatus = 0;
    //this.draw(this.player.fractals);
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
