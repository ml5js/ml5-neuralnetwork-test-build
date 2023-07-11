const fm = ml5.faceMesh;
const input = {
  r: 255,
  g: 0,
  b: 0,
}
const nmsl = fm(input)
console.log('test result', nmsl)