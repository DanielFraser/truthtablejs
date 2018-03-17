let util = require("util");

function createColumns(equation)
{
    let cols = getVars(equation);
    cols.push("result");
    console.log(cols);
    return cols
}

const result = () => {
    return {

    };
};

function createTable(equation)
{
    let words = getVars(equation);
    let n = 2 ** words.length;
    let bin;
    let res;
    let rows = [];
    for (let i = 0; i < n - 1; i++) {
        rows.push(result());
        bin = padNum(i.toString(2), words.length); //num to binary
        res = evalResult(bin, words, equation); //evaluate result
        for (let j = 0; j <= words.length; j++) {
            rows[i][words[j]] = bin.charAt(j)
        }
        rows[i]["result"] = res
    }
    return rows
}

function padNum(bin, n)
{
    while(bin.length < n)
    {
        bin = "0"+bin;
    }
    return bin
}

function evalResult(bin, words, eq)
{
    let equation = eq;
    for (let i = 0; i < words.length; i++) {
        equation = equation.replace(words[i], bin.charAt(i))
    }
    return eval(equation)
}

function getVars(equation)
{
    let re = /(\w+)/g;
    let words = new Set();
    let m;
    do {
        util.format('hello %s', 'world');
        m = re.exec(equation);
        if (m) {
            words.add(m[1]);
        }
    } while (m);
    return Array.from(words)
}

console.log(createTable("a&b&c&e&f").length);
// createColumns("a&b&cd");