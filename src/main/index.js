import "./index.css";
import Header from "../js/components/header.js";

const images = importAll(
  require.context("../images", false, /\.(png|jpe?g|svg)$/)
);

const constants = require("../constants/items.json");
const headerObj = new Header();
const header = document.querySelector(".header");
headerObj.array = constants;
headerObj.activePage = constants[0];

//импорт изображений
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

//обработка изменения ширины
function handleSize() {
  headerObj.widthHandler(constants, innerWidth);
}

//обработка кликов
function headerHandler(event) {
  headerObj.headerHandler(event);
}

//обработка кликов вне меню
function outsideClick(event) {
  headerObj.outsideClick(event);
}

headerObj.widthHandler(constants, innerWidth);
window.addEventListener("resize", handleSize);
document.addEventListener("click", headerHandler);
document.addEventListener("click", outsideClick);
