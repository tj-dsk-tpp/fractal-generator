"use strict";

//selectors
const fractalType = document.getElementById("fractalName");
const fractalDepth = document.getElementById("fractalDepth");
const animate = document.getElementById("animate");

const alertBox = document.getElementById("alert-box");

const resetBtn = document.getElementById("reset");
const renderBtn = document.getElementById("render");

const svgBox = document.getElementById("svg-box");

//imports
import { fractals, rule_transform_set } from "./rules.js";
import { initLineVars, initFillVars, build } from "./utils.js";
import { rule, stamp } from "./draw.js"


// adding fractal list to the dropdown
for (const [key, values] of Object.entries(fractals)) {
    for (const value of values) {
        const zz = value.split(' ');
        zz[0] = zz[0].toLowerCase()
        const opt = document.createElement('option');
        opt.setAttribute("value", `${key}-${zz.join('')}`);
        opt.innerText = value;
        fractalType.appendChild(opt);
    }
}


// main driver function
const fractalMap = {
    linear: (depth, svg, name, isAnimate) => {
        const vars = initLineVars();
        const { transform, rules } = rule_transform_set[name](build, vars);
        build.f = (n, p) => [...transform[p]].forEach(r => rules[r](n));
        build.f(depth, 'I');
        rule(vars, svg, isAnimate, build)
    },
    fill: (depth, svg, name, isAnimate) => {
        const vars = initFillVars();
        const { transform, rules } = rule_transform_set[name](build, vars);
        build.f = (n, i, p) => [...transform[p]].forEach(r => rules[r](n, i));
        build.f(depth, 0, 'I');
        stamp(vars, depth, svg, isAnimate, build);
    }
};

//adding event listeners to the inputs and buttons 
fractalType.addEventListener('change', () => {
    alertBox.innerText = "";
});
fractalDepth.addEventListener('change', () => {
    alertBox.innerText = "";
})

resetBtn.addEventListener('click', () => {
    svgBox.innerHTML = "";
    fractalType.value = 0;
    fractalDepth.value = 0;
    alertBox.innerText = "";
    build.renderer ? clearInterval(build.renderer) : null;
})

renderBtn.addEventListener('click', (evt) => {
    svgBox.innerHTML = "";
    build.renderer ? (clearInterval(build.renderer)) : null;
    const fn = fractalType.value
    const fd = parseInt(fractalDepth.value);
    if (fn === '') {
        alertBox.innerText = "Select a valid fractal Type.";
        return;
    }
    if (fd < 0) {
        alertBox.innerText = "Enter valid depth";
        return
    }
    const fnn = fn.split('-');
    fractalMap[fnn[0]](fd, svgBox, fnn[1], animate.checked);
});