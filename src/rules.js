"use strict";

import { forward, rotate, genCentersS, genCentersV } from "./utils.js"

const fractals = {
    linear: ["Dragon Curve", "Levy Curve", "Gosper Curve", "Koch Snowflake", "Square Wave", "Hilbert Curve"],
    fill: ["pent", "trig", "hex"]
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
    pent: (build, vars) => {
        vars.ratio = (1 + 2 * Math.cos(Math.PI / 5)) / (2 * (1 + 3 * Math.cos(Math.PI / 5)));
        vars.angle = Math.PI / 2.5;
        vars.sides = 5;
        vars.rad = 840;
        vars.sq = 1;
        return {
            transform: {
                I: "I",
            },
            rules: {
                I: (n) => n ? (genCentersV(vars, n), build.f(n - 1, 'I')) : null,
            }
        }
    },
    trig: (build, vars) => {
        vars.ratio = 1 / 2;
        vars.angle = Math.PI / 1.5;
        vars.sides = 3;
        vars.rad = 920;
        vars.sq = 1;
        return {
            transform: {
                I: "I",
            },
            rules: {
                I: (n) => n ? (genCentersV(vars, n), build.f(n - 1, 'I')) : null,
            }
        }
    },
    hex: (build, vars) => {
        vars.ratio = 1 / 3;
        vars.angle = Math.PI / 3;
        vars.sides = 6;
        vars.rad = 800;
        vars.sq = .75;
        return {
            transform: {
                I: "I",
            },
            rules: {
                I: (n) => n ? (genCentersS(vars, n), build.f(n - 1, 'I')) : null,
            }
        }
    }
}

export { fractals, rule_transform_set }