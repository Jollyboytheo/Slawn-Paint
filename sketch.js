let pageState = "paintWindowState"; // Intial page state
let blankButton, clownButton, carButton, houseButton;
let paintWindow;
let currentTool = "pencil";
let currentColor = "black";
let icon;
let logo;
let clown;
let car;
let house;
let toolIcons = {};

// create a variable to store whether initial canvas is drawn for each folder
let clownDrawn = false;
let carDrawn = false;
let houseDrawn = false;
let blankDrawn = false;

const AVAILABLE_TOOLS = [
  "eraser",
  "paint",
  "pencil",
  "brush",
  "spray",
  "line",
  "rect",
  "circle",
];

const WEB_COLORS = [
  "black",
  "gray",
  "maroon",
  "olive",
  "green",
  "teal",
  "navy",
  "purple",
  "darkkhaki",
  "darkgreen",
  "dodgerblue",
  "royalblue",
  "blueviolet",
  "brown",
  "white",
  "silver",
  "red",
  "yellow",
  "lime",
  "aqua",
  "blue",
  "fuchsia",
  "moccasin",
  "springgreen",
  "aqua",
  "lightsteelblue",
  "deeppink",
  "orange",
];

function preload() {
  icon = loadImage("images/icon.png");
  logo = loadImage("images/SlawnC.png");
  clown = loadImage("images/Amy.png");
  car = loadImage("images/Bully.png");
  house = loadImage("images/Ice.png");
  AVAILABLE_TOOLS.forEach((tool) => {
    toolIcons[tool] = [
      loadImage(`images/${tool}.png`),
      loadImage(`images/${tool}-on.png`),
    ];
  });
}

const MARGIN = 2;
const PADDING = 5;
const ICON_SIZE = 16;
const TITLEBAR_H = 20;
const TOOLBAR_W = 76;
const PALETTE_H = 72;
const CANVAS_GAP = 28;
const TOOLBAR_BUTTON_SIZE = 32;
const PALETTE_BUTTON_SIZE = 24;

class PaintWindow {
  constructor(x, y, w, h, title) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.title = title;
    this.visible = true;

    this.closeButton = new Button(
      this.x + this.w - ICON_SIZE - MARGIN * 2,
      this.y + MARGIN * 2,
      ICON_SIZE,
      ICON_SIZE,
      "x",
      () => {
        //this.visible = false;
        drawHomePage();
        print("hello");
      }
    );

    this.toolbar = new Toolbar(
      this.x + MARGIN,
      this.y + TITLEBAR_H + MARGIN * 2,
      TOOLBAR_W,
      h - PALETTE_H - TITLEBAR_H
    );

    this.palette = new Palette(
      this.x + MARGIN,
      this.y + this.h - PALETTE_H - MARGIN,
      this.w - MARGIN * 2,
      PALETTE_H
    );

    this.canvas = new Canvas(
      this.x + TOOLBAR_W + PADDING * 2,
      this.y + TITLEBAR_H + PADDING * 2,
      this.w - TOOLBAR_W - CANVAS_GAP,
      this.h - PALETTE_H - TITLEBAR_H - CANVAS_GAP
    );
  }

  draw() {
    if (!this.visible) return;

    // Basic grey background

    fill("lightgrey");

    stroke("black");
    rect(this.x, this.y, this.w, this.h);

    // Draw all our components
    this.drawTitleBar();
    this.closeButton.draw();

    // Draw darker canvas background

    fill(225, 227, 223); //This affects the landing page color
    //noStroke();

    rect(
      this.x + TOOLBAR_W + PADDING / 2 - 50,
      this.y + TITLEBAR_H + MARGIN + PADDING * 5,
      this.w - TOOLBAR_W - PADDING * 15 + 100,
      this.h - PALETTE_H - TITLEBAR_H - PADDING - MARGIN
    );
  }

  drawTitleBar() {
    fill("darkblue");
    rect(
      this.x + PADDING / 2,
      this.y + PADDING / 2,
      this.w - PADDING,
      TITLEBAR_H
    );

    // Draw the icon on the title bar
    image(icon, this.x + MARGIN * 2, this.y + MARGIN * 2, ICON_SIZE, ICON_SIZE);

    // Window title
    fill("white");
    noStroke();
    textSize(18);
    textAlign(LEFT, CENTER);
    textFont("Courier New");
    textStyle(BOLD);
    const x = this.x + ICON_SIZE + MARGIN * 5;
    const y = this.y + TITLEBAR_H - PADDING * 1.5;
    text(this.title, x, y);
  }

  mousePressed(paintWindow) {
    this.closeButton.mousePressed(paintWindow);
  }

  mouseDragged(mx, my) {}

  mouseReleased() {
    //pageState = "paintWindowState";
  }
}

