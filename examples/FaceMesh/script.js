const fm = ml5.faceMesh;
const input = {
  r: 255,
  g: 0,
  b: 0,
}
const faces = fm(input)
console.log('test result', faces)
