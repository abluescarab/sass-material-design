var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) =>
  function __require2() {
    return (
      mod ||
        (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod),
      mod.exports
    );
  };
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === "object") || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, "default", { value: mod, enumerable: true })
      : target,
    mod,
  )
);

// node_modules/.pnpm/picocolors@1.1.1/node_modules/picocolors/picocolors.js
var require_picocolors = __commonJS({
  "node_modules/.pnpm/picocolors@1.1.1/node_modules/picocolors/picocolors.js"(
    exports,
    module,
  ) {
    var p = process || {};
    var argv = p.argv || [];
    var env = p.env || {};
    var isColorSupported =
      !(!!env.NO_COLOR || argv.includes("--no-color")) &&
      (!!env.FORCE_COLOR ||
        argv.includes("--color") ||
        p.platform === "win32" ||
        ((p.stdout || {}).isTTY && env.TERM !== "dumb") ||
        !!env.CI);
    var formatter =
      (open, close, replace = open) =>
      (input) => {
        let string = "" + input,
          index = string.indexOf(close, open.length);
        return ~index
          ? open + replaceClose(string, close, replace, index) + close
          : open + string + close;
      };
    var replaceClose = (string, close, replace, index) => {
      let result = "",
        cursor = 0;
      do {
        result += string.substring(cursor, index) + replace;
        cursor = index + close.length;
        index = string.indexOf(close, cursor);
      } while (~index);
      return result + string.substring(cursor);
    };
    var createColors = (enabled = isColorSupported) => {
      let f = enabled ? formatter : () => String;
      return {
        isColorSupported: enabled,
        reset: f("\x1B[0m", "\x1B[0m"),
        bold: f("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
        dim: f("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
        italic: f("\x1B[3m", "\x1B[23m"),
        underline: f("\x1B[4m", "\x1B[24m"),
        inverse: f("\x1B[7m", "\x1B[27m"),
        hidden: f("\x1B[8m", "\x1B[28m"),
        strikethrough: f("\x1B[9m", "\x1B[29m"),
        black: f("\x1B[30m", "\x1B[39m"),
        red: f("\x1B[31m", "\x1B[39m"),
        green: f("\x1B[32m", "\x1B[39m"),
        yellow: f("\x1B[33m", "\x1B[39m"),
        blue: f("\x1B[34m", "\x1B[39m"),
        magenta: f("\x1B[35m", "\x1B[39m"),
        cyan: f("\x1B[36m", "\x1B[39m"),
        white: f("\x1B[37m", "\x1B[39m"),
        gray: f("\x1B[90m", "\x1B[39m"),
        bgBlack: f("\x1B[40m", "\x1B[49m"),
        bgRed: f("\x1B[41m", "\x1B[49m"),
        bgGreen: f("\x1B[42m", "\x1B[49m"),
        bgYellow: f("\x1B[43m", "\x1B[49m"),
        bgBlue: f("\x1B[44m", "\x1B[49m"),
        bgMagenta: f("\x1B[45m", "\x1B[49m"),
        bgCyan: f("\x1B[46m", "\x1B[49m"),
        bgWhite: f("\x1B[47m", "\x1B[49m"),
        blackBright: f("\x1B[90m", "\x1B[39m"),
        redBright: f("\x1B[91m", "\x1B[39m"),
        greenBright: f("\x1B[92m", "\x1B[39m"),
        yellowBright: f("\x1B[93m", "\x1B[39m"),
        blueBright: f("\x1B[94m", "\x1B[39m"),
        magentaBright: f("\x1B[95m", "\x1B[39m"),
        cyanBright: f("\x1B[96m", "\x1B[39m"),
        whiteBright: f("\x1B[97m", "\x1B[39m"),
        bgBlackBright: f("\x1B[100m", "\x1B[49m"),
        bgRedBright: f("\x1B[101m", "\x1B[49m"),
        bgGreenBright: f("\x1B[102m", "\x1B[49m"),
        bgYellowBright: f("\x1B[103m", "\x1B[49m"),
        bgBlueBright: f("\x1B[104m", "\x1B[49m"),
        bgMagentaBright: f("\x1B[105m", "\x1B[49m"),
        bgCyanBright: f("\x1B[106m", "\x1B[49m"),
        bgWhiteBright: f("\x1B[107m", "\x1B[49m"),
      };
    };
    module.exports = createColors();
    module.exports.createColors = createColors;
  },
});

// src/index.mts
import esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import path from "node:path";
import process2 from "node:process";

// src/utils.mts
var import_picocolors = __toESM(require_picocolors(), 1);
import { accessSync, constants } from "node:fs";
function error(message) {
  help(true);
  console.error(`
${message}
`);
}
function escape(path2) {
  return path2.replaceAll("\\", "\\\\");
}
function fileExists(path2) {
  try {
    accessSync(path2, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}
function longestOption(options) {
  return Object.entries(options).reduce((acc, curr) => {
    const currLength = optionToString(curr[0], curr[1]).length;
    const accLength =
      typeof acc === "number" ? acc : optionToString(acc[0], acc[1]).length;
    return currLength > accLength ? currLength : accLength;
  }, 0);
}
function optionToString(name, props) {
  return `-${props.short}, --${name}`;
}
function pad(str, left = 0, right = 0) {
  let padded = str;
  if (left > 0) {
    padded = " ".repeat(left) + padded;
  }
  if (right > 0) {
    padded += " ".repeat(Math.max(0, right - padded.length));
  }
  return padded;
}
function verbose(message, options) {
  if (options && !options.verbose.value) {
    return;
  }
  console.log(import_picocolors.default.blue(message));
}

// src/type-checks.mts
function assertIsString(value) {
  if (typeof value !== "string") {
    error(`expected ${value} to be string, but received ${typeof value}`);
  }
}
function isKeyOf(key, obj) {
  return Object.hasOwn(obj, key);
}

// src/options.mts
var defaults = {
  "esm": {
    short: "e",
    description: "build as ESM file",
  },
  "help": {
    short: "h",
    description: "show usage information",
  },
  "input": {
    short: "i",
    default: "src/index.js",
    description: "main entry file",
    format: "FILE_PATH",
  },
  "no-bundle": {
    short: "b",
    description: "disable bundling imported code",
  },
  "no-minify": {
    short: "m",
    description: "disable minifying output file",
  },
  "node": {
    short: "n",
    description: "use node imports",
  },
  "out": {
    short: "o",
    default: "out",
    description: "output folder",
    format: "DIR_PATH",
  },
  "outFile": {
    short: "f",
    default: "[name]",
    description: "output file name (accepts esbuild placeholders)",
    format: "FILE_NAME_NO_EXT",
  },
  "sass": {
    short: "s",
    default: "",
    description: "sass entry file",
    format: "FILE_PATH",
  },
  "typescript": {
    short: "t",
    description: "use TypeScript file extensions",
  },
  "verbose": {
    short: "v",
    description: "enable verbose logging",
  },
};
function parse(args) {
  const names = Object.keys(defaults);
  const parsed = names.reduce((acc, curr) => {
    return (
      (acc[curr] = {
        isDefault: true,
        // if there is no default, the option is a flag set to "false"
        value: defaults[curr].default ?? false,
      }),
      acc
    );
  }, {});
  let index = 0;
  while (index < args.length) {
    const arg = args[index];
    let result = "";
    const isOption = arg.match(/^(-{1,2})(\w+)$/);
    if (!isOption) {
      error(`unknown argument: "${arg}"`);
      return void 0;
    }
    let short = "";
    const hyphens = isOption[1];
    const option = isOption[2];
    if (hyphens.length === 2) {
      result = option;
    } else if (hyphens.length === 1) {
      const options = option.split("");
      if (option.length > 1) {
        short = options[0];
      } else {
        short = option;
      }
      result = names.find((name) => defaults[name].short === short) ?? short;
      let idx = index + 1;
      if (
        result.length > 1 &&
        typeof defaults[result].default === "string" &&
        idx < args.length
      ) {
        idx++;
      }
      args.splice(idx, 0, ...options.slice(1).map((o) => `-${o}`));
    }
    if (!isKeyOf(result, defaults)) {
      error(`unknown argument: "${result}"`);
      return void 0;
    }
    if (!Object.hasOwn(defaults[result], "default")) {
      parsed[result] = { isDefault: false, value: true };
    } else {
      if (index + 1 >= args.length || args[index + 1].startsWith("-")) {
        error(
          `missing arguments for --${result}; if combined with other options, put --${result} last`,
        );
        return void 0;
      }
      parsed[result] = { isDefault: false, value: args[index + 1] };
      index++;
    }
    index++;
  }
  if (parsed.verbose.value) {
    verbose("Parsed arguments:");
    for (const [key, value] of Object.entries(parsed)) {
      const val =
        typeof value.value === "string" ? `"${value.value}"` : value.value;
      verbose(`  ${key}: ${val}`);
    }
  }
  return parsed;
}

// src/index.mts
async function build() {
  if (process2.argv.includes("--help") || process2.argv.includes("-h")) {
    help();
    return;
  }
  const options = parse(process2.argv.slice(2));
  if (!options) {
    return;
  }
  const paths = await getPaths(options);
  if (!paths) {
    return;
  }
  verbose("Building with esbuild.", options);
  esbuild
    .build({
      // i/o options
      entryPoints: getEntryPoints(paths),
      outdir: paths.out,
      assetNames: "assets/[ext]/[name]",
      entryNames: options.outFile.value,
      outExtension: {
        ".js": options.esm.value ? ".mjs" : ".cjs",
      },
      loader: {
        ".ttf": "copy",
      },
      // formatting options
      bundle: !options["no-bundle"].value,
      external: !options["no-bundle"].value ? ["esbuild"] : void 0,
      format: options.esm.value ? "esm" : void 0,
      logLevel: options.verbose.value ? "info" : "warning",
      minify: !options["no-minify"].value,
      platform: options.node.value ? "node" : "browser",
      plugins: [
        sassPlugin({
          transform: async (css) =>
            css.replaceAll(
              /(url\(['"])([\w@-].*?)(['"]\))/g,
              `$1${escape(path.resolve("./node_modules", "$2"))}$3`,
            ),
        }),
      ],
    })
    .then(() =>
      console.log(`
Built all files to ${paths.out}
`),
    )
    .catch((reason) => {
      console.log(`
${reason}
`);
      process2.exit(1);
    });
}
async function getPaths(options) {
  assertIsString(options.out.value);
  assertIsString(options.input.value);
  assertIsString(options.sass.value);
  if (options.typescript.value) {
    options.input.value = options.input.value.replace(
      /(\.[cm]?)(js)(x?)$/,
      "$1ts$3",
    );
  }
  const paths = {
    out: path.relative(".", options.out.value),
    input: path.relative(".", options.input.value),
    sass: options.sass.isDefault ? "" : path.relative(".", options.sass.value),
  };
  if (options.input.isDefault === true || !fileExists(paths.input)) {
    verbose(`Cannot find entry file "${paths.input}".`, options);
    const input = await getIndexFile(options);
    if (input) {
      paths.input = input;
    } else {
      return void 0;
    }
  }
  verbose(`Using "${paths.input}" as entry point.`, options);
  return paths;
}
async function getIndexFile(options) {
  const extensions = options.typescript.value
    ? ["ts", "cts", "mts"]
    : ["js", "cjs", "mjs"];
  let file = "";
  try {
    file = await Promise.any(
      extensions
        .filter(
          // remove matching file extension
          (ext) => !options.input.value.endsWith(`index.${ext}`),
        )
        .map(
          (ext) =>
            new Promise((resolve, reject) => {
              const file2 = path.resolve(".", "src", `index.${ext}`);
              verbose(
                `Searching for index file "${path.relative(".", file2)}".`,
                options,
              );
              return fileExists(file2) ? resolve(file2) : reject(void 0);
            }),
        ),
    );
  } catch {
    error(
      `no input file found; use --typescript to search TypeScript files or --input to specify a file`,
    );
    return void 0;
  }
  return path.relative(".", file);
}
function getEntryPoints(paths) {
  const entryPoints = [paths.input];
  if (paths.sass) {
    entryPoints.push(paths.sass);
  }
  return entryPoints;
}
function help(usageOnly = false) {
  const filename = path.basename(process2.argv[1]);
  const usage = [`usage: ${filename}`];
  const details = [];
  const lineLength = 80;
  const paddingLeft = 2;
  const paddingRight = paddingLeft + longestOption(defaults) + 4;
  const usagePadding = usage[0].length;
  for (const [key, value] of Object.entries(defaults)) {
    const name = pad(optionToString(key, value), paddingLeft, paddingRight);
    const { description, format } = value;
    const line = name + description;
    const fmt = ` [--${key}` + (format ? ` ${format}` : ``) + `]`;
    if ((usage.at(-1) + fmt).length > lineLength) {
      usage.push(pad(fmt, usagePadding));
    } else {
      usage[usage.length - 1] += fmt;
    }
    if (!usageOnly) {
      details.push(line);
    }
  }
  if (details.length > 0) {
    usage.push("", ...details);
  }
  console.log(usage.join("\n"));
}
if (process2.env.NODE_ENV?.toLowerCase() !== "test") {
  build();
}
export { build, getEntryPoints, getIndexFile, getPaths, help };
