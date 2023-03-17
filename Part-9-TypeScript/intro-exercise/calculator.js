// Since are being removed at compilation step
// This does NOT guarantee that operation won't be something else that the values declarad
// thus you have to explicitly  handle those scenarios as weel
var calculator = function (a, b, op) {
    switch (op) {
        case 'divide':
            if (b === 0)
                throw new Error('this cannot be done');
            return a / b;
        case 'multiply':
            return a * b;
        case 'add':
            return a + b;
        default:
            throw new Error('Operation is not multiply, add or divide!'); // EXPLICIT Handling of wrong Operation type
    }
};
try {
    calculator(2, 5, 'multiply');
}
catch (error) {
    // 'unknown' is type-safe counterpart of 'any'
    var errMsg = 'Some err';
    // Since the default type of the error object in TypeScript is unknown
    // , we have to narrow the type to access the field
    // Type narrowing
    if (error instanceof Error)
        errMsg += error.message;
    console.log(errMsg);
}
console.log(process.argv);
//# sourceMappingURL=calculator.js.map