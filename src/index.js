function eval() {
// Do not use eval!!!
  return;
}

const OPERATIONS = {
  '+' : sum,
  '-' : dec,
  '*' : mult,
  '/' : div,
}

function sum(first, second) {
  return first + second;
}
function dec(first, second) {
  return first - second;
}
function mult(first, second) {
  return first * second;
}
function div(first, second) {
  return first / second;
}

function expressionCalculator(expr) {
  expr = expr.replace(/ /g, '');
  return simpleEval(expr); 
}

function simpleEval (string) {
  let first = parseFloat(string);
  let second = parseFloat(string.slice(String(first).length + 1, string.length));
  let operation = string[String(first).length];
  return OPERATIONS[operation](first, second);
}

module.exports = {
  expressionCalculator
}