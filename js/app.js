'use strict';

var pictureOne = document.getElementById('pictureOne');
var pictureTwo = document.getElementById('pictureTwo');
var pictureThree = document.getElementById('pictureThree');
var resultsTable = document.getElementById('resultsTable');

var imgs = [];
var turnCount = 0;

function BusMallPictures(name, displayName) {
  this.name = name;
  this.displayName = displayName;
  this.filepath = `imgs/${name}`;
  this.views = 0;
  this.clicks = 0;

  imgs.push(this);
}

new BusMallPictures('bag.jpg', 'Bag');
new BusMallPictures('banana.jpg', 'Banana');
new BusMallPictures('bathroom.jpg', 'Bathroom');
new BusMallPictures('boots.jpg', 'Boots');
new BusMallPictures('breakfast.jpg', 'Breakfast');
new BusMallPictures('bubblegum.jpg', 'Bubblegum');
new BusMallPictures('chair.jpg', 'Chair');
new BusMallPictures('cthulhu.jpg', 'Cthulhu');
new BusMallPictures('dog-duck.jpg', 'Dog Duck');
new BusMallPictures('dragon.jpg', 'Dragon');
new BusMallPictures('pen.jpg', 'Pen');
new BusMallPictures('pet-sweep.jpg', 'Pet Sweep');
new BusMallPictures('scissors.jpg', 'Scissors');
new BusMallPictures('shark.jpg', 'Shark');
new BusMallPictures('sweep.png', 'Sweep');
new BusMallPictures('tauntaun.jpg', 'Taun Taun');
new BusMallPictures('unicorn.jpg', 'Unicorn');
new BusMallPictures('usb.gif', 'USB');
new BusMallPictures('water-can.jpg', 'Water Can');
new BusMallPictures('wine-glass.jpg', 'Wine Glass');


function choosePictures() {
  let currentPictures = [];
  do {
    do {
      var randomNumber = Math.floor(Math.random() * imgs.length);
      var picture = imgs[randomNumber];
    } while (previousPictures.includes(picture) || currentPictures.includes(picture));
    currentPictures.push(picture);
  } while (currentPictures.length < 3);

  return currentPictures;
}

var previousPictures = [];
oneTurn();

function oneTurn() {
  var currentPictures = choosePictures();
  render(currentPictures);

  for (var i = 0; i < 3; i++) {
    currentPictures[i].views++;
  }

  previousPictures = currentPictures;

  turnCount += 1;
}

function render(currentPictures) {
  pictureOne.src = currentPictures[0].filepath;
  pictureOne.alt = currentPictures[0].name;
  pictureOne.title = currentPictures[0].displayName;

  pictureTwo.src = currentPictures[1].filepath;
  pictureTwo.alt = currentPictures[1].name;
  pictureTwo.title = currentPictures[1].displayName;

  pictureThree.src = currentPictures[2].filepath;
  pictureThree.alt = currentPictures[2].name;
  pictureThree.title = currentPictures[2].displayName;

  pictureOne.addEventListener('click', handleClick);
  pictureTwo.addEventListener('click', handleClick);
  pictureThree.addEventListener('click', handleClick);
}

function handleClick(event) {
  console.log('target, ', event.target);
  if (turnCount < 26) {
    increaseClickCount(event.target.title);
    oneTurn();
    //console.log('event.target.src', event.target.src);
  } else if (turnCount === 26) {
    createTable();
    turnCount++;
  } else {
    return;
  }
}

function increaseClickCount(title) {
  for (var i = 0; i < imgs.length; i++) {
    //console.log('increaseClickCount:' + title + ' - ' + imgs[i].displayName );
    if (imgs[i].displayName === title) {
      imgs[i].clicks++;
      break;
    }
  }
}

function createTable() {
  var row = document.createElement('tr');
  var headerName = document.createElement('td');
  headerName.innerText = 'Name';
  row.appendChild(headerName);

  var headerTotalClicks = document.createElement('td');
  headerTotalClicks.innerText = 'Total Clicks';
  row.appendChild(headerTotalClicks);

  var headerPercentClicked = document.createElement('td');
  headerPercentClicked.innerText = 'Percent Clicked';
  row.appendChild(headerPercentClicked);

  resultsTable.appendChild(row);

  for (var i = 0; i < imgs.length; i++) {
    var imgRow = document.createElement('tr');
    var nameData = document.createElement('td');
    nameData.innerText = imgs[i].displayName;
    imgRow.appendChild(nameData);

    var totalClicksData = document.createElement('td');
    totalClicksData.innerText = imgs[i].clicks;
    imgRow.appendChild(totalClicksData);

    var totalPercentClicked = document.createElement('td');
    totalPercentClicked.innerText = (Math.floor((imgs[i].clicks / imgs[i].views) * 100) + '%');
    imgRow.appendChild(totalPercentClicked);

    resultsTable.appendChild(imgRow);
  }
}