class PaintWindow2 {
  constructor(x, y, w, h, title) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.title = title;
    this.visible = true;

    this.closeButton = new Button(
      this.x + this.w - ICON_SIZE - MARGIN * 2,
      this.y + MARGIN * 2,
      ICON_SIZE,
      ICON_SIZE,
      "x",
      () => {
        //this.visible = false;
        drawHomePage();
        clownDrawn = false;
        carDrawn = false;
        houseDrawn = false;
        blankDrawn = false;
      }
    );

    this.toolbar = new Toolbar(
      this.x + MARGIN,
      this.y + TITLEBAR_H + MARGIN * 2,
      TOOLBAR_W,
      h - PALETTE_H - TITLEBAR_H
    );

    this.palette = new Palette(
      this.x + MARGIN,
      this.y + this.h - PALETTE_H - MARGIN,
      this.w - MARGIN * 2,
      PALETTE_H
    );

    this.canvas = new Canvas(
      this.x + TOOLBAR_W + PADDING * 2,
      this.y + TITLEBAR_H + PADDING * 2,
      this.w - TOOLBAR_W - CANVAS_GAP,
      this.h - PALETTE_H - TITLEBAR_H - CANVAS_GAP
    );
  }

  draw() {
    if (!this.visible) return;

    // Basic grey background
    fill("lightgrey");
    stroke("black");
    rect(this.x, this.y, this.w, this.h);

    // Draw all our components
    this.drawTitleBar();
    this.closeButton.draw();
    this.toolbar.draw();
    this.palette.draw();

    // Draw darker canvas background
    fill("dimgray");
    noStroke();
    rect(
      this.x + TOOLBAR_W + PADDING / 2,
      this.y + TITLEBAR_H + MARGIN + PADDING / 2,
      this.w - TOOLBAR_W - PADDING,
      this.h - PALETTE_H - TITLEBAR_H - PADDING - MARGIN
    );

    this.canvas.display();
  }

  drawTitleBar() {
    fill("darkblue");
    rect(
      this.x + PADDING / 2,
      this.y + PADDING / 2,
      this.w - PADDING,
      TITLEBAR_H
    );

    // Draw the icon on the title bar
    image(icon, this.x + MARGIN * 2, this.y + MARGIN * 2, ICON_SIZE, ICON_SIZE);

    // Window title
    fill("white");
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    textFont("Courier New");
    textStyle(BOLD);
    const x = this.x + ICON_SIZE + MARGIN * 5;
    const y = this.y + TITLEBAR_H - PADDING * 1.5;
    text(this.title, x, y);
  }

  mousePressed(mx, my) {
    this.closeButton.mousePressed(mx, my);
    this.palette.mousePressed(mx, my);
    this.toolbar.mousePressed(mx, my);
    this.canvas.mousePressed(mx, my);
  }

  mouseDragged(mx, my) {
    this.canvas.mouseDragged(mx, my);
  }

  mouseReleased() {
    this.canvas.mouseReleased();
  }
}

// Button

