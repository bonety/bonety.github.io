var generators = []
var lastUpdate = Date.now()
var quality = 0
var value = 1
var tickCounter = 0
var chargeStatus = 100
let best = 0
let perSec = 0
let shiftCost = Math.pow(10,35)
let stopper = {
  cost: Math.pow(Math.pow(10, 1), 2) * 10,
  bought: 0,
  amount: 0,
}
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
    if (g.bought % 10 == 0) g.mult *= 2
    g.mult *= 1.05
    g.cost *= 1.5
}

function buyInterpolation() {
    let s = stopper
    let test = this.player.fractals
    if (s.bought == 25 ) return
    if (s.cost > this.player.fractals) return
    this.player.fractals -= s.cost
    s.bought += 1
    s.amount += 20
    s.cost *= 12
    
}

function chargeBar() {
    var elem = document.getElementById("chargeBar")
    elem.style.width = chargeStatus + "%"

}

function valueCalculation(diff) {
  if (perSec > best) best = perSec
  
  
  // upgrades of interpolation determine the speed of the recharge of the bar
  t_hold = (510 - stopper.amount)
  let buffer = diff * 20
  if (buffer > 10) tickCounter += 20
  tickCounter += 1
  if (tickCounter >= t_hold) {
    tickCounter = 0
    if (chargeStatus != 100) chargeStatus += (5)
  } 
  if (chargeStatus > 100) chargeStatus = 100

  if (quality == 0) value = 1
  else {
    let Pre_value = 1 + ((((quality * quality * chargeStatus) / 3) / 100) * chargeStatus)
    let loga = Math.round(Math.log10(Pre_value))
    let logPercent = (loga / 100) * chargeStatus
    value = Math.pow(10, logPercent)
  }

}

function fractalShift() {
  if (shiftCost > this.player.fractals) return
  alert("You reached the end of this game. The game won't reset for now but you reached a nice goal. Yay you're a true grinder!");
  return
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

      //Quality gets calculated here
      quality =  Math.round(perTick / 10)

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

        let animation = 0

        //draw random background color
        
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(Math.round(Math.random() * 500), Math.round(Math.random() * 500), 1, 1);

        // gives a sort of animation late game

        if ( perTick > 1000000000000000 ) {
          // Compute coordinates, midway between 'point' and 'corner'
          point.x = (point.x + corner.x) / 2;
          point.y = (point.y + corner.y) / 2;
          animation = 1
          ctx.fillStyle = "rgba(0, 0, 200, 0.8)";
          ctx.fillRect(point.x, point.y, 1, 1);
        }
        else {
          ctx.fillStyle = "rgba(0, 0, 200, 0.8)";
          ctx.fillRect(Math.round(Math.random() * 500), Math.round(Math.random() * 500), 1, 1);
        }
        
        if ( perTick > 15 && animation == 0) {
          // Compute coordinates, midway between 'point' and 'corner'
          point.x = (point.x + corner.x) / 2;
          point.y = (point.y + corner.y) / 2;
        }
        

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
    document.getElementById("perSec").textContent = "You generate " + format(perSec) + " fractals per second"
    document.getElementById("quality").textContent = "Your fractal has a quality of " + format(quality) + " giving you " + format(value) + " fractals per button click also depending on the chargebar under the button!"
    for (let i = 0; i < 5; i++) {

        let g = generators[i]
        document.getElementById("gen" + (i + 1)).innerHTML = "Amount: " + format(g.amount) + " Bought: " + g.bought + " Mult: " + format(g.mult) + " Cost: " + format(g.cost)
        if (g.cost > this.player.fractals) document.getElementById("gen" + (i + 1)).classList.add("locked")
        else document.getElementById("gen" + (i + 1)).classList.remove("locked")
    }
    document.getElementById("inter").innerHTML = " Cost: " + format(stopper.cost)
    document.getElementById("interText").innerHTML = "Interpolation - " + stopper.bought + "/25 - Makes the chargebar recharge quicker"
    if (stopper.cost > this.player.fractals) document.getElementById("inter").classList.add("locked")
    else document.getElementById("inter").classList.remove("locked")
    if (stopper.bought == 25) document.getElementById("inter").classList.add("locked")
    if (shiftCost > this.player.fractals) document.getElementById("shift").classList.add("locked")
    else document.getElementById("shift").classList.remove("locked")
}

function productionLoop(diff) {
    this.player.fractals += generators[0].amount * generators[0].mult * diff
    perSec = (generators[0].amount * generators[0].mult * 0.05) * 20
    for (let i = 1; i <5; i++) {
        generators[i - 1].amount += generators[i].amount * generators[i].mult * diff / 5
    }
}

function mainLoop() {
    var diff = (Date.now() - lastUpdate) / 1000

    productionLoop(diff)
    updateGUI()
    draw()
    valueCalculation(diff)
    chargeBar()
    lastUpdate = Date.now()
}

setInterval(mainLoop, 50)

updateGUI()