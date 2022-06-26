var recordHistory = true
let answer = null
let history = [
  //{'type': 'Rectangle', 'value1': '56', 'value1Unit': 'meters', 'value2': '43', 'value2Unit': 'meters', 'value3': 'null', 'value3Unit': 'meters', 'answer': '346456'},
]
//Historty Functions
 const toggleRecordHistory = () => {
  recordHistory = !recordHistory
}
// Clears the history array and wipes DOM
 const clearHistory = () => {
  history = []
  document.getElementById('historyValues').innerHTML = '';
}

// Shows the history table in the DOM
 const showHistory = () => {
  let historyTable = document.getElementById('historyTable');
  let historyButton = document.getElementById('historyButton').innerHTML;
  if (historyButton == 'Show History') {
    document.getElementById('historyButton').innerHTML = 'Hide History';
  } else {
    document.getElementById('historyButton').innerHTML = 'Show History';
  }
  historyTable.classList.toggle('invisible');
  console.table(history)
}

// Updates the DOM with history table
 const updateHistory = () =>  {
  var table = document.getElementById('historyContents')
  console.log(history)
  document.getElementById('historyValues').innerHTML = ' ';
  for (var i = 0, l = history.length; i < l; i++) {
    var row = table.getElementsByTagName('tbody')[0].insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = history[i].type;
    cell2.innerHTML = history[i].answer;
}


}
// Updates the DOM with the calulation formula and the answer
 const updateAnswer = (type, baseUnit, answer, value1, value2, value3, s) => {
  if (type == 'Rectangle') {
    document.getElementById('answerType').innerHTML = 'Rectangle'
    document.getElementById('answerFormula').innerHTML = 'Area = L x W'
    document.getElementById('answerQuestion').innerHTML = 'Area = ' + value1 + ' x ' + value2
    document.getElementById('answerOutput').innerHTML = answer + ' ' + baseUnit
  } else if (type == 'Triangle') {
    document.getElementById('answerType').innerHTML = 'Triangle'
    document.getElementById('answerFormula').innerHTML = 's = a + b + c / 2' + '<br/>' + 'Area = √s(s-a)(s-b)(s-c)'
    document.getElementById('answerQuestion').innerHTML = 's = ' + value1 + ' + ' + value2 + ' + ' + value3 + ' / 2' + '<br/>' + 'Area = √' + s + '(' + s + ' - ' + value1 + ')(' + s + ' - ' + value2 + ')(' + s + ' - ' + value3 + ')'
    document.getElementById('answerOutput').innerHTML = answer + ' ' + baseUnit
  }else if (type == 'Trapezoid') {
    document.getElementById('answerType').innerHTML = 'Trapezoid'
    document.getElementById('answerFormula').innerHTML = 'Area = (b1 + b2 / 2) x h'
    document.getElementById('answerQuestion').innerHTML = 'Area = ' + '(' + value1 + ' + ' + value2 + ' / 2) ' + 'x ' + value3
    document.getElementById('answerOutput').innerHTML = answer + ' ' + baseUnit
  }
}

// Calculator functions
/* Calculator functions take in a base unit and input values and units. Checks for invalid inputs and converts inputs as necessary. After, performs relevent calulations to then update the history and display on website*/
// Rectangle Calculator
 const rectangle = (value1, value1Unit, value2, value2Unit) => {
   let baseUnit = value1Unit
  if (baseUnit != value1Unit) {
    value1 = unitConverter(baseUnit, value1, value1Unit);
  }if (value1Unit != value2Unit) {
    value2 = unitConverter(baseUnit, value2, value2Unit);
  }
  answer = parseFloat(answer =  value1 * value2).toFixed(2)
  if (recordHistory == true ) {
    history.push({'type': 'Rectangle', 'value1': value1, 'value1Unit': value1Unit, 'value2': value2, 'value2Unit': value2Unit, 'value3': null, 'value3Unit': null, 'answer': answer})
  }
    console.log(answer + ' ' + value1Unit)
updateHistory()
updateAnswer('Rectangle', baseUnit, answer, value1, value2)
}

//Triangle Calculator
/* Has additional logic to check if inputs are valid for triangle calculation*/
 const triangle = ( value1, value1Unit, value2, value2Unit, value3, value3Unit) => {
  let baseUnit = value1Unit
  if (baseUnit != value1Unit) {
    value1 = unitConverter(baseUnit, value1, value1Unit);
  } if (baseUnit != value2Unit) {
    value2 = unitConverter(baseUnit, value2, value2Unit);
  } if (baseUnit != value3Unit) {
    value3 = unitConverter(baseUnit, value3, value3Unit);
  }
  if (parseFloat(value1) + parseFloat(value2) > parseFloat(value3)) {
    var s = (parseFloat(value1) + parseFloat(value2) + parseFloat(value3)) / 2
    answer = parseFloat(Math.sqrt( s * (s - value1) * (s - value2) * (s - value3))).toFixed(2)
    if (answer == 0.00 || NaN) {
      console.log('Triangle', 'The given triangle is not valid triangle inequality')
      console.log('The given triangle is not valid triangle inequality')
    } else {
      console.log(answer + ' ' + value1Unit)
    }
    if (recordHistory == true ) {
      history.push({'type': 'Triangle', 'value1': value1, 'value1Unit': value1Unit, 'value2': value2, 'value2Unit': value2Unit, 'value3': value3, 'value3Unit': value3Unit, 'answer': answer})
    }
  } else {
    console.log('Triangle', 'The sum of any two edges will need to be larger than the third.')
    return console.log('The sum of any two edges will need to be larger than the third.')
  }
  updateHistory()
  updateAnswer('Triangle', baseUnit, answer, value1, value2, value3, s)
}






//Trapezoid Calculator
 const trapezoid = ( value1, value1Unit, value2, value2Unit, value3, value3Unit) => {
  let baseUnit = value1Unit
  if (baseUnit != value1Unit) {
    value1 = unitConverter(baseUnit, value1, value1Unit);
  } if (baseUnit != value2Unit) {
    value2 = unitConverter(baseUnit, value2, value2Unit);
  } if (baseUnit != value3Unit) {
    value3 = unitConverter(baseUnit, value3, value3Unit);
  }
  answer = parseFloat(((parseFloat(value1) + parseFloat(value2)) / 2) * value3).toFixed(2)
  if (recordHistory == true ) {
    history.push({'type': 'Trapezoid', 'value1': value1, 'value1Unit': value1Unit, 'value2': value2, 'value2Unit': value2Unit, 'value3': value3, 'value3Unit': value3Unit, 'answer': answer})
  }
  console.log(answer + ' ' + value1Unit)
  updateHistory()
  updateAnswer('Trapezoid', baseUnit, answer, value1, value2, value3)
}




//Unit Converter retreives the answers value to use as a base unit. Furthermore converts input values to match the base unit.
 const unitConverter = (baseUnit, value, valueUnit) => {
  let rootValueType = baseUnit
  if (rootValueType == 'centimeters' && valueUnit == 'meters'){
    return value * 100 
  } else if (rootValueType == 'centimeters' && valueUnit == 'kilometers'){
    return value * 100000
  } else if (rootValueType == 'meters' && valueUnit == 'centimeters'){
    return value / 100 
  } else if (rootValueType == 'meters' && valueUnit == 'kilometers'){
    return value * 1000
  }else if (rootValueType == 'kilometers' && valueUnit == 'centimeters'){
    return value / 100000
  } else if (rootValueType == 'kilometers' && valueUnit == 'meters'){
    return value * 1000
  }
}


























//