import { default as pkg } from "../package.json" with { type: "json" };
import { execSync } from "child_process";
import pc from "picocolors";

export function parse(args) {
    const parsed = {};
    let current = "";

    for (const arg of args) {
        if (arg.startsWith("--")) {
            current = arg.slice(2, arg.length);
            parsed[current] = true;
        }

        if (current && !arg.startsWith("--")) {
            if (typeof parsed[current] === "boolean") {
                parsed[current] = [];
            }

            parsed[current].push(arg);
        }
    }

    return parsed;
}

// shell utils
export function ex(command) {
    execSync(command, { stdio: "inherit" });
}

// console.log utils
export function cmd(
    command,
    {
        includePackageInfo,
        newLineAfter = false,
        newLineBefore = false,
        prefix = "",
    }
) {
    const packageInfo =
        includePackageInfo === true ? `${pkg.name}@${pkg.version} ` : "";
    const cmdLine = `> ${packageInfo}${prefix}${pc.green(command)}`;

    console.log(
        `${newLineBefore ? "\n" : ""}${cmdLine}${newLineAfter ? "\n" : ""}`
    );
}

export function log(text) {
    console.log(`  ${text}`);
}

// helpers
export function isEmpty(obj) {
    for (const key of Object.keys(obj)) {
        if (key) {
            return false;
        }
    }

    return true;
}
