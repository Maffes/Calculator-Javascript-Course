


export interface ITrapezoid {
  value1: number,
  value2: number,
  value3: number,
}

export class Trapezoid implements ITrapezoid {
  value1: number;
  value2: number;
  value3: number;

constructor(value1: number, value2: number, value3: number) {
  this.value1 = value1
  this.value2 = value2
  this.value3 = value3
}

trapezoid(value1: number, value2: number, value3: number) {
  let answer = parseFloat(((parseFloat(value1) + parseFloat(value2)) / 2) * value3).toFixed(2)

  return answer


}
}
