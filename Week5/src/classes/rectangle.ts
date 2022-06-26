export interface IRectangle {
  value1: number,
  value2: number,
}

export class Rectangle implements IRectangle {
  value1: number;
  value2: number;
constructor(value1: number, value2: number) {
  this.value1 = value1
  this.value2 = value2
}

rectangle(value1: number, value2: number) {
  let answer = (value1 * value2).toFixed(2)
    return answer
}
}
