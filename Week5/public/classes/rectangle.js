export class Rectangle {
    constructor(value1, value2) {
        this.value1 = value1;
        this.value2 = value2;
    }
    rectangle(value1, value2) {
        let answer = (value1 * value2).toFixed(2);
        return answer;
    }
}
