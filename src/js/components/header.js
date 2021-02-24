export default class Header {
  constructor() {
    this.isMenuOpened = false;
    this.isSummaryOpened = false;
    this.currentLength;
    this.activePage;
    this.array;
  }

  lengthFromWidth(width) {
    let length;
    switch (true) {
      case width > 920:
        length = 9;
        break;
      case width <= 920 && width > 910:
        length = 8;
        break;
      case width <= 910 && width > 822:
        length = 7;
        break;
      case width <= 822 && width > 734:
        length = 6;
        break;
      case width <= 734 && width > 646:
        length = 5;
        break;
      case width <= 646 && width > 558:
        length = 4;
        break;
      case width <= 558 && width > 510:
        length = 3;
        break;
      case width <= 510:
        length = 0;
        break;
    }
    return length;
  }

  //отрисовка одной горизонтальной кнопки
  renderButton(obj, id, number) {
    const button = document.createElement("button");
    button.classList.add("header__menu-item");
    button.setAttribute("id", id);
    button.innerHTML = `
  <div class="header__label">${number}</div>
  <img
    class="header__menu-icon"
    src="./images/${obj.src}.svg"
    alt="${obj.name}"
  />
  <p class="header__menu-text">${obj.name}</p>`;
    return button;
  }

  //отрисовка кнопки more
  renderMoreButton() {
    const button = document.createElement("button");
    button.classList.add("header__menu-item");
    button.classList.add("header__menu-item_more");
    button.innerHTML = `<img
  class="header__menu-icon"
  src="./images/more.svg"
  alt="more"
  />
  <p class="header__menu-text">More</p>
  <div class ="header__vertical-menu">
  <div class ="header__vertical-menu__appendix"></div>
  </div>
  `;
    return button;
  }

  //отрисовка гамбургера
  renderHamburger() {
    const button = document.createElement("button");
    button.classList.add("header__menu-item");
    button.classList.add("header__menu-item_more");
    button.innerHTML = `<img
  class="header__menu-icon"
  src="./images/hamburger+.svg"
  alt="more"
  />
  <div class ="header__vertical-menu">
  <div class ="header__vertical-menu__appendix"></div>
  </div>
  `;
    return button;
  }

  //отрисовка кнопки вертикального меню
  renderVerticalButton(obj, id, number) {
    const button = document.createElement("button");
    button.setAttribute("id", id);
    button.classList.add("header__menu-item");
    button.classList.add("header__menu-item_vertical");
    button.innerHTML = `
  <div class="header__label header__label_vertical">${number}</div>
  <img
  class="header__menu-icon header__menu-icon_vertical"
  src="./images/${obj.src}.svg"
  alt="${obj.name}"
  />
  <p class="header__menu-text">${obj.name}</p>
  `;
    return button;
  }

  renderActivePage(obj, number) {
    const div = document.createElement("div");
    div.classList.add("header__active-page");
    div.innerHTML = `
  <div class="header__label header__label_active">${number}</div>
  <img
  class="header__menu-icon header__menu-icon_vertical"
  src="./images/${obj.src}.svg"
  alt="${obj.name}"
  />
  <p class="header__menu-text">${obj.name}</p>`;
    return div;
  }

  widthHandler(arr, width) {
    let length = this.lengthFromWidth(width);
    if (this.currentLength != length) {
      this.renderVertAndHoriz(length, arr);
    }
    if (this.isMenuOpened) {
      this.closeMenu();
    }
    if (this.isSummaryOpened) {
      this.closeSummary();
    }
  }

  renderHorizontalMenu(length, arr) {
    const nav = document.querySelector(".header__nav");
    nav.innerHTML = "";
    for (let i = 0; i < length; i++) {
      nav.appendChild(this.renderButton(arr[i], i, 7));
    }
    if (length <= 8 && length > 0) {
      nav.appendChild(this.renderMoreButton());
    }
    if (length == 0) {
      nav.appendChild(this.renderActivePage(this.activePage, 7));
      nav.appendChild(this.renderHamburger());
    }
  }

  renderVerticalMenu(arr, length) {
    const vertMenu = document.querySelector(".header__vertical-menu");
    for (let i = length; i < arr.length; i++) {
      vertMenu.appendChild(this.renderVerticalButton(arr[i], i, 7));
    }
  }

  renderVertAndHoriz(length, arr) {
    this.renderHorizontalMenu(length, arr);
    this.renderVerticalMenu(arr, length);
    this.currentLength = length;
  }

  onClickRender(arr, width) {
    let length = this.lengthFromWidth(width);
    this.renderVertAndHoriz(length, arr);
  }

  closeSummary() {
    const summarry = document.querySelector(".header__summary-section");
    summarry.classList.remove("header__summary-section_is-opened");
    this.isSummaryOpened = false;
  }

  closeMenu() {
    if (this.isMenuOpened) {
      const vertMenu = document.querySelector(".header__vertical-menu");
      vertMenu.classList.remove("header__vertical-menu_is-opened");
      this.isMenuOpened = false;
    } else return;
  }

  openMenu() {
    this.isMenuOpened = true;
    const vertMenu = document.querySelector(".header__vertical-menu");
    vertMenu.classList.toggle("header__vertical-menu_is-opened");
  }

  openSummary() {
    this.isSummaryOpened = true;
    const summarry = document.querySelector(".header__summary-section");
    summarry.classList.toggle("header__summary-section_is-opened");
  }

  buttonHandler(button) {
    const id = button.getAttribute("id");
    this.activePage = this.array[id];
    this.closeMenu();
    this.onClickRender(this.array, innerWidth);
  }

  headerHandler(event) {
    let button = event.target.closest("button");
    if (button) {
      switch (true) {
        case button.classList.contains("header__summary-menu-button"):
          this.openSummary();
          break;
        case button.classList.contains("header__menu-item_more"):
          this.openMenu();
          break;
        case button.classList.contains("header__summary-button"):
          this.closeSummary();
          break;
        case button.classList.contains("header__menu-item") &&
          !button.classList.contains("header__menu-item_more"):
          this.buttonHandler(button);
          break;
      }
    }
  }

  //закрытие по клику вне меню
  outsideClick(event) {
    const button = event.target.closest("button");

    if (
      this.isMenuOpened &&
      (!button ||
        !(
          button.classList.contains("header__menu-item_more") ||
          button.classList.contains("header__menu-item_vertical")
        ))
    ) {
      this.closeMenu();
    }

    if (
      this.isSummaryOpened &&
      (!button ||
        !(
          button.classList.contains("header__summary-button") ||
          button.classList.contains("header__summary-menu-button")
        ))
    ) {
      this.closeSummary();
    }
  }
}
