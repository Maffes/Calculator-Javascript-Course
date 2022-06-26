export interface ITriangle {
  value1: number,
  value2: number,
  value3: number,
}

export class Triangle implements ITriangle {
  value1: number;
  value2: number;
  value3: number;

constructor(value1: number, value2: number, value3: number) {
  this.value1 = value1
  this.value2 = value2
  this.value3 = value3
}

triangle(value1: number, value2: number, value3: number) {
    var s = (parseFloat(value1) + parseFloat(value2) + parseFloat(value3)) / 2
    let answer = parseFloat(Math.sqrt( s * (s - value1) * (s - value2) * (s - value3))).toFixed(2)

      return [answer, s];
}
}