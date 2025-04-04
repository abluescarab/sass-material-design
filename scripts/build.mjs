/*
"build:example": "node build.mjs build example",
"build:sass": "node build.mjs build sass",
"build": "node build.mjs build",
"clean": "node build.mjs clean",
"rebuild:example": "node build.mjs",
"rebuild:sass": "node build.mjs",
"rebuild": "node build.mjs rebuild",
"watch:example": "node build.mjs",
"watch:sass": "node build.mjs",
"watch": "node build.mjs watch"
*/

import { cmd, isEmpty, log, parse } from "./utils.mjs";
import pc from "picocolors";
import shell from "shelljs";

function prebuild() {
    cmd("prebuild");

    log(`Making ${pc.yellow("dist")} directory`);
    shell.mkdir("-p", "./dist");

    log(`Copying ${pc.yellow("assets")} to ${y("dist")}`);
    shell.cp("-ru", "./src/assets", "./dist");
}

function build(options) {
    cmd("build");
    //     operation("build");
    //     prebuild();
    //     // BUILD HERE
    //     if (options.length === 0 || options.includes("sass")) {
    //         log(`Building sass`);
    //         ex("npx sass ./src/sass/material.scss ./dist/material.css");
    //     }
    //     if (options.length === 0 || options.includes("example")) {
    //         ex("npm run build --prefix ./example");
    //     }
}

function clean() {
    cmd("clean");
}

function rebuild() {
    cmd("rebuild");
}

function watch() {
    cmd("watch");
}

function run(args, parsedArgs) {
    console.log();
    console.log("args:", args);
    console.log("parsed:", parsedArgs);

    if (isEmpty(parsedArgs)) {
        log("No options given, aborting.\n");
        return;
    }

    cmd(args.join(" "), {
        includePackageInfo: true,
        prefix: "build.mjs ",
    });

    const commands = [prebuild, build, clean, rebuild, watch];

    for (const [key, value] of Object.entries(parsedArgs)) {
        console.log([key, value]);
        const func = commands.find((c) => c.name === key);

        if (func) {
            func(value);
        }
    }

    console.log();
}

const args = process.argv.slice(2, process.argv.length);
run(args, parse(args));
