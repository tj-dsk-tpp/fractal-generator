"use strict";

import { build, createBasePolyline, createBasePolygon, rotate } from "./utils.js";

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
        }, 20);
    } else elm.setAttribute("points", vars.points.map(p => `${p.x + center.x},${p.y + center.y}`).join(' '));
}

const stamp = (vars, depth, svg, isAnimate) => {
    const f = Math.pow(vars.ratio, depth);
    let move = {
        x: 0,
        y: -vars.rad * f
    }
    const polyPts = [];
    vars.centers.forEach(c => {
        const pts = []
        for (let i = 0; i < vars.sides; i++) {
            const x = c.x + move.x;
            const y = c.y + move.y;
            vars.bounds.mx = Math.min(vars.bounds.mx, x);
            vars.bounds.my = Math.min(vars.bounds.my, y);
            vars.bounds.Mx = Math.max(vars.bounds.Mx, x);
            vars.bounds.My = Math.max(vars.bounds.My, y);
            pts.push({ x: x, y: y });
            rotate(move, vars.angle);
        }
        polyPts.push(pts);
    })
    move = {
        x: 0,
        y: vars.rad * f
    }
    vars.invCenters.forEach(ic => {
        const pts = []
        for (let i = 0; i < vars.sides; i++) {
            const x = ic.x + move.x;
            const y = ic.y + move.y;
            vars.bounds.mx = Math.min(vars.bounds.mx, x);
            vars.bounds.my = Math.min(vars.bounds.my, y);
            vars.bounds.Mx = Math.max(vars.bounds.Mx, x);
            vars.bounds.My = Math.max(vars.bounds.My, y);
            pts.push({ x: x, y: y });
            rotate(move, vars.angle);
        }
        polyPts.push(pts);
    })
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
                const elm = createBasePolygon();
                elm.setAttribute('points', polyPts[i].map(p => `${p.x + center.x},${p.y + center.y}`).join(' '));
                svg.appendChild(elm);
                i++;
            }
        }, 20);
    } else polyPts.forEach(pp => {
        const elm = createBasePolygon();
        elm.setAttribute('points', pp.map(p => `${p.x + center.x},${p.y + center.y}`).join(' '));
        svg.appendChild(elm);
    })
}
export { rule, stamp };