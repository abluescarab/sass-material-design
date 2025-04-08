/**
 * @file ESBuild script.
 */

import esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import path from "path";
import process from "node:process";

const src = "./src";
const out = "./out";

esbuild
    .build({
        entryPoints: [
            path.resolve(src, "index.mts"),
            path.resolve(src, "sass", "main.scss"),
        ],
        outExtension: {
            ".js": ".mjs",
        },
        outdir: path.resolve(out),
        entryNames: "[name]",
        assetNames: "assets/[ext]/[name]",
        bundle: true,
        minify: true,
        format: "esm",
        loader: {
            ".ttf": "copy",
        },
        plugins: [
            sassPlugin({
                transform: async (css) =>
                    css.replaceAll(
                        /(url\(['"])(\w)/g,
                        "$1../../node_modules/$2",
                    ),
            }),
        ],
    })
    .then(() => console.log(`\nBuilt all files to ${out}\n`))
    .catch((reason) => {
        console.log(`\n${reason}\n`);
        process.exit(1);
    });