class Button {
  constructor(x, y, w, h, label, action, fillColor = null, img = null) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.label = label;
    this.action = action;
    this.fillColor = fillColor;
    this.img = img;
  }

  draw() {
    if (this.img != null) {
      image(
        this.img,
        this.x + this.w / 2 - this.img.width / 2,
        this.y + this.h / 2 - this.img.height / 2
      );
    } else {
      fill(this.fillColor ? this.fillColor : "lightgrey");
      stroke("black");
      rect(this.x, this.y, this.w, this.h);
      if (!this.fillColor) {
        fill("black");
        textSize(13);
        textAlign(CENTER, CENTER);
        text(this.label, this.x + this.w / 2, this.y + this.h / 2);
      }
    }
  }

  mousePressed(mx, my) {
    if (
      mx > this.x &&
      mx < this.x + this.w &&
      my > this.y &&
      my < this.y + this.h
    ) {
      this.action();
    }
  }
}

class ToolbarButton extends Button {
  constructor(
    x,
    y,
    w,
    h,
    label,
    action,
    fillColor = null,
    img = null,
    onImg = null
  ) {
    super(x, y, w, h, label, action, fillColor, img);
    // An alternative image to show when the tool is selected.
    this.onImg = onImg;
  }

  draw() {
    if (currentTool === this.label && this.onImg != null) {
      image(
        this.onImg,
        this.x + this.w / 2 - this.onImg.width / 2,
        this.y + this.h / 2 - this.onImg.height / 2
      );
    } else {
      // Use the parent class's draw method
      super.draw();
    }
  }
}

class Toolbar {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.toolButtons = [];

    // Create a ToolbarButton object for each tool.
    AVAILABLE_TOOLS.forEach((toolName, i) => {
      const row = floor(i / 2);
      const col = i % 2;
      this.toolButtons.push(
        new ToolbarButton(
          this.x + 5 + col * TOOLBAR_BUTTON_SIZE,
          this.y + 5 + row * TOOLBAR_BUTTON_SIZE,
          TOOLBAR_BUTTON_SIZE,
          TOOLBAR_BUTTON_SIZE,
          toolName,
          () => {
            currentTool = toolName;
          },
          null,
          toolIcons[toolName][0],
          toolIcons[toolName][1]
        )
      );
    });
  }

  draw() {
    fill("darkgray");
    noStroke();
    rect(this.x, this.y, this.w, this.h);
    this.toolButtons.forEach((button) => button.draw());
  }

  mousePressed(mx, my) {
    this.toolButtons.forEach((button) => button.mousePressed(mx, my));
  }
}

class Palette {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.colorButtons = [];

    // Create a Button object for each color
    const endFirstRow = WEB_COLORS.length / 2;
    WEB_COLORS.forEach((colorName, i) => {
      let row = i < endFirstRow ? 0 : 1;
      let col = row > 0 ? i - endFirstRow : i;
      let x = this.x + this.h + col * PALETTE_BUTTON_SIZE + col * MARGIN * 2;
      let y =
        this.y +
        row * PALETTE_BUTTON_SIZE +
        PADDING * 2 +
        (row > 0 ? MARGIN * 2 : 0);
      this.colorButtons.push(
        new Button(
          x,
          y,
          PALETTE_BUTTON_SIZE,
          PALETTE_BUTTON_SIZE,
          colorName,
          () => {
            currentColor = colorName;
          },
          colorName
        )
      );
    });
  }

  draw() {
    fill("darkgray");
    rect(this.x, this.y, this.w, this.h);

    // Draw a box for the currently selected color
    stroke(60);
    fill("lightgray");
    rect(
      this.x + PADDING * 2,
      this.y + PADDING * 2,
      this.h - PADDING * 4,
      this.h - PADDING * 4
    );

    // Draw a little shaddow
    fill("black");
    const offset = this.h / 2 - this.h / 6;
    const s = PALETTE_BUTTON_SIZE;
    rect(this.x + offset + MARGIN, this.y + offset + MARGIN, s, s);

    // Draw currently selected color
    fill(currentColor);
    rect(this.x + offset, this.y + offset, s, s);

    // Draw each color
    this.colorButtons.forEach((button) => button.draw());
  }

  mousePressed(mx, my) {
    this.colorButtons.forEach((button) => button.mousePressed(mx, my));
  }
}

