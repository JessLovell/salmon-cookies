'use strict';

//create an array for the days and hours
//var weekdays = ['Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur'];

var hours = ['06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

function getRandomNumber(min, max){ //generate a random number
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random()*(max - min + 1)) + min; //max and min are inclusive
}

//Create a location object
var pikePlace = {
  minCustomers: 23,
  maxCustomers: 65,
  avgCustomerCookies: 6.3,
  close: 20,
  totalCookies: 0,
  numPurchased: [],
  numCustomer: [],
  render: function(){
    var pikeUlEl = document.getElementById('pike');

    for (var i = 0; i < this.numPurchased.length; i++){

      var liEl = document.createElement('li');
      liEl.textContent = hours[i] + ':00 ' + this.numPurchased[i] + ' cookies';
      pikeUlEl.appendChild(liEl);
    }
  }
};

var alki = {
  minCustomers: 23,
  maxCustomers: 65,
  avgCustomerCookies: 6.3,
  close: 20,
  numPurchased: [],
  numCustomer: [],
  render: function(){
    var pikeUlEl = document.getElementById('alki');

    for (var i = 0; i < this.numPurchased.length; i++){

      var liEl = document.createElement('li');
      liEl.textContent = hours[i] + ':00 ' + this.numPurchased[i] + ' cookies';
      pikeUlEl.appendChild(liEl);
    }
  }
};

var locations = [pikePlace, alki];

//arrays of random number function and totals it
function objectName(name) {
  var total = 0;

  for (var i = 0; i < 14; i++) {
    var randNum = getRandomNumber(name.minCustomers, name.maxCustomers);

    //fill the number of customers array
    name.numCustomer.push(randNum);

    //fill the number of cookies purchased per hour array
    name.numPurchased.push(Math.round(name.avgCustomerCookies*randNum));

    total += randNum;
  }
  return name.totalCookies = Math.round(name.avgCustomerCookies*total);
}
console.log('the min customer value ' + locations[0].minCustomers);

//render the locations
for(var i = 0; i < locations.length; i++){
  objectName(locations[i]);
  locations[i].render();
}


