# MelodyScript

![screenshot](https://github.com/gbhmt/MelodyScript/blob/master/melody-script-readme-screenshot.jpg)

[MelodyScript](http://www.taylor-herron.com/MelodyScript/) is an interactive step sequencer in the browser that allows you to highlight cells to create melodies. 

### Instructions
* Click or drag to highlight cells on the grid
* Click on the buttons on the right side to change the tonality of the notes on the grid
* Use the slider at the bottom to adjust the tempo of playback
* Click the clear button at the bottom to reset the grid

### Implementation

#### DOM manipulation

All DOM manipulation in MelodyScript is accomplished with vanilla JavaScript. Upon loading the DOM, a 16x16 grid of cells with references to musical notes is added to the DOM. 

`/app/grid.js`

```JS
class Grid {
  constructor(container, synth) {
    this.element = document.createElement("DIV");
    this.element.id = "grid";
    container.appendChild(this.element);
    this.cells = new Array(16);
    this.synth = synth;
    this.createGrid();
    this.mousedown = false;
  }

  createGrid () {
    for (let i = 0; i < 16; i++) {
      this.cells[i] = [];
      for (let j = 0; j < 16; j++) {
        const cellDiv = document.createElement("DIV");
        const cell = new Cell(KEYS["Major"][i], this.synth, cellDiv);
        cellDiv.cell = cell;
        this.cells[i][j] = cell;
        this.addListeners(cellDiv);
        cellDiv.className = "cell";
        this.element.appendChild(cellDiv);
      }
    }
  }
  ...
}
  
```
`/app/melodyscript.js`
```JS
const gridAndButtons = document.getElementById('grid-and-buttons');
const grid = new Grid(gridAndButtons, synth);
```

The musical notes are contained in the `cell` object, which is attached to each cell in the DOM and is set to inactive as default. Each cell has a `play` method, as well as a `toggleActive` method that toggles a class to be read by the sequencer to determine whether or not to play the note on each pass.

`/app/cell.js`

```JS
toggleActive () {
    if (this.active) {
      this.active = false;
      this.container.className = "cell";
    } else {
      this.active = true;
      this.container.className = "cell active";
    }
  }

play () {
    this.synth.triggerAttackRelease(this.note, '8n');
  }
  
```


#### Creating pitches
MelodyScript utilizes the [Tone.js](https://github.com/Tonejs/Tone.js) WebAudio framework for producing pitches and handling the sequencing. After the DOM has been initially loaded, a global `Synth` object is created to play the notes referenced by the cells.

`/app/melodyscript.js`

```JS
const freeverb = new Tone.Freeverb(0.9).toMaster();
  const synth = new Tone.PolySynth(6).connect(freeverb);
  synth.volume.value = -10;
```

The execution of the activated pitches is handled by a `Sequence`, a feature of the Tone.js library that allows you to execute a callback for every step in the sequence. It acts similarly to setInterval, with the major differences being that the second argument allows you to enter an array of steps in the sequence that can be referenced as a second argument in the callback, and the third argument, rather than being an interval in ms, is represented by a musical subdivision of time (measures, beats, fractions of beats, etc.). At each step of the sequence, the current column is highlighted visually and each cell in the column is checked to see if it's active. If it is active, the cell's `play()` method is called, and the pitch is played. The `Sequence` is handled by the `Transport`, the global timekeeper provided by the Tone.js library. The slider on the bottom of the page is configured to change the tempo of playback by setting the `bpm` property of the `Transport` object.

```JS
const loop = new Tone.Sequence((time, col) => {
    for (let i = 0; i < 16; i++) {
      const currentColumn = columns[col];
      let prevColumn;
      if (col === 0) {
        prevColumn = columns[15];
      } else {
        prevColumn = columns[col - 1];
      }
      currentColumn[i].addHighlight();
      prevColumn[i].removeHighlight();
      if (currentColumn[i].active) {
        currentColumn[i].play();
      }
    }
  }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "8n");
  
  Tone.Transport.start();
  Tone.Transport.bpm.value = 130;
  loop.start();
```
#### Multiple tonalities

The buttons for toggling different tonalities are keys in the `KEYS` object that point to arrays of pitches corresponding to that tonality. 

`/app/key_constants.js`

```JS
  "Major": ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5",
          "D5", "E5", "F5", "G5", "A5", "B5", "C6", "D6"].reverse(),
  "Harmonic Minor": ["C4", "D4", "Eb4", "F4", "G4", "Ab4", "B4", "C5",
                "D5", "Eb5", "F5", "G5", "Ab5", "B5", "C6", "D6"].reverse(),
  "Melodic Minor": ["C4", "D4", "Eb4", "F4", "G4", "A4", "B4", "C5",
              "D5", "Eb5", "F5", "G5", "A5", "B5", "C6", "D6"].reverse(),
  "Harmonic Major": ["C4", "D4", "E4", "F4", "G4", "Ab4", "B4", "C5",
              "D5", "E5", "F5", "G5", "Ab5", "B5", "C6", "D6"].reverse()
  .....
```

The buttons are dynamically added to the DOM by looping through the `KEYS` object upon loading the DOM and creating a button to toggle that key, which is accomplished by reassigning the musical notes to the cells on the grid in real time. This makes adding additional buttons for tonalities as simple as adding another key value pair to the `KEYS` object.

`/app/grid.js`

```JS
changeKey (key) {
    this.cells.forEach((row, idx) => {
      return row.forEach((cell) => {
        cell.note = KEYS[key][idx];
      });
    });
  }
```

### Future improvements
* Add option for user to enter grid size
* Allow for recording of playback

