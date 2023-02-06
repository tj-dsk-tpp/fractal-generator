"use strict";

import { build, createBasePolyline, createBasePolygon, rotate, buildPolygon, savePolygon } from "./utils.js";

const rule = (vars, svg, isAnimate) => {
    const elm = createBasePolyline();
    const center = {
        x: 800 - (vars.bounds.mx + vars.bounds.Mx) / 2,
        y: 800 - (vars.bounds.my + vars.bounds.My) / 2
    };
    svg.appendChild(elm);
    if (isAnimate) {
        elm.setAttribute('points', "");
        let i = 0;
        const n = vars.points.length;
        build.renderer = setInterval(() => {
            if (i === n) clearInterval(build.renderer);
            else {
                elm.setAttribute('points', `${elm.getAttribute('points')} ${vars.points[i].x + center.x},${vars.points[i].y + center.y}`);
                i++;
            }
        }, 5);
    } else elm.setAttribute("points", vars.points.map(p => `${p.x + center.x},${p.y + center.y}`).join(' '));
}


const stamp = (vars, depth, svg, isAnimate) => {
    const f = Math.pow(vars.ratio, depth);
    const polyPts = [];
    if (vars.centers.up) {
        buildPolygon(polyPts, vars.centers.up, { x: 0, y: -vars.rad * f }, vars.bounds, vars.sides, vars.angle);
        buildPolygon(polyPts, vars.centers.inv, { x: 0, y: vars.rad * f }, vars.bounds, vars.sides, vars.angle)
    } else buildPolygon(polyPts, vars.centers, { x: 0, y: -vars.rad * f }, vars.bounds, vars.sides, vars.angle);
    vars.center = {}
    const center = {
        x: 800 - (vars.bounds.mx + vars.bounds.Mx) / 2,
        y: 800 - (vars.bounds.my + vars.bounds.My) / 2
    };
    if (isAnimate) {
        let i = 0;
        const n = polyPts.length;
        build.renderer = setInterval(() => {
            if (i === n) clearInterval(build.renderer);
            else {
                savePolygon(polyPts[i], center, svg)
                i++;
            }
        }, 5);
    } else polyPts.forEach(pp => savePolygon(pp, center, svg))
}
export { rule, stamp };