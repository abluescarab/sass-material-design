import { default as pkg } from "../../package.json" with { type: "json" };
import { execSync } from "child_process";
import pc from "picocolors";

export function parse(args: string[]) {
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
    command: string,
    options?: {
        includePackageInfo: boolean;
        newLineAfter: boolean;
        newLineBefore: boolean;
        prefix: string;
    }
) {
    const packageInfo =
        options?.includePackageInfo === true
            ? `${pkg.name}@${pkg.version} `
            : "";
    const cmdLine = `> ${packageInfo}${options?.prefix}${pc.green(command)}`;

    console.log(
        `${options?.newLineBefore ? "\n" : ""}${cmdLine}${options?.newLineAfter ? "\n" : ""}`
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
