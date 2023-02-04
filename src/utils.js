"use strict";

const build = { f: () => { }, renderer: null };

const createBasePolyline = () => {
    const elm = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    elm.setAttribute('stroke-width', 2);
    elm.setAttribute('stroke', '#000');
    elm.setAttribute('stroke-linecap', 'round');
    elm.setAttribute('stroke-linejoin', 'round');
    elm.setAttribute('fill', 'transparent');
    return elm;
}
const createBasePolygon = () => {
    const elm = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    elm.setAttribute('stroke-width', 0);
    elm.setAttribute('stroke-linecap', 'round');
    elm.setAttribute('stroke-linejoin', 'round');
    elm.setAttribute('fill', '#000');
    return elm;
}

const initLineVars = () => ({
    origin: { x: 0, y: 0 },
    move: { x: 5, y: 0 },
    points: [{ x: 0, y: 0 }],
    bounds: { mx: 0, my: 0, Mx: 0, My: 0 }
})

const initFillVars = () => ({
    centers: [{ x: 0, y: 0 }],
    bounds: { mx: 0, my: 0, Mx: 0, My: 0 },
    polys: []
})

const rotate = (point, angle) => {
    const X = point.x * Math.cos(angle) - point.y * Math.sin(angle);
    const Y = point.x * Math.sin(angle) + point.y * Math.cos(angle);
    point.x = X;
    point.y = Y;
}

const forward = vars => {
    vars.points.push({ x: vars.origin.x + vars.move.x, y: vars.origin.y + vars.move.y });
    vars.origin.x += vars.move.x;
    vars.origin.y += vars.move.y;
    vars.bounds.mx = Math.min(vars.bounds.mx, vars.origin.x);
    vars.bounds.my = Math.min(vars.bounds.my, vars.origin.y);
    vars.bounds.Mx = Math.max(vars.bounds.Mx, vars.origin.x);
    vars.bounds.My = Math.max(vars.bounds.My, vars.origin.y);
}

const genCentersV = (vars, n) => {
    const newCenters = [];
    vars.centers.forEach(c => {
        const move = { x: 0, y: -vars.rad * (1 - vars.ratio) * Math.pow(vars.ratio, n - 1) };
        for (let i = 0; i < vars.sides; i++) {
            newCenters.push({
                x: c.x + move.x,
                y: c.y + move.y
            });
            rotate(move, vars.angle);
        }
    })
    vars.centers = newCenters;
}
const genCentersS = (vars, n) => {
    const newCenters = [];
    vars.centers.forEach(c => {
        const move = { x: 0, y: -vars.rad * Math.sqrt(vars.sq) * (1 - vars.ratio) * Math.pow(vars.ratio, n - 1) };
        rotate(move, vars.angle / 2);
        for (let i = 0; i < vars.sides; i++) {
            newCenters.push({
                x: c.x + move.x,
                y: c.y + move.y
            });
            rotate(move, vars.angle);
        }
    })
    vars.centers = newCenters;
}


export { build, createBasePolyline, createBasePolygon, initLineVars, initFillVars, rotate, forward, genCentersV, genCentersS };