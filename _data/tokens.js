const hsl = (h,s,l) => `hsl(${h}, ${s}%, ${l}%)`;
const hslStringToObject = str => {
    const keys = ['h','s','l','a'];
    return str.split(',')
    .map(part => parseInt(part.trim().match(/\d+/g)))
    .reduce((obj, currentVal, index)=> {
        obj[keys[index]] = currentVal;
        return obj;
    }, {});
}

module.exports = function () {
    const paletteHSL = {
        "open-boreal": {
            h: 86,
            s: 27,
            l: 50,
        },
        "closed-boreal": {
            h: 57,
            s: 23,
            l: 33,
        },
        "aspen-parkland": {
            h: 195,
            s: 56,
            l: 43,
        },
        "pacific-rain-forest": {
            h: 124,
            s: 42,
            l: 40,
        },
        "grasslands": {
            h: 47,
            s: 74,
            l: 61,
        },
        "oak-savannah": {
            h: 46,
            s: 41,
            l: 45,
        },
        "mesquite-grassland": {
            h: 20,
            s: 65,
            l: 68,
        },
        "pinyon-juniper": {
            h: 198,
            s: 100,
            l: 48,
        },
        "chaparral-oak-woodland": {
            h: 13,
            s: 74,
            l: 58,
        },
        "southern-evergreen": {
            h: 16,
            s: 50,
            l: 50,
        },
        "mexican-pine-and-pine-oak": {
            h: 342,
            s: 30,
            l: 58,
        },
        "tropical-areas-combined": {
            h: 226,
            s: 29,
            l: 37,
        },
        "montane-woodland": {
            h: 50,
            s: 21,
            l: 21,
        },
        light: {
            h: 270,
            s: 90,
            l: 94,
        },
        dark: {
            h: 180,
            s: 90,
            l: 10,
        },
    };
    const palette = Object.entries(paletteHSL)
    .reduce((obj, color) => {
            const name = color[0];
            obj[name] = hsl(color[1].h, color[1].s, color[1].l);
            return obj;
        }, {});

    const lightTheme = {
        text: '#222',
        bg: palette['mexican-pine-and-pine-oak'],
        highlight: palette['montane-woodland'],
        'link--visited': palette['chaparral-oak-woodland'],
    };
    const color = {
        text: palette['montane-woodland'],
        

    };
    const font = {
        serif: "Garamond, Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif",
        system: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif"
    }


    return {
        color,
        paletteHSL,
        palette,
        font,
        "theme--light": lightTheme,
    };
}