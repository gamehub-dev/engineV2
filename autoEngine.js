// To start off
// link 'autoEngine.js' through your html file, make sure it is the first script that loads!!
// there will be instructions on how to use it next to whatever interest you.
// 
// you can also browse around this file to see its capabilities!
// hope this helps.


// to view engine version, type 'EngineVersion()' in the console.























// classes
class Engine_Player {
    constructor(x, y, vy, vxl, vxr, w, h, s, j, f, g, c, i, sob) {
        this.x = x;
        this.y = y;
        this.vy = vy;
        this.vxl = vxl;
        this.vxr = vxr;
        this.w = w;
        this.h = h;
        this.speed = s;
        this.jumpSpeed = j;
        this.mass = f;
        this.g = g;
        this.c = c;
        this.img = i;
        this.standingOnBorder = sob;
    }
}
let enginePlayer = new Engine_Player(100, 100, 0, 0, 0, 50, 50, 5, 15, 0.2, false, "black", false, false);


class CalcDistanceX {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
let pointA = new CalcDistanceX(0, 0)
let pointB = new CalcDistanceX(0, 0)


class CanvasBorder {
    constructor(w, c) {
        this.width = w
        this.colour = c
    }
}
let border = new CanvasBorder(3, 'black')


class Engine {
    constructor(p, g, b, bc, ox, oy, o, rc, c, is, tb, tt, tl, tr, bw, bbc, i, bcc) {
        this.playerMovement = p;
        this.gravity = g;
        this.borderWalls = b;
        this.borderCollision = bc;
        this.hideOverflowX = ox;
        this.hideOverflowY = oy;
        this.hideOverflow = o;
        this.removeCanvas = rc;
        this.collision = c;
        this.imgID = is;
        this.tuneBottom = tb;
        this.tuneTop = tt;
        this.tuneLeft = tl;
        this.tuneRight = tr;
        this.borderWidth = bw;
        this.borderColor = bbc;
        this.i = i;
        this.blockColor = bcc;
    }
}
let engine = new Engine(false, false, false, false, false, false, false, false, false, '', 0, 0, 0, 0, 2, 'black', 0, 'black')

// end of classes

// auto create canvas with 'canvas' as tag
// if not using canvas, removeCanvas = true
canv = document.createElement('canvas')
canv.id = 'canvas'
document.body.appendChild(canv)



const cl = console.log; // log text in the console
const ce = console.error // log an error
const cw = console.warn // log a warning
const ct = console.trace // trace something
const listen = addEventListener; // listen for an event
const canvas = document.getElementById('canvas'); // for ctx
const ctx = canvas.getContext('2d'); // for ctx
let bgc = 'white'; // change document background colour
const timeout = setTimeout; // create a timeout for an amount of time
let height = window.innerHeight; // the height of the document
let width = window.innerWidth; // the width of the document
const interval = setInterval; // create an interval
const doc = document;
const parse = parseInt;
function random(max, min) {
    rand = Math.floor(Math.random() * (max - min + 1)) + min
    return(rand)
}
const anim = requestAnimationFrame;
let mouseX = 0; // Access the mouseX position
let mouseY = 0; // Access the mouseY position
let title = document.title;
let calcDist = false;







// private variables (not to be changed or used) 
let DistanceX;
let DistanceY;
let engineBlocks = [];
engine.playerMovement = true;
// end

function engineBorderCol() {
    if (enginePlayer.x <= canvas.width - canvas.width + engine.tuneLeft) {
        enginePlayer.x = canvas.width - canvas.width + engine.tuneLeft;
    };
    if (enginePlayer.x + enginePlayer.w >= canvas.width - engine.tuneRight) {
        enginePlayer.x = canvas.width - enginePlayer.w - 1 - engine.tuneRight;
    };
    if (enginePlayer.y <= canvas.height - canvas.height + engine.tuneTop) {
        enginePlayer.y = canvas.height - canvas.height + engine.tuneTop;
    };
    if (enginePlayer.y + enginePlayer.h >= canvas.height - engine.tuneBottom) {
        enginePlayer.y = canvas.height - enginePlayer.h - engine.tuneBottom;
        enginePlayer.vy = 0;
        enginePlayer.g = true;
        enginePlayer.standingOnBorder = true;
    }else{enginePlayer.standingOnBorder = false};
};

function engineCollision() {
    let standingOnTop = false;
    for (let i = 0; i < engineBlocks.length; i++) {
        // when colliding with left face of cube
        if (enginePlayer.x + enginePlayer.w >= engineBlocks.at(i).x && enginePlayer.x < engineBlocks.at(i).x + engineBlocks.at(i).w - 30 && enginePlayer.y + enginePlayer.h > engineBlocks.at(i).y + 30 && enginePlayer.y < engineBlocks.at(i).y + engineBlocks.at(i).h - 30) { enginePlayer.x = engineBlocks.at(i).x - engineBlocks.at(i).w };
        // when colliding with right face of cube
        if (enginePlayer.x <= engineBlocks.at(i).x + engineBlocks.at(i).w && enginePlayer.x + enginePlayer.w > engineBlocks.at(i).x && enginePlayer.y + enginePlayer.h > engineBlocks.at(i).y + 30 && enginePlayer.y < engineBlocks.at(i).y + engineBlocks.at(i).h - 30) { enginePlayer.x = engineBlocks.at(i).x + engineBlocks.at(i).w };
        // when colliding with top face of cube
        if (enginePlayer.y + enginePlayer.h >= engineBlocks.at(i).y && enginePlayer.y < engineBlocks.at(i).y + engineBlocks.at(i).h - 30 && enginePlayer.x + enginePlayer.w > engineBlocks.at(i).x && enginePlayer.x < engineBlocks.at(i).x + engineBlocks.at(i).w) { enginePlayer.y = engineBlocks.at(i).y - engineBlocks.at(i).h; if (enginePlayer.g && engine.gravity) { enginePlayer.vy = 0 }; enginePlayer.g = true, standingOnTop = true } else if (!enginePlayer.standingOnBorder && !standingOnTop) { enginePlayer.g = false };
        // when colliding with bottom face of cube
        if (enginePlayer.y <= engineBlocks.at(i).y + engineBlocks.at(i).h && enginePlayer.y + enginePlayer.h > engineBlocks.at(i).y + 10 && enginePlayer.x + enginePlayer.w > engineBlocks.at(i).x && enginePlayer.x < engineBlocks.at(i).x + engineBlocks.at(i).w) { enginePlayer.y = engineBlocks.at(i).y + engineBlocks.at(i).h - 10; if (engine.gravity){enginePlayer.vy += 5 }else{enginePlayer.y = engineBlocks.at(i).y + engineBlocks.at(i).h}};
    };
};


// How to customize character:
// to resize the width and height, simply change the value (in your main.js) of enginePlayer.w (enginePlayer width) and/or enginePlayer.h (enginePlayer height).
// Default is 50 x 50;
// ============
// player movement
function AllowPlayerMovement() {
    if (engine.playerMovement) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        engineCollision()
        enginePlayer.x += enginePlayer.vxl
        enginePlayer.x += enginePlayer.vxr
        enginePlayer.y += enginePlayer.vy
        if (engine.borderCollision) {
            engineBorderCol()
        }
        if (engineBlocks.length >= 0){
            engineCollision()
            for (let i = 0; i < engineBlocks.length; i++){
                ctx.fillStyle = engine.blockColor;
                ctx.fillRect(engineBlocks.at(i).x, engineBlocks.at(i).y, engineBlocks.at(i).w, engineBlocks.at(i).h);
            }
        }
        ctx.fillStyle = enginePlayer.c
        ctx.fillRect(enginePlayer.x, enginePlayer.y, enginePlayer.w, enginePlayer.h)
    }
    anim(AllowPlayerMovement)
}
function AllowImgMovement() {
    if (engine.playerMovement) {
        engineCollision()
        enginePlayer.x += enginePlayer.vxl
        enginePlayer.x += enginePlayer.vxr
        enginePlayer.y += enginePlayer.vy
        if (engine.borderCollision) {
            engineBorderCol()
        }
        if (engine.imgID != ''){
        doc.getElementById(engine.imgID).style.left = enginePlayer.x + 'px'
        doc.getElementById(engine.imgID).style.top = enginePlayer.y + 'px'
    anim(AllowImgMovement)
        }else{
            ce("Please provide an ID for your player")
        }
    }
}
listen("keydown", function (e) {
    if (engine.playerMovement) {
        if (engine.gravity == false) {
            if (e.code == 'KeyW') enginePlayer.vy = -enginePlayer.speed;
            if (e.code == 'KeyS') enginePlayer.vy = enginePlayer.speed;
            if (e.code == 'KeyD') enginePlayer.vxr = enginePlayer.speed;
            if (e.code == 'KeyA') enginePlayer.vxl = -enginePlayer.speed;
        }
    }
})
listen("keydown", function (e) {
    if (engine.playerMovement) {
        if (engine.gravity) {
            if (enginePlayer.g) {
                if (e.code == 'KeyW') enginePlayer.vy = -enginePlayer.jumpSpeed, enginePlayer.g = false;
            }
            if (e.code == 'KeyD') enginePlayer.vxr = enginePlayer.speed;
            if (e.code == 'KeyA') enginePlayer.vxl = -enginePlayer.speed;
        }
    }
})
listen("keyup", function (e) {
    if (engine.playerMovement) {
        if (engine.gravity == false) {
            if (e.code == 'KeyW') enginePlayer.vy = 0;
            if (e.code == 'KeyS') enginePlayer.vy = 0;
            if (e.code == 'KeyD') enginePlayer.vxr = 0;
            if (e.code == 'KeyA') enginePlayer.vxl = 0;
        }
    }
})
listen("keyup", function (e) {
    if (engine.playerMovement) {
        if (engine.gravity) {
            if (e.code == 'KeyD') enginePlayer.vxr = 0;
            if (e.code == 'KeyA') enginePlayer.vxl = 0;
        }
    }
})
// end of charactor movement
listen("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
})
setInterval(function MainEngineInterval() {
    if (engine.hideOverflow) {
        document.body.style.overflow = 'hidden';
    }
    if (engine.hideOverflow == false) {
        document.body.style.overflow = '';
    }
    if (engine.hideOverflowX) {
        document.body.style.overflowX = 'hidden'
    }
    if (engine.hideOverflowX == false && document.body.style.overflow == false) {
        document.body.style.overflowX = ''
    }
    if (engine.hideOverflowY) {
        document.body.style.overflowY = 'hidden'
    }
    if (engine.hideOverflowY == false && document.body.style.overflow == false) {
        document.body.style.overflowY = ''
    }
    document.title = title
    if (engine.removeCanvas) {
        canvas.remove()
        engine.removeCanvas = false;
    }
    if (calcDist) {
        calcDist = false;
        DistanceX = pointB.x - pointA.x
        DistanceY = pointB.y - pointA.y
        if (DistanceX < -1) {
            DistanceX = pointA.x - pointB.x
        }
        if (DistanceY < -1) {
            DistanceY = pointA.y - pointA.y
        }
        cl("DistanceX From 'pointA.x' (" + pointA.x + ")" + " to 'pointBx.x' (" + pointB.x + ") is: " + DistanceX + "px")
        cl("===========")
        cl("DistanceY From 'pointA.y' (" + pointA.y + ")" + " to 'pointB.y' (" + pointB.y + ") is: " + DistanceY + "px")
    }
    doc.body.style.backgroundColor = bgc
    if (engine.borderWalls) {
        canvas.style.border = engine.borderWidth + 'px solid ' + engine.borderColor
    }
    if (engine.gravity) {
        if (enginePlayer.g == false) {
            enginePlayer.vy += enginePlayer.mass
        }
    }
    height = window.innerHeight; // the height of the document
    width = window.innerWidth; // the width of the document
})
function distanceX(x1, x2) {
    x2 = x2 - x1;
    return(x2)
}
function distanceY(y1, y2) {
    y2 = y2 - y1;
    return(y2)
}
function EngineVersion() {
    cl('The current Engine version that you have installed is:')
    cl('Version 2.3.2')
}
let tag;
function createElement(Element, ID, text){
    tag = document.createElement(Element);
    if (text != undefined) tag.innerHTML = text;
    tag.id = ID;
    document.body.appendChild(tag);
    document.getElementById(ID).style = "position:absolute;";
    document.getElementById(ID).style.left = "0px";
    document.getElementById(ID).style.top = "0px";
}

function cloneElement(ID) {
    engine.i++;
    let elem = document.querySelector("#" + ID);
    let clone = elem.cloneNode(true);
    clone.id = ID + engine.i;
    elem.after(clone);
}
function removeElement(ID){
    doc.getElementById(ID).remove()
}
function contains(stringOrVar, Includes) {
    let int = stringOrVar.toLowerCase()
    if (int.includes(Includes)) {
        return true;
    } else {
        return false;
    }
}
canvas.width = width - 30;
canvas.height = height - 30;
cl("autoEngine.js Loaded Succesfully");
cl("Built by using autoEngine.js");