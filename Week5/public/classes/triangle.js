export class Triangle {
    constructor(value1, value2, value3) {
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
    }
    triangle(value1, value2, value3) {
        var s = (parseFloat(value1) + parseFloat(value2) + parseFloat(value3)) / 2;
        let answer = parseFloat(Math.sqrt(s * (s - value1) * (s - value2) * (s - value3))).toFixed(2);
        return [answer, s];
    }
}
