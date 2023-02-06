"use strict";

import { forward, rotate, genCentersC, genCentersV, genCentersOnV } from "./utils.js"

const fractals = {
    linear: ["Dragon Curve", "Levy Curve", "Gosper Curve", "Koch Snowflake", "Minkowski Sausage", "Hilbert Curve", "Peano Curve", "Fibonacci Word Fractal", "T-Square", /* "De Rham Curve" */],
    fill: ["Sierpinski Triangle", "Sierpinski Pentagon", "Sierpinski Hexagon", "Pentaflake", "Hexaflake", /* "T-Square", "Sierpinki Carpet", "Mega Menger Carpet" */],
    branching: [/* "Sierpinski Skeleton",  "Vicsek fractal", "Fractal Tree"*/],
    sets: [/*"Mandelbrot Set", "Multibrot Set", "Julia Sets", "Burning Ship" */],
    attractors: [/* "TinkerBell Map", "Strange Attractor", "Lorenz Attractor" */],
    scapes: [/* "Terrain" */]
}

const rule_transform_set = {
    linear: {
        dragonCurve: (build, vars) => {
            vars.upperLimit = 15;
            return {
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
            };
        },
        levyCurve: (build, vars) => {
            vars.upperLimit = 15;
            return {
                transform: {
                    I: "f",
                    f: "pfnnfp"
                },
                rules: {
                    f: (n) => n ? build.f(n - 1, 'f') : forward(vars),
                    p: (n) => rotate(vars.move, -Math.PI / 4),
                    n: (n) => rotate(vars.move, Math.PI / 4)
                }
            };
        },
        gosperCurve: (build, vars) => {
            vars.upperLimit = 5;
            return {
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
            };
        },
        kochSnowflake: (build, vars) => {
            vars.upperLimit = 5;
            return {
                transform: {
                    I: "fnnfnnfnn",
                    f: "fpfnnfpf"
                }, rules: {
                    f: (n) => n ? build.f(n - 1, 'f') : forward(vars),
                    p: (n) => rotate(vars.move, -Math.PI / 3),
                    n: (n) => rotate(vars.move, Math.PI / 3)
                }
            };
        },
        minkowskiSausage: (build, vars) => {
            vars.upperLimit = 3;
            return {
                transform: {
                    I: "fnfnfnfn",
                    f: "fpfnfnffpfpfnf"
                }, rules: {
                    f: (n) => n ? build.f(n - 1, 'f') : forward(vars),
                    p: (n) => rotate(vars.move, -Math.PI / 2),
                    n: (n) => rotate(vars.move, Math.PI / 2)
                }
            }
        },
        hilbertCurve: (build, vars) => {
            vars.upperLimit = 8;
            return {
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
            }
        },
        peanoCurve: (build, vars) => {
            vars.upperLimit = 5;
            return {
                transform: {
                    I: "f",
                    f: "fpfnfnfnfpfpfpfnf"
                },
                rules: {
                    f: (n) => n ? build.f(n - 1, 'f') : forward(vars),
                    p: (n) => rotate(vars.move, -Math.PI / 2),
                    n: (n) => rotate(vars.move, Math.PI / 2)
                }
            }
        },
        fibonacciWordFractal: (build, vars) => {
            vars.count = 0;
            vars.upperLimit = 19
            return ({
                transform: {
                    I: "pf",
                    f: "h",
                    h: "hf"
                },
                rules: {
                    p: (n) => rotate(vars.move, -Math.PI / 2),
                    f: (n) => n ? build.f(n - 1, 'f') : (vars.count = 1 - vars.count, forward(vars)),
                    h: (n) => n ? build.f(n - 1, 'h') : (vars.count = 1 - vars.count, rotate(vars.move, (vars.count ? 1 : -1) * Math.PI / 2), forward(vars))
                }
            })
        },
        "t-square": (build, vars) => {
            vars.upperLimit = 5;
            return {
                transform: {
                    I: "fpfpfpfp",
                    f: "fpfnfnfpf",
                },
                rules: {
                    p: (n) => rotate(vars.move, Math.PI / 2),
                    n: (n) => rotate(vars.move, -Math.PI / 2),
                    f: (n) => n ? build.f(n - 1, 'f') : forward(vars),
                }
            }
        }
    },
    fill: {
        sierpinskiTriangle: (build, vars) => {
            vars.ratio = 1 / 2;
            vars.angle = Math.PI / 1.5;
            vars.sides = 3;
            vars.rad = 920;
            vars.upperLimit = 7;
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
            vars.upperLimit = 5;
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
            vars.upperLimit = 5;
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
            vars.centers = {
                up: [vars.centers[0]],
                inv: []
            };
            vars.upperLimit=5;
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
            vars.ratio = 1 / 3;
            vars.angle = Math.PI / 3;
            vars.sides = 6;
            vars.rad = 800;
            vars.upperLimit=5;
            vars.centers = {
                up: [vars.centers[0]],
                inv: []
            };
            return {
                transform: {
                    I: "I",
                },
                rules: {
                    I: (n, i) => i < n ? (genCentersC(vars, i), build.f(n, i + 1, 'I')) : null,
                }
            }
        },
    }
}

export { fractals, rule_transform_set }