export default class Section {
// #renderer;
// #itemContainer;
  constructor(containerSelector, renderer = (item) => this.addItem(item, true)) {
    this._renderer = renderer;
    this._itemContainer = document.querySelector(containerSelector);
  }

    renderItems(items, renderer = this._renderer) {
      items.forEach(item => renderer(item, this._itemContainer));
      return this;
  }

  addItem(item, addAfter_flag = false) {
    if (addAfter_flag) {
      this._itemContainer.append(item);
    } else {
      this._itemContainer.prepend(item);
    }
    return this;
  }
}