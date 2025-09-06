const hsl = (h, s, l) => `hsl(${h}, ${s}%, ${l}%)`;
const flattenTokens = (obj, parent, result = {}) => {
    for (let key in obj) {
        if (key !== "value") {
            console.log(key);
            let name = parent ? parent + "_" + key : key;
            flattenTokens(obj[key], name, result);
        } else {
            result[parent] = obj[key];
        }
    }
    return result;
};

const transformTokensToCSS = (tokens) =>
    Object.entries(tokens).reduce((prev, [key, value]) => {
        const newKey = `--${key}`;
        const newValue = `var(${value})`;
        prev[newKey] = newValue;
        return prev;
    }, {});

const shades = {
    electricBlue: ["#8DEFF5"],
    hotPink: ["#ff3ded"],
    preciousPersimmon: [
        "rgb(255, 251, 250)",
        "rgb(255, 233, 227)",
        "rgb(255, 200, 186)",
        "rgb(255, 177, 157)",
        "rgb(255, 110, 73)",
        "rgb(229, 98, 65)",
        "rgb(188, 80, 53)",
        "rgb(157, 67, 44)",
        "rgb(110, 47, 31)",
        "rgb(70, 30, 20)",
    ],
    hammanBlue: [
        "rgb(242, 252, 252)",
        "rgb(211, 244, 244)",
        "rgb(144, 226, 228)",
        "rgb(93, 213, 215)",
        "rgb(73, 169, 171)",
        "rgb(65, 152, 153)",
        "rgb(54, 124, 126)",
        "rgb(45, 104, 105)",
        "rgb(31, 72, 73)",
        "rgb(20, 46, 46)",
    ],
    ruthlessEmpress: [
        "rgb(250, 250, 251)",
        "rgb(237, 237, 241)",
        "rgb(212, 212, 220)",
        "rgb(195, 195, 207)",
        "rgb(153, 153, 174)",
        "rgb(137, 137, 161)",
        "rgb(111, 111, 141)",
        "rgb(92, 92, 125)",
        "rgb(62, 62, 101)",
        "rgb(38, 38, 72)",
    ],
    whaleShark: [
        "rgb(249, 250, 251)",
        "rgb(236, 238, 241)",
        "rgb(208, 213, 220)",
        "rgb(190, 196, 206)",
        "rgb(145, 156, 173)",
        "rgb(127, 140, 159)",
        "rgb(101, 115, 137)",
        "rgb(84, 96, 114)",
        "rgb(58, 67, 79)",
        "rgb(37, 42, 50)",
    ],
};

const cssShades = Object.entries(shades).reduce((prev, [name, values]) => {
    values.forEach((rgbString, index) => {
        prev[`--${name}--${index + 1} `] = rgbString;
    });
    return prev;
}, {});

module.exports = function () {
    return {
        ...cssShades,
    };
};
