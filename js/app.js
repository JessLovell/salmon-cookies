'use strict';

//global variables for the DOM to access
var getTable = document.getElementById('sales');
var locationForm = document.getElementById('addNewLocation');
var clearAllChanges = document.getElementById('undoAllChanges');

//create an array for hours
var hours = ['06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

//array to hold all objects of BusinessLocations()
var allLocations = [];

//random number generator
function getRandomNumber(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random()*(max - min + 1)) + min; //max and min are inclusive
}

//Constructor Function to create location objects
function BusinessLocations (locationName, minCustomers, maxCustomers, avgCustomerCookies, selectorName) {
  this.locationName = locationName;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCustomerCookies = avgCustomerCookies;
  this.numPurchased = [];
  this.numCustomer = [];
  allLocations.push(this);
}

//creating new location objects
new BusinessLocations('Pike Place', 23,65, 6.3);
new BusinessLocations('SeaTac Airport', 3, 24, 1.2);
new BusinessLocations('Seattle Center', 11, 38, 3.7);
new BusinessLocations('Capitol Hill', 20, 38, 2.3);
new BusinessLocations('Alki', 20, 38, 2.3);

//arrays of random number function and totals it
function fillRandom(object) {
  var total = 0;

  //log create array of random number
  for (var i = 0; i < hours.length; i++) {
    var randNum = getRandomNumber(object.minCustomers, object.maxCustomers);
    object.numCustomer.push(randNum);
    object.numPurchased.push(Math.round(object.avgCustomerCookies*randNum));

    total += randNum; //track the total cookies sold
  }
  //output the total cookies
  object.totalCookies = Math.round(object.avgCustomerCookies*total);
  console.log('The ' + object.selectorName + ' location sold a total of ' + object.totalCookies + ' today.');
}

//create the table
BusinessLocations.prototype.render = function(){
  var trEl = document.createElement('tr');

  //Location column
  var tdEl = document.createElement('td');
  tdEl.textContent = this.locationName;
  trEl.appendChild(tdEl);

  //Cookies sold Per hour
  for (var i = 0; i < this.numPurchased.length; i++){
    tdEl = document.createElement('td');
    tdEl.textContent = this.numPurchased[i];
    trEl.appendChild(tdEl);
  }

  //Total Column
  tdEl = document.createElement('td');
  tdEl.textContent = this.totalCookies;
  trEl.appendChild(tdEl);

  //Log the table to Sales
  getTable.appendChild(trEl);
};

//make the header row
function makeHeaderRow(){
  var trEl = document.createElement('tr');

  //Location Column
  var thEl = document.createElement('th');
  thEl.textContent = ' ';
  trEl.appendChild(thEl);

  //Hours Columns
  for (var i = 0; i < hours.length; i++){
    thEl = document.createElement('th');
    thEl.textContent = hours[i] + ':00 ';
    trEl.appendChild(thEl);
  }

  //Total Column
  thEl = document.createElement('th');
  thEl.textContent = 'Total';
  trEl.appendChild(thEl);

  getTable.appendChild(trEl);
}

function renderAllLocations(){
  for (var i = 0; i < allLocations.length; i++){
    fillRandom(allLocations[i]); //fille numCustomers, numPurchased, and sums
    allLocations[i].render();
  }
}

//make the Total Footer row
function makeFootererRow(){
  var trEl = document.createElement('tr');

  //Location Column
  var thEl = document.createElement('th');
  thEl.textContent = 'Total:';
  trEl.appendChild(thEl);

  //Hours Columns
  for (var i = 0; i < hours.length; i++){
    thEl = document.createElement('th');
    thEl.textContent = (fillFooter()[0])[i];
    trEl.appendChild(thEl);
  }

  //Total Column
  thEl = document.createElement('th');
  thEl.textContent = fillFooter()[1];
  trEl.appendChild(thEl);

  getTable.appendChild(trEl);
}


makeHeaderRow();
renderAllLocations();
makeFootererRow();  

//create an array to hold all the totals
function fillFooter (){
  var hoursTotal = [];
  var allCookieTotal = 0;

  for (var j = 0; j < hours.length; j++){
    var total = 0;

    for (var i = 0; i < allLocations.length; i++){
      total += allLocations[i].numPurchased[j];
      allCookieTotal += allLocations[i].totalCookies;
    }
    hoursTotal.push(total);
  }
  return [hoursTotal, allCookieTotal];
  console.log(`hours total ${hoursTotal}, ${allCookieTotal}` );
}


// function handleCommentSubmit (event){
//   event.preventDefault();

//   var location = event.target.locationName.value;
//   var min = event.target.minCust.value;
//   var max = event.target.maxCust.value;
//   var avg = event.target.averageCookie.value;
//   console.log(` ${location}, ${min}, ${max}, ${avg}`);

//   var newBiz = new BusinessLocations(location, min, max, avg);

//   //empty form fields
//   event.target.locationName.value = null;
//   event.target.minCust.value = null;
//   event.target.maxCust.value = null;
//   event.target.averageCookie.value = null;

//   allLocations.push(newBiz);
  
// }

// locationForm.addEventListener('submit', handleCommentSubmit);
