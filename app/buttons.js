import KEYS from './key_constants.js';

class Buttons {
  constructor(grid) {
    this.element = document.createElement('div');
    this.element.id = 'buttons';
    this.grid = grid;
    this.makeButtons();
    const container = document.getElementById('grid-and-buttons');
    container.appendChild(this.element);
  }

  makeButtons () {
    Object.keys(KEYS).forEach((key) =>{
      const keyButton = document.createElement('button');
      keyButton.innerHTML = key;
      keyButton.addEventListener('click', (e) => {
        this.grid.changeKey(key);
        this.select(e.currentTarget);
      });
      this.element.appendChild(keyButton);
    });
    Array.from(this.element.children)[0].className = "button selected";
  }

  select (target) {
    const buttons = Array.from(this.element.children);
    buttons.forEach((button) => {
      button.className = "button";
    });
    target.className = "button selected";
  }
}

export default Buttons;
