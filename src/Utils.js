import "./index.css";
import util from 'util'

export function createColumns(equation)
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

export function createTable(equation)
{
    let words = getVars(equation);
    let n = 2 ** words.length;
    let bin;
    let res;
    let rows = [];
    for (let i = 0; i < n; i++) {
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
        equation = equation.replace(new RegExp("\\b"+words[i]+"", 'g'), bin.charAt(i));
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

export function valid(equation)
{
    let par = parentheses(equation); //check parentheses
    let eq = validForm(equation);
    return par && eq
}

function validForm(equation) {
    if (equation.replace(/\s/g, '').length === 1)
        return true;
    let reg = /^\(*[a-zA-Z]\w*(?:\s*[!&|^]\s*\(*[a-zA-Z]\w*\)*)+$/g;
    return !!equation.match(reg)

}

function parentheses(equation)
{
    equation = equation.replace(/\s/g, '');
    let curPar = 0;
    let d;
    let c;
    for (let i = 0; i < equation.length; i++) {
        c = equation.charAt(i);
        if (c === '(') {
            if (i !== 0) {
                d = equation.charAt(i - 1);
                if (!d.match(/[!&|^]/g))
                    return false
            }
            curPar++;
        }
        else if (c === ')')
            curPar--
    }
    //console.log(curPar.length)
    return curPar === 0
}