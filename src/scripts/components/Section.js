export default class Section {
#items;
#renderer;
#itemContainer;
constructor({items, renderer = (item) => this.addItem(item, true)}, containerSelector) {
  this.#items = items;
  this.#renderer = renderer;
  this.#itemContainer = document.querySelector(containerSelector);
}

renderItems() {
  this.#items.forEach(item => this.#renderer(item, this.#itemContainer));
}

addItem(item = this.#items, addAfter_flag = false) {
  if (addAfter_flag) {
    this.#itemContainer.append(item);
  } else {
    this.#itemContainer.prepend(item);
  }
}

}