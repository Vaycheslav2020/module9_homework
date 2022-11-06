// Задание 1.
console.log("Задание 1");

const PARSER = new DOMParser();

const XMLString = `
  <list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
  </list>
`;

class student {
  constructor(name, age, prof, lang) {
    (this.name = name),
      (this.age = age),
      (this.prof = prof),
      (this.lang = lang);
  }
}

const LIST = {
  list: [],
};

const XMLDom = PARSER.parseFromString(XMLString, "text/xml");
const LIST_NODE = XMLDom.querySelector("list");

const STUDENT_NODE_LIST = LIST_NODE.querySelectorAll("student");

let arrStudy = [...STUDENT_NODE_LIST];

arrStudy.forEach((STUDENT_NODE) => {
  const NAME_NODE = STUDENT_NODE.querySelector("name");
  const NAME_FIRST = NAME_NODE.querySelector("first");
  const NAME_SECOND = NAME_NODE.querySelector("second");
  const AGE_NODE = STUDENT_NODE.querySelector("age");
  const PROF_NODE = STUDENT_NODE.querySelector("prof");
  const LANG_ATTR = NAME_NODE.getAttribute("lang");

  let name = NAME_FIRST.textContent + " " + NAME_SECOND.textContent;
  let age = AGE_NODE.textContent;
  let prof = PROF_NODE.textContent;
  let lang = LANG_ATTR;

  const studentItem = new student(name, age, prof, lang);
  LIST.list.push(studentItem);
});

console.log(LIST);

// Задание 2
console.log("Задание 2");

const JSON_STRING = `
{
  "list": [
   {
    "name": "Petr",
    "age": "20",
    "prof": "mechanic"
   },
   {
    "name": "Vova",
    "age": "60",
    "prof": "pilot"
   }
  ]
 }
`;

class man {
  constructor(name, age, prof) {
    (this.name = name), (this.age = age), (this.prof = prof);
  }
}

const LIST_OBJ = {
  list: [],
};

const DATA = JSON.parse(JSON_STRING);
const DATA_LIST = [...DATA.list];

DATA_LIST.forEach((element) => {
  const newMan = new man(element.name, element.age, element.prof);
  LIST_OBJ.list.push(newMan);
});
console.log(LIST_OBJ);

// Задание 3
console.log("Задание 3");

const VALUE = document.querySelector("input").value;
const IMAGE_BOX = document.querySelector(".image-box");
const BTN = document.getElementById("btn");
const BN_ReSeT = document.getElementById("btnReset");
const XHR = new XMLHttpRequest();
const LOCAL_IMAGES = localStorage.getItem("images");

if (LOCAL_IMAGES) {
  IMAGE_BOX.innerHTML = LOCAL_IMAGES;
}

BN_ReSeT.addEventListener("click", RESET);

const GET_NUM = () => {
  if (VALUE < 1 || VALUE > 10) {
    alert("число вне диапазона от 1 до 10");
  } else {
    let url = `https://picsum.photos/v2/list?page=5&limit=${VALUE}`;
    let result;
    XHR.open("GET", url, true);
    XHR.onload = function () {
      if (XHR.status != 200) {
        console.log("Статус ответа: ", XHR.status);
      } else {
        result = JSON.parse(XHR.response);
        displayResult(result);
      }
    };
    XHR.onerror = function () {
      console.log("Ошибка! Статус ответа: ", XHR.status);
    };
    XHR.send();
  }
};
BTN.addEventListener("click", GET_NUM);

function displayResult(apiData) {
  let cards = "";
  localStorage.removeItem("images");
  apiData.forEach((item) => {
    const cardBlock = `
      <figure class="card">
      <figcaption>${item.author}</figcaption>
        <img
          src="${item.download_url}"
          class="card-image"
          width="500"
          height="500"
        />
      </figure>
    `;
    cards += cardBlock;
    localStorage.setItem("images", cards);
  });
  IMAGE_BOX.innerHTML = cards;
}

function RESET() {
  IMAGE_BOX.innerHTML = null;
  localStorage.removeItem("images");
}

// 4 сказали пропустить
// 5 сказали пропустить

// тоже самое только с fetch =(

// Задание 5
console.log("Задание 5");

let numImagesAvailable = 10;
let randomNumber = Math.floor(Math.random() * numImagesAvailable);
const btnSubmit = document.getElementById("submit");
const btnReset2 = document.getElementById("btnReset2");
const inputs = document.querySelector(".input-wrapper");
const imageContainer = document.querySelector(".image-container");
const localImg = localStorage.getItem("img");

if (localImg) {
  imageContainer.innerHTML = localImg;
}

function getData() {
  const imageWidth = document.getElementById("imageWidth").value;
  const imageHeight = document.getElementById("imageHeight").value;
  let url = `https://picsum.photos/v2/list?page=5&limit=${numImagesAvailable}`;
  if (inputs.querySelector(".msg")) {
    inputs.querySelector(".msg").remove();
  }
  if (imageWidth < 100 || imageWidth > 500) {
    inputs.insertAdjacentHTML(
      "beforeend",
      `<span class="msg" style="color:red">Ширина картинки вне диапазона от 100 до 500</span>`
    );
  } else if (imageHeight < 100 || imageHeight > 500) {
    inputs.insertAdjacentHTML(
      "beforeend",
      `<span class="msg" style="color:red">Высота картинки вне диапазона от 100 до 500</span>`
    );
  } else {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        innerImage(data, imageWidth, imageHeight);
      })
      .catch(() => {
        console.log("error");
      });
  }
}

function innerImage(data, width, height) {
  let img = "";
  localStorage.removeItem("img");
  data.forEach((item) => {
    const cardBlock = `
        <figure class="card">
        <figcaption>${item.author}</figcaption>
          <img
            src="${item.download_url}"
            class="card-image"
            width="${width}"
            height="${height}"
          />
        </figure>
      `;
    img += cardBlock;
    localStorage.setItem("img", img);
  });
  imageContainer.innerHTML = img;
}

function reset() {
  imageContainer.innerHTML = null;
  localStorage.removeItem("img");
}

btnReset2.addEventListener('click', reset)

btnSubmit.addEventListener("click", function () {
  getData();
});

document.addEventListener('unload', (event) => { localStorage.clear() });
