'use strict';

//create an array for the days and hours
//var weekdays = ['Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur'];
var hours = ['06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

function getRandomNumber(min, max){ //generate a random number
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random()*(max - min + 1)) + min; //max and min are inclusive
}
//Creating location objects
var pikePlace = {
  minCustomers: 23,
  maxCustomers: 65,
  avgCustomerCookies: 6.3,
  numPurchased: [],
  numCustomer: [],
  selectorName: 'pikePlace'
};
var seaTac = {
  minCustomers: 3,
  maxCustomers: 24,
  avgCustomerCookies: 1.2,
  numPurchased: [],
  numCustomer: [],
  selectorName: 'seaTac'
};
var seattleCenter = {
  minCustomers: 11,
  maxCustomers: 38,
  avgCustomerCookies: 3.7,
  numPurchased: [],
  numCustomer: [],
  selectorName: 'seattleCenter'
};
var capitolHill = {
  minCustomers: 20,
  maxCustomers: 38,
  avgCustomerCookies: 2.3,
  numPurchased: [],
  numCustomer: [],
  selectorName: 'capitolHill'
};

var alki = {
  minCustomers: 20,
  maxCustomers: 38,
  avgCustomerCookies: 2.3,
  numPurchased: [],
  numCustomer: [],
  selectorName: 'alki'
};

var locations = [pikePlace, seaTac, seattleCenter, capitolHill, alki];

//arrays of random number function and totals it
function objectName(name) {
  var total = 0;

  for (var i = 0; i < 15; i++) {
    var randNum = getRandomNumber(name.minCustomers, name.maxCustomers);
    //fill the number of customers array
    name.numCustomer.push(randNum);
    //fill the number of cookies purchased per hour array
    name.numPurchased.push(Math.round(name.avgCustomerCookies*randNum));

    total += randNum; //track the cookies
  }
  name.totalCookies = Math.round(name.avgCustomerCookies*total);
  console.log('The ' + name.selectorName + ' location sold a total of ' + name.totalCookies + ' today.');
}

//function to render the elements to the page
function render(name){
  var pikeUlEl = document.getElementById(name.selectorName);

  for (var i = 0; i < name.numPurchased.length; i++){
    var liEl = document.createElement('li');

    liEl.textContent = hours[i] + ':00 ' + name.numPurchased[i] + ' cookies';
    pikeUlEl.appendChild(liEl);
  }
  var totalLiEl = document.createElement('li');
  totalLiEl.textContent = 'Total cookies sold: ' + name.totalCookies;
  pikeUlEl.appendChild(totalLiEl);
}

//render the locations
for(var i = 0; i < locations.length; i++){
  objectName(locations[i]);
  render(locations[i]);
}