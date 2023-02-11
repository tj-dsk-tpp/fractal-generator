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
    ratio: 0,
    angle: 0,
    sides: 0,
    rad: 0,
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

const buildPolygon = (polyPts, cntrs, move, bounds, sides, angle) => {
    cntrs.forEach(c => {
        const pts = []
        for (let i = 0; i < sides; i++) {
            const x = c.x + move.x;
            const y = c.y + move.y;
            bounds.mx = Math.min(bounds.mx, x);
            bounds.my = Math.min(bounds.my, y);
            bounds.Mx = Math.max(bounds.Mx, x);
            bounds.My = Math.max(bounds.My, y);
            pts.push({ x: x, y: y });
            rotate(move, angle);
        }
        polyPts.push(pts);
    })
}

const savePolygon = (polyPt, center, svg) => {
    const elm = createBasePolygon();
    elm.setAttribute('points', polyPt.map(p => `${p.x + center.x},${p.y + center.y}`).join(' '));
    svg.appendChild(elm);
}

const genCentersV = (vars, n) => {
    const newCenters = [];
    vars.centers.forEach(c => {
        const move = { x: 0, y: -vars.rad * (1 - vars.ratio) * Math.pow(vars.ratio, n) };
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

const genCentersC = (vars, n) => {
    const newCenters = [];
    const newInvCenters = [];
    vars.centers.up.forEach(c => {
        newInvCenters.push(c)
        const move = { x: 0, y: -vars.rad * (1 - vars.ratio) * Math.pow(vars.ratio, n) };
        for (let i = 0; i < vars.sides; i++) {
            newCenters.push({
                x: c.x + move.x,
                y: c.y + move.y
            });
            rotate(move, vars.angle);
        }
    })
    vars.centers.inv.forEach(ic => {
        newCenters.push(ic)
        const move = { x: 0, y: vars.rad * (1 - vars.ratio) * Math.pow(vars.ratio, n) };
        for (let i = 0; i < vars.sides; i++) {
            newInvCenters.push({
                x: ic.x + move.x,
                y: ic.y + move.y
            });
            rotate(move, vars.angle);
        }
    })
    vars.centers.up = newCenters;
    vars.centers.inv = newInvCenters;
}

const genCentersVS = (vars, n) => {
    const newCenters = [];
    vars.centers.forEach(c => {
        const moveV = { x: 0, y: -vars.rad * (1 - vars.ratio) * Math.pow(vars.ratio, n) };
        const moveS = { x: 0, y: -vars.rad * (vars.sr) * (1 - vars.ratio) * Math.pow(vars.ratio, n) };
        rotate(moveS, vars.angle / 2);
        for (let i = 0; i < vars.sides; i++) {
            newCenters.push({
                x: c.x + moveV.x,
                y: c.y + moveV.y
            });
            newCenters.push({
                x: c.x + moveS.x,
                y: c.y + moveS.y
            });
            rotate(moveV, vars.angle);
            rotate(moveS, vars.angle);
        }
    })
    vars.centers = newCenters;
}

export { build, createBasePolyline, createBasePolygon, initLineVars, initFillVars, rotate, forward, genCentersV, genCentersC, genCentersVS, buildPolygon, savePolygon };