class Canvas {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    // Used for pencil, brush when drawing frame by frame
    this.lastX = null;
    this.lastY = null;

    // Used for drawing geometry i.e. lines, circles, etc.
    // These change less frequently than lastX, lastY.
    this.drawingX = null;
    this.drawingY = null;

    // Create a p5.Graphics object to store user's drawing
    this.buffer = createGraphics(w, h);
    this.buffer.background("white");
  }

  display() {
    fill("white");
    rect(this.x, this.y, this.w, this.h);
    image(this.buffer, this.x, this.y);

    if (this.isDrawingGeometry()) {
      // Draw a preview of what the user is trying to draw
      let x1 = this.x + this.drawingX;
      let y1 = this.y + this.drawingY;
      let x2 = mouseX;
      let y2 = mouseY;
      if (!this.mouseInsideCanvas(x2, y2)) {
        this.drawingX = null;
        this.drawingY = null;
        return;
      }
      this.drawShape(currentTool, x1, y1, x2, y2, false);
    }
  }

  mouseInsideCanvas(mx, my) {
    return (
      mx >= this.x &&
      mx <= this.x + this.w &&
      my >= this.y &&
      my <= this.y + this.h
    );
  }

  isDrawingGeometry() {
    return this.drawingX !== null;
  }

  strokeWeight() {
    return currentTool === "brush" ? 5 : 1;
  }

  replaceBufferWithFreshCanvas() {
    let newBuffer = createGraphics(this.w, this.h);
    newBuffer.image(this.buffer, 0, 0);
    this.buffer = newBuffer;
  }

  beginGeometry(x, y) {
    this.drawingX = x;
    this.drawingY = y;
  }

  endGeometry(x, y) {
    if (this.isDrawingGeometry()) {
      this.drawShape(currentTool, this.drawingX, this.drawingY, x, y);
    }
    this.drawingX = null;
    this.drawingY = null;
  }

  drawShape(shape, x1, y1, x2, y2, persist = true) {
    let c = persist ? this.buffer : window;
    c.stroke(currentColor);
    c.strokeWeight(this.strokeWeight());

    switch (shape) {
      case "line":
        c.line(x1, y1, x2, y2);
        break;
      case "rect":
        c.noFill();
        c.rect(x1, y1, x2 - x1, y2 - y1);
        break;
      case "circle":
        c.noFill();
        let radiusX = (x2 - x1) / 2;
        let radiusY = (y2 - y1) / 2;
        c.ellipse(
          x1 + radiusX,
          y1 + radiusY,
          Math.abs(radiusX * 2),
          Math.abs(radiusY * 2)
        );
        break;
    }
  }

  mousePressed(mx, my) {
    if (!this.mouseInsideCanvas(mx, my)) return;

    const adjustedX = mx - this.x;
    const adjustedY = my - this.y;
    this.lastX = adjustedX;
    this.lastY = adjustedY;

    switch (currentTool) {
      case "paint":
        this.paint(adjustedX, adjustedY);
        break;
      case "pencil":
      case "brush":
        this.buffer.stroke(currentColor);
        this.buffer.strokeWeight(this.strokeWeight());
        this.buffer.point(adjustedX, adjustedY);
        break;
      case "line":
      case "rect":
      case "circle":
        this.beginGeometry(adjustedX, adjustedY);
        break;
      case "spray":
        this.sprayPaint(adjustedX, adjustedY);
        break;
    }
  }

  mouseDragged(mx, my) {
    if (!this.mouseInsideCanvas(mx, my)) return;

    // Adjust mx & my to be relative to drawing canvas
    const adjustedX = mx - this.x;
    const adjustedY = my - this.y;

    switch (currentTool) {
      case "spray":
        this.sprayPaint(mx - this.x, my - this.y, currentColor);
        break;
      case "eraser":
        this.eraser(
          pmouseX - this.x,
          pmouseY - this.y,
          mx - this.x,
          my - this.y
        );
        break;
      case "pencil":
      case "brush":
        // Draw a line only if we have a previous position
        if (this.lastX !== null && this.lastY !== null) {
          this.buffer.stroke(currentColor);
          this.buffer.strokeWeight(this.strokeWeight());
          this.buffer.line(this.lastX, this.lastY, adjustedX, adjustedY);
        }

        // Update the previous position
        this.lastX = adjustedX;
        this.lastY = adjustedY;
        break;
    }
  }

  mouseReleased() {
    this.lastX = null;
    this.lastY = null;
    if (!this.mouseInsideCanvas(mouseX, mouseY)) return;
    if (this.isDrawingGeometry()) {
      // Render whatever we are drawing
      this.endGeometry(mouseX - this.x, mouseY - this.y);
    }
  }

  sprayPaint(x, y) {
    let density = 50; // Dots per frame
    let radius = 10; // Max distance from center
    this.buffer.stroke(currentColor);
    this.buffer.strokeWeight(1); // Size of each dot
    for (let i = 0; i < density; i++) {
      // Calculate a random offset for each dot
      let angle = random(TWO_PI); // Random angle
      let r = random(radius); // Distance from center
      let offsetX = r * cos(angle);
      let offsetY = r * sin(angle);
      this.buffer.point(x + offsetX, y + offsetY);
    }
  }

  eraser(x1, y1, x2, y2, strokeWeightVal = 10) {
    // Assume white background
    this.buffer.stroke(255, 255, 255);
    this.buffer.strokeWeight(strokeWeightVal);
    this.buffer.line(x1, y1, x2, y2);
  }

  paint(x, y) {
    const newColor = color(currentColor);
    this.buffer.loadPixels();
    let targetColor = this.buffer.get(x, y);

    // Do nothing if the target and new color are the same
    let isSame = this.colorsEqual(targetColor, newColor, 0);
    if (isSame) {
      return;
    }

    let pixelVisited = new Set();
    let queue = [[x, y]];

    const shouldColorPixel = (x1, y1) => {
      if (
        x1 < 0 ||
        y1 < 0 ||
        x1 > this.buffer.width ||
        y1 > this.buffer.height
      ) {
        return false;
      }

      let idx = y1 * this.buffer.width + x1;
      if (pixelVisited.has(idx)) {
        return false;
      }

      let thisColor = this.buffer.get(x1, y1);
      return this.colorsEqual(thisColor, targetColor);
    };

    while (queue.length > 0) {
      let [x, y] = queue.shift();
      let idx = y * this.buffer.width + x;

      if (!pixelVisited.has(idx)) {
        this.buffer.set(x, y, newColor);
        pixelVisited.add(idx);

        // Define the four directions to check
        let directions = [
          [0, -1],
          [1, 0],
          [0, 1],
          [-1, 0],
        ];

        for (let [xOffset, yOffset] of directions) {
          if (shouldColorPixel(x + xOffset, y + yOffset)) {
            queue.push([x + xOffset, y + yOffset]);
          }
        }
      }
    }
    this.buffer.updatePixels();
    this.replaceBufferWithFreshCanvas();
  }

  // Helper method to normalize colors
  normalizeColor(color) {
    if (color instanceof p5.Color) {
      return [red(color), green(color), blue(color), alpha(color)];
    } else {
      if (color.length === 3) {
        return [...color, 255];
      }
      return color;
    }
  }

  // Helper method to check if two colors are equal
  colorsEqual(col1, col2, tolerance = 10) {
    col1 = this.normalizeColor(col1);
    col2 = this.normalizeColor(col2);

    return (
      Math.abs(col1[0] - col2[0]) <= tolerance &&
      Math.abs(col1[1] - col2[1]) <= tolerance &&
      Math.abs(col1[2] - col2[2]) <= tolerance &&
      Math.abs(col1[3] - col2[3]) <= tolerance
    );
  }
}
let testing = 0;
function setup() {
  createCanvas(920, 600);

  paintWindow = new PaintWindow(50, 20, 820, 550, "Slawn - Paint");
  drawHomePage();
}

