export default class Section {
// #renderer;
// #itemContainer;
  constructor(containerSelector, renderer = (item) => this.addItem(item, true)) {
    this._renderer = renderer;
    this._itemContainer = document.querySelector(containerSelector);
  }

  //renderItems(items, renderer = item => this.addItem(this._renderer(item))) {
  renderItems(items, useClass_flag = false, renderer = useClass_flag
    ? item => this._renderer(item) : item => this.addItem(this._renderer(item), true))
  {
    items.forEach(item => renderer(item));
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