export class Trapezoid {
    constructor(value1, value2, value3) {
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
    }
    trapezoid(value1, value2, value3) {
        let answer = parseFloat(((parseFloat(value1) + parseFloat(value2)) / 2) * value3).toFixed(2);
        return answer;
    }
}
