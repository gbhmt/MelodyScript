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
      keyButton.addEventListener('click', () => {
        this.grid.changeKey(key);
      });
      this.element.appendChild(keyButton);
    });
  }
}

export default Buttons;
