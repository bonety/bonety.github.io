var generators = []
var lastUpdate = Date.now()
var quality = 0

for (let i = 0; i < 5; i++) {
    let generator = {
        cost: Math.pow(Math.pow(10, i), i) * 10,
        bought: 0,
        amount: 0,
        mult: 1
    }
    generators.push(generator)
}

function format(amount) {
    let power = Math.floor(Math.log10(amount))
    let mantissa = amount / Math.pow(10, power)
    if (power < 3) return amount.toFixed(2)
    return mantissa.toFixed(2) + "e" + power
}

function buyGenerator(i) {
    let g = generators[i - 1]
    let test = this.player.fractals
    if (g.cost > this.player.fractals) return
    this.player.fractals -= g.cost
    test = this.player.fractals
    g.amount += 1
    g.bought += 1
    g.mult *= 1.05
    g.cost *= 1.5

}

function draw() {
    var canvas = document.getElementById("fractalDraw");
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      // Coordinates of the shape's points 
      const shape = [
        { x: 250, y: 50 },
        { x: 450, y: 450 },
        { x: 50, y: 450 },
      ];
      let perTick = 0
      //how many points get drawn
      for (i = 0; i < 5; i++){
        let g = generators[i]
        perTick += g.amount

      }
      quality =  Math.round(perTick / 10)
      value = 1 + Math.round((quality  * quality) / 3)
      document.getElementById("quality").textContent = "Your fractal has a quality of " + quality + " giving you " + value + " fractals per button click!"

      // Coordinates of a random point
      let point = {
        x: Math.round(Math.random() * 500),
        y: Math.round(Math.random() * 500),
      };

      // How many points we've drawn so far
      let count = 0;

      while (count < perTick / 10 && count < 10000) {
        // Pick a random number: 0, 1, or 2
        let rand = Math.floor(Math.random() * shape.length);

        // Select a corner based on the random number
        let corner = shape[rand];

        //draw random background color
        ctx.fillStyle = "rgba(0, 0, 200, 0.8)";
        ctx.fillRect(Math.round(Math.random() * 500), Math.round(Math.random() * 500), 1, 1);
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(Math.round(Math.random() * 500), Math.round(Math.random() * 500), 1, 1);

        // Compute coordinates, midway between 'point' and 'corner'
        point.x = (point.x + corner.x) / 2;
        point.y = (point.y + corner.y) / 2;

        // Draw the new point
        ctx.fillStyle = "rgba(200,0,0)";
        ctx.fillRect(point.x, point.y, 1, 1);

        // Increment 'count', once it reaches 15000 we stop the loop
        count++;
      }
      
    }
  }

function updateGUI() {
    document.getElementById("currency").textContent = "You have " + format(this.player.fractals) + " fractals"
    for (let i = 0; i < 5; i++) {

        let g = generators[i]
        document.getElementById("gen" + (i + 1)).innerHTML = "Amount: " + format(g.amount) + " Bought: " + g.bought + " Mult: " + format(g.mult) + " Cost: " + format(g.cost)
        if (g.cost > this.player.fractals) document.getElementById("gen" + (i + 1)).classList.add("locked")
        else document.getElementById("gen" + (i + 1)).classList.remove("locked")
    }
}

function productionLoop(diff) {
    this.player.fractals += generators[0].amount * generators[0].mult * diff
    for (let i = 1; i <5; i++) {
        generators[i - 1].amount += generators[i].amount * generators[i].mult * diff / 5
    }
}

function mainLoop() {
    var diff = (Date.now() - lastUpdate) / 1000

    productionLoop(diff)
    updateGUI()
    draw()
    lastUpdate = Date.now()
}

setInterval(mainLoop, 50)

updateGUI()