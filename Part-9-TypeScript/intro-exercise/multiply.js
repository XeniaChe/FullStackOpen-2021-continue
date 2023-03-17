var multiply = function (a, b, textToPrint) {
    console.log(a * b, textToPrint);
};
/*
  const a: number = +process.argv[2]; // those will be the args you pass when running a script
  const b: number = +process.argv[3]; // e.g. npm run multiply 2 3
  multiply(a, b, `Multiplied ${a} and ${b}, the result is:`);
*/
console.log(process.argv);
var convertMultiplyValues = function (args) {
    if (args.length < 4)
        throw new Error('not enought arguments');
    if (args.length > 4)
        throw new Error('too many arguments');
    if (!isNaN(+args[3]) && !isNaN(+args[4])) {
        return { value1: +args[3], value2: +args[4] };
    }
    else {
        throw new Error('Provided values were not numbers!');
    }
};
var _a = convertMultiplyValues(process.argv), value1 = _a.value1, value2 = _a.value2;
multiply(value1, value2, "Multiplied ".concat(value1, " and ").concat(value2, ", the result is:"));
//# sourceMappingURL=multiply.js.map