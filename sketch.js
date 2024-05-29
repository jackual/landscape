let prefs = {
    p: 0,
    s: 0,
    u: 0,
    d: 0,
    pause: false
}

let cols

const cH = window.innerHeight,
  cW = window.innerWidth
function setup() {
  createCanvas(cW, cH)
  noLoop()
}

const pause = () => {
  if (!prefs.pause)
    prefs.pause = true
  else {
    prefs.pause = false
    gen()
  }
}

const hex = () => {
  navigator.clipboard.writeText(Array(5).fill().map((x,i) => {
    return chroma.mix(...cols, i/4, 'hsl').hex()
  }).toString())
}

const colList = [
    "#ca9bf7",
    "#ffb7ce",
    "#ff9899",
    "#ff694f",
    "#ff6961",
    "#cb99c9",
    "#c6a4a4",
    "#c1c6fc",
    "#bee7a5",
    "#bdb0d0",
    "#b39eb5",
    "#9adedb",
    "#99c5c4",
    "#89cff0"
]

//write about brain trying to see patterns and pictures that don't exist

function draw() {
  background(0)
  fill(random(0, 200))
  let x = 0, y = 0
  //let h = cH / random(4,20) original plan
  let w,h, wGen
    const reload = () => {
      h = random(10,40)
      if (prefs.p == 0)
        cols = [chroma.random(), chroma.random()]
      if (prefs.p == 1)
      cols = colList.sort(() => 0.5 - Math.random()).slice(0, 2)
     wGen = [random(10,50), random(10,200)]
    }
        reload()
  const gen = () => {
    noStroke()
    if (prefs.u)
        h = random(10,40)
    w = random(...wGen)
    if (prefs.p == 2)
      fill(random(0, 255),random(0,40),random(100, 255))
    else
      fill(chroma.mix(...cols, random(0,1), 'hsl').hex())
    rect(x - 1, y - 1, w + 1, h + 1)
    if (x > cW) x = 0, y = y + h
    else x = x + w
    let addTime = 1
    if (y > cH) {
      y = 0
      reload()
      addTime = 800
    }
    else if (prefs.d) y = y + h
    //happy accident ?? COOL EFFECT wot my braiin looks like
    if (!prefs.pause)
      setTimeout(gen, (prefs.s * 10) + addTime)
  }
  setTimeout(gen, (prefs.s * 10) + 1)
  //setInterval(gen, 2)
}

const h2 = () => {
    let menu = document.getElementById("box")
    if (!menu.classList.contains("show"))
        menu.classList.add("show")
    else
        menu.classList.remove("show")
    Object.entries(prefs)
        .map((a, b) => a[0] + a[1]).map(i => highlight(i))
}

const highlight = (x) => {
    Array(3).fill().map((_, i) => {
        let el = document.getElementById(x[0] + i)
        if (el)
            if (i == x[1])
                el.classList.add("active")
            else if (el.classList.contains("active"))
                el.classList.remove("active")
    })
}

onload = () => {
    const inputs = document.querySelectorAll(".sub li")
    inputs.forEach(input => {
        input.addEventListener('click', function () {
            prefs[this.id[0]] = this.id[1]
            highlight(this.id)
        })
    })
}