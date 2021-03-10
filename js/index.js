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

        // Coordinates of the shape's points 
        const shape = [
          { x: 250, y: 50 },
          { x: 450, y: 450 },
          { x: 50, y: 450 },
        ];
        
        // Coordinates of a random point
        let point = {
          x: Math.round(Math.random() * 500),
          y: Math.round(Math.random() * 500),
        };

        // How many points we've drawn so far
        let count = 0;

        while (count < 15000) {
          // Pick a random number: 0, 1, or 2
          let rand = Math.floor(Math.random() * shape.length);

          // Select a corner based on the random number
          let corner = shape[rand];

          // Compute coordinates, midway between 'point' and 'corner'
          point.x = (point.x + corner.x) / 2;
          point.y = (point.y + corner.y) / 2;

          // Draw the new point
          ctx.fillStyle = "rgba(200,0,0)";
          ctx.fillRect(point.x, point.y, 1, 1);
          ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
          ctx.fillRect(point.x + a, point.y + a, 1, 1);

          // Increment 'count', once it reaches 15000 we stop the loop
          count++;
        }
        
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
