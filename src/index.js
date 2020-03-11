function eval() {
// Do not use eval!!!
  return;
}

const OPERATIONS = {
  '+' : sum,
  '-' : sub,
  '*' : mult,
  '/' : div,
}

function sum(first, second) {
  return first + second;
}
function sub(first, second) {
  return first - second;
}
function mult(first, second) {
  return first * second;
}
function div(first, second) {
  if (second == 0) throw Error('TypeError: Division by zero.');
  return first / second;
}

function convert(array) {
  let final = [];
  let operations = []; 
  for(let i = 0 ; i < array.length; i++) {
    if (Number.isInteger(array[i])) {
      final.push(array[i]);
    }
    else
      if (array[i] == '*' || array[i] == '/') {
        if (operations.length == 0) {
          operations.push(array[i]);
        }
        else {
          if(operations[operations.length - 1] == '*' || operations[operations.length - 1] == '/') {
            let tempArray = []
            tempArray.push(operations.lastIndexOf('('),operations.lastIndexOf('+'),operations.lastIndexOf('-'));
            let temp = Math.max(...tempArray);
            if (temp != -1) {
              final.push(...operations.slice(temp + 1).reverse());
              operations.splice(temp + 1);
            }
            else {
            final.push(...operations.reverse());
            operations = [];
            }
          }
          operations.push(array[i]);
        }
      }
      else 
        if (array[i] == '+' || array[i] == '-') {
          if (operations.length == 0) {
            operations.push(array[i]);
          }
          else 
            if (operations[operations.length - 1] == '*' || operations[operations.length - 1] == '/' ||
            operations[operations.length - 1] == '+' || operations[operations.length - 1] == '-') {
              if (operations.lastIndexOf('(') == -1) {
                final.push(...operations.reverse());
                operations = [];
                operations.push(array[i]);
              }
              else {
                final.push(...operations.slice(operations.lastIndexOf('(') + 1).reverse());
                operations.splice(operations.lastIndexOf('(') + 1);
                operations.push(array[i]);
              }
            }
            else {
              operations.push(array[i]);
            }
        }
        else
          if (array[i] == '(') {
            operations.push(array[i]);
          }
          else
            if (array[i] == ')') {
              final.push(...operations.slice(operations.lastIndexOf('(')+ 1).reverse());
              operations.splice(operations.lastIndexOf('('));
            }
  }
  final.push(...operations.reverse());
  return final;
}

function toArray(string) {
  array = [];
  let temp = 0; 
  for(let i = 0; i < string.length; i++) {
    if (!Number.isNaN(Number(string[i]))) {
      temp = parseInt(string.slice(i));
      i += String(temp).length - 1; 
      array.push(temp);
    }
    else
      array.push(string[i]); 
  }
  return array; 
}

function expressionCalculator(expr) {
  expr = expr.replace(/ /g, '');
  let openBracketsCount = 0, closeBracketsCount = 0;
  expr.split('').forEach(element => {
    switch (element) {
      case '(':
        openBracketsCount++;
        break;
      case ')':
        closeBracketsCount++;
        break;
    }
  });
  if (openBracketsCount !== closeBracketsCount) {
    throw Error('ExpressionError: Brackets must be paired');
  }
  expr = toArray(expr);
  console.log(expr);
  expr = convert(expr); 
  console.log(expr);
  for(let i = 0; i < expr.length; i++) {
    if (expr[i] in OPERATIONS) {
      expr[i-2] = OPERATIONS[expr[i]](expr[i - 2], expr[i - 1]);
      expr.splice(i - 1, 2);
      i-=2; 
    }
  }
  console.log(expr);
  return expr[0];
}


module.exports = {
  expressionCalculator
}