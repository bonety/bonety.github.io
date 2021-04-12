var generators = []
var lastUpdate = Date.now()

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

function updateGUI() {
    document.getElementById("currency").textContent = "You have " + format(this.player.fractals) + " fractals"
    for (let i = 0; i < 5; i++) {

        let g = generators[i]
        document.getElementById("gen" + (i + 1)).innerHTML = "Amount: " + format(g.amount) + "<br>Bought: " + g.bought + "<br>Mult: " + format(g.mult) + "<br>Cost: " + format(g.cost)
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

    lastUpdate = Date.now()
}

setInterval(mainLoop, 50)

updateGUI()