function drawHomePage() {
  // Create the buttons
  paintWindow = new PaintWindow(50, 20, 820, 550, "Slawn - Paint");

  //blankButton = createButton("Blank Canvas");
  blankButton = createImg("images/blank.png", "Blank Canvas");
  blankButton.position(150, 230);
  blankButton.size(180, 150);
  blankButton.style("cursor", "pointer");
  blankButton.mousePressed(goToBlankCanvas);

  //clownButton = createButton("Clown Canvas");
  clownButton = createImg("images/Amy Canvas.png", "Clown Canvas");
  clownButton.position(600, 230);
  clownButton.size(180, 150);
  clownButton.style("cursor", "pointer");
  clownButton.mousePressed(goToClownCanvas);

  //carButton = createButton("Car Canvas");
  carButton = createImg("images/Bully Canvas.png", "Car Canvas");
  carButton.position(150, 360);
  carButton.size(180, 150);
  carButton.style("cursor", "pointer");
  carButton.mousePressed(goToCarCanvas);

  //houseButton = createButton("House Canvas");
  houseButton = createImg("images/Ice Canvas.png", "House Canvas");
  houseButton.position(600, 360);
  houseButton.size(180, 150);
  houseButton.style("cursor", "pointer");
  houseButton.mousePressed(goToHouseCanvas);
  image(logo, 350, 100);
  blankButton.show();
  clownButton.show();
  carButton.show();
  houseButton.show();
  pageState = "paintWindowState";
}
function draw() {
  background("white"); // Influences the background
  paintWindow.draw();
  if (pageState === "paintWindowState") {
    image(logo, 280, 80);
    blankButton.show();
    clownButton.show();
    carButton.show();
    houseButton.show();
  } else if (pageState === "Blank Canvas") {
    // Blank Canvas

    // check whether the paint canvas has been drawn
    if (blankDrawn == false) {
      paintWindow = new PaintWindow2(50, 20, 820, 550, "untitled - Paint");
      blankDrawn = true;
    }

    // Show back button, hide main buttons
    blankButton.hide();
    clownButton.hide();
    carButton.hide();
    houseButton.hide();
  } else if (pageState === "Clown Canvas") {
    // Clown Canvas
    image(clown, 30, -25);

    // check whether the paint canvas has been drawn
    if (clownDrawn == false) {
      paintWindow = new PaintWindow2(50, 20, 820, 550, "untitled - Paint");

      clownDrawn = true;
    }
    blankButton.hide();
    clownButton.hide();
    carButton.hide();
    houseButton.hide();
    //paintWindowClown.draw();
  } else if (pageState === "Car Canvas") {
    // Car Canvas
    image(car, 32, -25);
    //  paintWindow.draw();

    // check whether the paint canvas has been drawn
    if (carDrawn == false) {
      paintWindow = new PaintWindow2(50, 20, 820, 550, "untitled - Paint");
      carDrawn = true;
    }
    blankButton.hide();
    clownButton.hide();
    carButton.hide();
    houseButton.hide();
  } else if (pageState === "House Canvas") {
    //House Canvas
    image(house, 25, -35);
    // paintWindow.draw();

    // check whether the paint canvas has been drawn
    if (houseDrawn == false) {
      paintWindow = new PaintWindow2(50, 20, 820, 550, "untitled - Paint");
      houseDrawn = true;
    }

    blankButton.hide();
    clownButton.hide();
    carButton.hide();
    houseButton.hide();
  }
}

function goToBlankCanvas() {
  pageState = "Blank Canvas";
}

function goToClownCanvas() {
  pageState = "Clown Canvas";
}

function goToCarCanvas() {
  pageState = "Car Canvas";
}

function goToHouseCanvas() {
  pageState = "House Canvas";
}

function mousePressed() {
  paintWindow.mousePressed(mouseX, mouseY);
}

function mouseDragged() {
  paintWindow.mouseDragged(mouseX, mouseY);
}

function mouseReleased() {
  paintWindow.mouseReleased(mouseX, mouseY);
}
