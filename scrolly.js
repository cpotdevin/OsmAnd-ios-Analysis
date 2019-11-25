const scroller = scrollama();

const main = d3.select('main');
const scrollys = main.selectAll('.scrolly');
const articles = scrollys.selectAll('article');
const steps = articles.selectAll('.step');
const figures = scrollys.selectAll('figure');

function handleResize() {
    // const stepH = Math.floor(window.innerHeight * 0.75);
    // step.style('height', stepH + 'px');
    const figureHeight = window.innerHeight * 7 / 10;
    const figureMarginTop = (window.innerHeight - figureHeight) / 2;
    figures
        .style('height', figureHeight + 'px')
        .style('top', figureMarginTop + 'px');
    scroller.resize();
}

function handleStepEnter(response) {
    steps.classed('is-active', function(d, i) {
        return i === Number(response.element.getAttribute('data-step'));
    })

    const scrollerId = response.element.classList[1];
    scrollys.select('figure.' + scrollerId)
        .select('img')
        .attr('src', response.element.getAttribute('img-src'));

    const figcaption = response.element.getAttribute('figcaption');
    if (figcaption) {
        scrollys.select('figure.' + scrollerId)
            .select('figcaption')
            .html(figcaption);
    } else {
        scrollys.select('figure.' + scrollerId)
            .select('figcaption')
            .html('');
    }
}

function setupStickyfill() {
    d3.selectAll('.sticky').each(function () {
        Stickyfill.add(this);
    });
}

function init() {
    setupStickyfill();
    handleResize();
    scroller.setup({
        step: '.scrolly article .step',
        offset: 0.25,
        debug: false,
    }).onStepEnter(handleStepEnter);

    window.addEventListener('resize', handleResize);
}

init();