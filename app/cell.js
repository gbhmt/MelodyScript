class Cell {
  constructor(note, synth, container) {
    this.note = note;
    this.synth = synth;
    this.active = false;
    this.container = container;
  }

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
}

module.exports = Cell;
