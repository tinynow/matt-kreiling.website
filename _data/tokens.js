module.exports = function () {

    const palette = {
        "open-boreal": "hsl(86, 27%, 50%)",
        "closed-boreal": "hsl(57, 23%, 33%)",
        "aspen-parkland": "hsl(195, 56%, 43%)",
        "pacific-rain-forest": "hsl(124, 42%, 40%)",
        "grasslands": "hsl(47, 74%, 61%)",
        "oak-savannah": "hsl(46, 41%, 45%)",
        "mesquite-grassland": "hsl(20, 65%, 68%)",
        "pinyon-juniper": "hsl(198, 100%, 48%)",
        "chaparral-oak-woodland": "hsl(13, 74%, 58%)",
        "southern-evergreen": "hsl(16, 50%, 50%)",
        "mexican-pine-and-pine-oak": "hsl(342, 30%, 58%)",
        "tropical-areas-combined": "hsl(226, 29%, 37%)",
        "montane-woodland": "hsl(50, 21%, 21%)"
    };
    const colors = {
        brand1: palette.grasslands
    };

    return {
        colors,
        palette,
    };
}