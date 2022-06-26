import { Rectangle } from "./classes/rectangle.js";
import { Triangle } from "./classes/triangle.js";
import { Trapezoid } from "./classes/trapezoid.js";
var recordHistory = true;
let answer = null;
let historyObject = [];
class AreaCalculator {
    constructor() {
        // Deletes a specific row in history array
        this.deleteCalculation = (index) => {
            historyObject.splice(index, 1);
            this.updateHistory();
        };
        var path = window.location.pathname;
        if (path == '/week5/public/index.html') {
            const showHistoryBtn = document.querySelector('#historyButton');
            showHistoryBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showHistory();
            });
            const deleteBtn = document.getElementsByClassName('deleteBtn');
            document.addEventListener('click', (e) => {
                if (e.target && e.target.id == 'deleteBtn') {
                    this.deleteCalculation(e.target.value);
                }
            });
            const recordHistoryCheckbox = document.querySelector('#recordHistory');
            recordHistoryCheckbox.addEventListener('click', () => {
                this.toggleRecordHistory();
            });
            const clearHistoryBtn = document.querySelector('#clearHistory');
            clearHistoryBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.clearHistory();
            });
            const rectangleForm = document.querySelector('.rectangleForm');
            const rectangleAnswerUnitType = document.querySelector('#rectangleAnswerUnitType');
            const rectangleValue1 = document.querySelector('#rectangleValue1');
            const rectangleValue1Type = document.querySelector('#rectangleValue1Type');
            const rectangleValue2 = document.querySelector('#rectangleValue2');
            const rectangleValue2Type = document.querySelector('#rectangleValue2Type');
            rectangleForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.rectangle(rectangleAnswerUnitType.value, rectangleValue1.value, rectangleValue1Type.value, rectangleValue2.value, rectangleValue2Type.value, false);
            });
            const triangleForm = document.querySelector('.triangleForm');
            const triangleAnswerUnitType = document.getElementById("triangleAnswerUnitType");
            const triangleValue1 = document.getElementById("triangleValue1");
            const triangleValue1Type = document.getElementById("triangleValue1Type");
            const triangleValue2 = document.getElementById("triangleValue2");
            const triangleValue2Type = document.getElementById("triangleValue2Type");
            const triangleValue3 = document.getElementById("triangleValue3");
            const triangleValue3Type = document.getElementById("triangleValue3Type");
            triangleForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.triangle(triangleAnswerUnitType.value, triangleValue1.value, triangleValue1Type.value, triangleValue2.value, triangleValue2Type.value, triangleValue3.value, triangleValue3Type.value, false);
            });
            const trapezoidForm = document.querySelector('.trapezoidForm');
            const trapezoidAnswerUnitType = document.getElementById("trapezoidAnswerUnitType");
            const trapezoidValue1 = document.getElementById("trapezoidValue1");
            const trapezoidValue1Type = document.getElementById("trapezoidValue1Type");
            const trapezoidValue2 = document.getElementById("trapezoidValue2");
            const trapezoidValue2Type = document.getElementById("trapezoidValue2Type");
            const trapezoidValue3 = document.getElementById("trapezoidValue3");
            const trapezoidValue3Type = document.getElementById("trapezoidValue3Type");
            trapezoidForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.trapezoid(trapezoidAnswerUnitType.value, trapezoidValue1.value, trapezoidValue1Type.value, trapezoidValue2.value, trapezoidValue2Type.value, trapezoidValue3.value, trapezoidValue3Type.value, false);
            });
        }
        if (path != '/week5/public/index.html') {
            const importButton = document.querySelector('#importButton');
            importButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.importData();
            });
        }
    }
    //Historty Functions
    toggleRecordHistory() {
        recordHistory = !recordHistory;
    }
    // Clears the history array and wipes DOM
    clearHistory() {
        historyObject = [];
        document.getElementById('historyValues').innerHTML = '';
    }
    // Shows the history table in the DOM
    showHistory() {
        let historyTable = document.getElementById('historyTable');
        let historyButton = document.getElementById('historyButton').innerHTML;
        if (historyButton == 'Show History') {
            document.getElementById('historyButton').innerHTML = 'Hide History';
        }
        else {
            document.getElementById('historyButton').innerHTML = 'Show History';
        }
        historyTable.classList.toggle('invisible');
        console.log(historyObject);
    }
    // Updates the DOM with history table
    updateHistory() {
        var table = document.getElementById('historyContents');
        console.log(historyObject);
        document.getElementById('historyValues').innerHTML = ' ';
        for (var i = 0, l = historyObject.length; i < l; i++) {
            var row = table.getElementsByTagName('tbody')[0].insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = historyObject[i].type;
            cell2.innerHTML = historyObject[i].answer;
            cell3.innerHTML = '<button id="deleteBtn" value="' + i + '" class="deleteBtn bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded">Delete</button>';
        }
    }
    // Updates the DOM with the calulation formula and the answer
    updateAnswer(type, baseUnit, answer, value1, value2, value3, s) {
        if (type == 'Rectangle') {
            document.getElementById('answerType').innerHTML = 'Rectangle';
            document.getElementById('answerFormula').innerHTML = 'Area = L x W';
            document.getElementById('answerQuestion').innerHTML = 'Area = ' + value1 + ' x ' + value2;
            document.getElementById('answerOutput').innerHTML = answer + ' ' + baseUnit;
        }
        else if (type == 'Triangle') {
            document.getElementById('answerType').innerHTML = 'Triangle';
            document.getElementById('answerFormula').innerHTML = 's = a + b + c / 2' + '<br/>' + 'Area = √s(s-a)(s-b)(s-c)';
            document.getElementById('answerQuestion').innerHTML = 's = ' + value1 + ' + ' + value2 + ' + ' + value3 + ' / 2' + '<br/>' + 'Area = √' + s + '(' + s + ' - ' + value1 + ')(' + s + ' - ' + value2 + ')(' + s + ' - ' + value3 + ')';
            document.getElementById('answerOutput').innerHTML = answer + ' ' + baseUnit;
        }
        else if (type == 'Trapezoid') {
            document.getElementById('answerType').innerHTML = 'Trapezoid';
            document.getElementById('answerFormula').innerHTML = 'Area = (b1 + b2 / 2) x h';
            document.getElementById('answerQuestion').innerHTML = 'Area = ' + '(' + value1 + ' + ' + value2 + ' / 2) ' + 'x ' + value3;
            document.getElementById('answerOutput').innerHTML = answer + ' ' + baseUnit;
        }
    }
    //Error Message retreives error message and displays in relevent sections on website
    errorMessage(type, message) {
        if (type == 'Rectangle') {
            document.getElementById('errorMessageRectangle').classList.remove('hidden');
            document.getElementById('errorMessageRectangleText').innerHTML = message;
        }
        else if (type == 'Triangle') {
            document.getElementById('errorMessageTriangle').classList.remove('hidden');
            console.log(message);
            document.getElementById('errorMessageTriangleText').innerHTML = message;
        }
        else if (type == 'Trapezoid') {
            document.getElementById('errorMessageTrapezoid').classList.remove('hidden');
            document.getElementById('errorMessageTrapezoidText').innerHTML = message;
        }
    }
    //This function makes a axios get request and runs functions based on received values
    importData() {
        axios.get('https://95226847-b3a1-443c-b8c3-54ca0bdce938.mock.pstmn.io/areaCalculations').then((res) => {
            console.log(JSON.stringify(res.data));
            let response = res.data;
            response.forEach(element => {
                if (element.type == 'Rectangle') {
                    let answer = this.rectangle(element.value1Unit, element.value1, element.value1Unit, element.value2, element.value2Unit, true);
                    this.updateImportTable(element.type, element.value1, element.value1Unit, element.value2, element.value2Unit, ' ', ' ', answer);
                }
                else if (element.type == 'Triangle') {
                    let answer = this.triangle(element.value1Unit, element.value1, element.value1Unit, element.value2, element.value2Unit, element.value3, element.value3Unit, true);
                    this.updateImportTable(element.type, element.value1, element.value1Unit, element.value2, element.value2Unit, element.value3, element.value3Unit, answer);
                }
                else if (element.type == 'Trapezoid') {
                    let answer = this.trapezoid(element.value1Unit, element.value1, element.value1Unit, element.value2, element.value2Unit, element.value3, element.value3Unit, true);
                    this.updateImportTable(element.type, element.value1, element.value1Unit, element.value2, element.value2Unit, element.value3, element.value3Unit, answer);
                }
            });
        });
    }
    // Is called by the importData() function to update the DOM table.
    updateImportTable(type, value1, value1Unit, value2, value2Unit, value3, value3Unit, answer) {
        var table = document.getElementById('importContents');
        var row = table.getElementsByTagName('tbody')[0].insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        cell1.innerHTML = type;
        cell1.className = 'border px-2 py-2';
        cell2.innerHTML = value1;
        cell2.className = 'border px-2 py-2';
        cell3.innerHTML = value1Unit;
        cell3.className = 'border px-2 py-2';
        cell4.innerHTML = value2;
        cell4.className = 'border px-2 py-2';
        cell5.innerHTML = value2Unit;
        cell5.className = 'border px-2 py-2';
        cell6.innerHTML = value3;
        cell6.className = 'border px-2 py-2';
        cell7.innerHTML = value3Unit;
        cell7.className = 'border px-2 py-2';
        cell8.innerHTML = answer;
        cell8.className = 'border px-2 py-2';
    }
    // Calculator functions
    /* Calculator functions take in a base unit and input values and units. Checks for invalid inputs and converts inputs as necessary. After, performs relevent calulations to then update the history and display on website*/
    // Rectangle Calculator
    rectangle(baseUnit, value1, value1Unit, value2, value2Unit, dataImport) {
        let value3 = '';
        let value3Unit = '';
        if (value1 <= 0 || value2 <= 0) {
            this.errorMessage('Rectangle', 'Numbers cannot be 0 or a negative number');
            return;
        }
        if (baseUnit != value1Unit) {
            value1 = this.unitConverter(baseUnit, value1, value1Unit);
        }
        if (baseUnit != value2Unit) {
            value2 = this.unitConverter(baseUnit, value2, value2Unit);
        }
        let variable = { value1: value1, value2: value2 };
        let rectangleCalculator = new Rectangle(value1, value2);
        let answer = rectangleCalculator.rectangle(value1, value2);
        if (recordHistory == true) {
            historyObject.push({ 'type': 'Rectangle', 'value1': value1, 'value1Unit': value1Unit, 'value2': value2, 'value2Unit': value2Unit, 'value3': ' ', 'value3Unit': ' ', 'answer': answer });
        }
        if (dataImport != true) {
            this.updateHistory();
            this.updateAnswer('Rectangle', baseUnit, answer, value1, value2, value3, value3Unit);
            console.log(answer + ' ' + value1Unit);
            document.getElementById('errorMessageRectangle').classList.add('hidden');
        }
        return answer;
    }
    //Triangle Calculator
    /* Has additional logic to check if inputs are valid for triangle calculation*/
    triangle(baseUnit, value1, value1Unit, value2, value2Unit, value3, value3Unit, dataImport) {
        if (value1 <= 0 || value2 <= 0 || value3 <= 0) {
            this.errorMessage('Triangle', 'Numbers cannot be 0 or a negative number');
            return;
        }
        if (baseUnit != value1Unit) {
            value1 = this.unitConverter(baseUnit, value1, value1Unit);
        }
        if (baseUnit != value2Unit) {
            value2 = this.unitConverter(baseUnit, value2, value2Unit);
        }
        if (baseUnit != value3Unit) {
            value3 = this.unitConverter(baseUnit, value3, value3Unit);
        }
        if (parseFloat(value1) + parseFloat(value2) > parseFloat(value3)) {
            let variable = { value1: value1, value2: value2, value3: value3 };
            let triangleCalculator = new Triangle(value1, value2, value3);
            var s = triangleCalculator.triangle(value1, value2, value3)[1];
            var answer = triangleCalculator.triangle(value1, value2, value3)[0];
            if (answer == 0.00 || NaN) {
                this.errorMessage('Triangle', 'The given triangle is not valid triangle inequality');
                return console.log('The given triangle is not valid triangle inequality');
            }
            else if (dataImport != true) {
                console.log(answer + ' ' + value1Unit);
            }
            if (recordHistory == true) {
                historyObject.push({ 'type': 'Triangle', 'value1': value1, 'value1Unit': value1Unit, 'value2': value2, 'value2Unit': value2Unit, 'value3': value3, 'value3Unit': value3Unit, 'answer': answer });
            }
        }
        else {
            this.errorMessage('Triangle', 'The sum of any two edges will need to be larger than the third.');
            return console.log('The sum of any two edges will need to be larger than the third.');
        }
        if (dataImport != true) {
            this.updateHistory();
            this.updateAnswer('Triangle', baseUnit, answer, value1, value2, value3, s);
            document.getElementById('errorMessageTriangle').classList.add('hidden');
        }
        return answer;
    }
    //Trapezoid Calculator
    trapezoid(baseUnit, value1, value1Unit, value2, value2Unit, value3, value3Unit, dataImport) {
        console.log(value1);
        console.log(value2);
        console.log(value3);
        if (value1 <= 0 || value2 <= 0 || value3 <= 0) {
            this.errorMessage('Trapezoid', 'Numbers cannot be 0 or a negative number');
            return;
        }
        if (baseUnit != value1Unit) {
            value1 = this.unitConverter(baseUnit, value1, value1Unit);
        }
        if (baseUnit != value2Unit) {
            value2 = this.unitConverter(baseUnit, value2, value2Unit);
        }
        if (baseUnit != value3Unit) {
            value3 = this.unitConverter(baseUnit, value3, value3Unit);
        }
        let variable = { value1: value1, value2: value2, value3: value3 };
        let trapezoidCalculator = new Trapezoid(value1, value2, value3);
        let answer = trapezoidCalculator.trapezoid(value1, value2, value3);
        if (recordHistory == true) {
            historyObject.push({ 'type': 'Trapezoid', 'value1': value1, 'value1Unit': value1Unit, 'value2': value2, 'value2Unit': value2Unit, 'value3': value3, 'value3Unit': value3Unit, 'answer': answer });
        }
        if (dataImport != true) {
            this.updateHistory();
            this.updateAnswer('Trapezoid', baseUnit, answer, value1, value2, value3, value3Unit);
            console.log(answer + ' ' + value1Unit);
            document.getElementById('errorMessageTrapezoid').classList.add('hidden');
        }
        return answer;
    }
    //Unit Converter retreives the answers value to use as a base unit. Furthermore converts input values to match the base unit.
    unitConverter(baseUnit, value, valueUnit) {
        let rootValueType = baseUnit;
        if (rootValueType == 'centimeters' && valueUnit == 'meters') {
            return value * 100;
        }
        else if (rootValueType == 'centimeters' && valueUnit == 'kilometers') {
            return value * 100000;
        }
        else if (rootValueType == 'meters' && valueUnit == 'centimeters') {
            return value / 100;
        }
        else if (rootValueType == 'meters' && valueUnit == 'kilometers') {
            return value * 1000;
        }
        else if (rootValueType == 'kilometers' && valueUnit == 'centimeters') {
            return value / 100000;
        }
        else if (rootValueType == 'kilometers' && valueUnit == 'meters') {
            return value * 1000;
        }
    }
}
const myCalculator = new AreaCalculator();
