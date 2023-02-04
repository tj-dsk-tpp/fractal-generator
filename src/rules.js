"use strict";

import { forward, rotate, genCentersC, genCentersV } from "./utils.js"

const fractals = {
    linear: ["Dragon Curve", "Levy Curve", "Gosper Curve", "Koch Snowflake", "Square Wave", "Hilbert Curve"],
    fill: ["Sierpinski Triangle", "Sierpinski Pentagon", "Sierpinski Hexagon", "Pentaflake", "Hexaflake"]
}

const rule_transform_set = {
    dragonCurve: (build, vars) => ({
        transform: {
            I: "f",
            f: "fph",
            h: "fnh"
        },
        rules: {
            f: (n) => n ? build.f(n - 1, 'f') : forward(vars),
            h: (n) => n ? build.f(n - 1, 'h') : forward(vars),
            p: (n) => rotate(vars.move, -Math.PI / 2),
            n: (n) => rotate(vars.move, Math.PI / 2)
        }
    }),
    levyCurve: (build, vars) => ({
        transform: {
            I: "f",
            f: "pfnnfp"
        },
        rules: {
            f: (n) => n ? build.f(n - 1, 'f') : forward(vars),
            p: (n) => rotate(vars.move, -Math.PI / 4),
            n: (n) => rotate(vars.move, Math.PI / 4)
        }
    }),
    gosperCurve: (build, vars) => ({
        transform: {
            I: "f",
            f: "fnhnnhpfppffphn",
            h: "pfnhhnnhnfppfph"
        },
        rules: {
            f: (n) => n ? build.f(n - 1, 'f') : forward(vars),
            h: (n) => n ? build.f(n - 1, 'h') : forward(vars),
            p: (n) => rotate(vars.move, -Math.PI / 3),
            n: (n) => rotate(vars.move, +Math.PI / 3)
        }
    }),
    kochSnowflake: (build, vars) => ({
        transform: {
            I: "fnnfnnfnn",
            f: "fpfnnfpf"
        }, rules: {
            f: (n) => n ? build.f(n - 1, 'f') : forward(vars),
            p: (n) => rotate(vars.move, -Math.PI / 3),
            n: (n) => rotate(vars.move, Math.PI / 3)
        }
    }),
    squareWave: (build, vars) => ({
        transform: {
            I: "fnfnfnfn",
            f: "fpfnfnffpfpfnf"
        }, rules: {
            f: (n) => n ? build.f(n - 1, 'f') : forward(vars),
            p: (n) => rotate(vars.move, -Math.PI / 2),
            n: (n) => rotate(vars.move, Math.PI / 2)
        }
    }),
    hilbertCurve: (build, vars) => ({
        transform: {
            I: "f",
            f: "phmnfmfnmhp",
            h: "nfmphmhpmfn"
        },
        rules: {
            f: (n) => n ? build.f(n - 1, 'f') : null,
            h: (n) => n ? build.f(n - 1, 'h') : null,
            m: (n) => forward(vars),
            p: (n) => rotate(vars.move, -Math.PI / 2),
            n: (n) => rotate(vars.move, Math.PI / 2)
        }
    }),
    sierpinskiTriangle: (build, vars) => {
        vars.ratio = 1 / 2;
        vars.angle = Math.PI / 1.5;
        vars.sides = 3;
        vars.rad = 920;
        return {
            transform: {
                I: "I",
            },
            rules: {
                I: (n, i) => i < n ? (genCentersV(vars, i), build.f(n, i + 1, 'I')) : null,
            }
        }
    },
    sierpinskiPentagon: (build, vars) => {
        vars.ratio = (1 + 2 * Math.cos(Math.PI / 5)) / (2 * (1 + 3 * Math.cos(Math.PI / 5)));
        vars.angle = Math.PI / 2.5;
        vars.sides = 5;
        vars.rad = 840;
        return {
            transform: {
                I: "I",
            },
            rules: {
                I: (n, i) => i < n ? (genCentersV(vars, i), build.f(n, i + 1, 'I')) : null,
            }
        }
    },
    sierpinskiHexagon: (build, vars) => {
        vars.ratio = 1 / 3;
        vars.angle = Math.PI / 3;
        vars.sides = 6;
        vars.rad = 800;
        return {
            transform: {
                I: "I",
            },
            rules: {
                I: (n, i) => i < n ? (genCentersV(vars, i), build.f(n, i + 1, 'I')) : null,
            }
        }
    },
    pentaflake: (build, vars) => {
        vars.ratio = (1 + 2 * Math.cos(Math.PI / 5)) / (2 * (1 + 3 * Math.cos(Math.PI / 5)));
        vars.angle = Math.PI / 2.5;
        vars.sides = 5;
        vars.rad = 840;
        vars.invCenters = [];
        return {
            transform: {
                I: "I",
            },
            rules: {
                I: (n, i) => i < n ? (genCentersC(vars, i), build.f(n, i + 1, 'I')) : null,
            }
        }
    },
    hexaflake: (build, vars) => {
        vars.ratio = 1/3;
        vars.angle = Math.PI /3;
        vars.sides = 6;
        vars.rad = 800;
        vars.invCenters = [];
        return {
            transform: {
                I: "I",
            },
            rules: {
                I: (n, i) => i < n ? (genCentersC(vars, i), build.f(n, i + 1, 'I')) : null,
            }
        }
    }
}

export { fractals, rule_transform_set }