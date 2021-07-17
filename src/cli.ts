import chokidar from "chokidar";
import { existsSync } from "fs";
import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import yargs from "yargs";
import { compile } from "./core";

export default function cli() {
    const cwd = process.cwd();

    const options = yargs
        .option("help", {
            alias: "h",
            type: "boolean",
            description: "Displays all options",
        })
        .option("version", {
            alias: "v",
            type: "boolean",
            description: "Displays the version number",
        })
        .option("extension", {
            alias: "e",
            type: "string",
            description: "Extension of files to compile",
        })
        .option("directory", {
            alias: "d",
            type: "string",
            description: "Directory to compile",
        })
        .option("silent", {
            alias: "s",
            type: "boolean",
            description: "Disables console output",
        })
        .option("out", {
            alias: "o",
            type: "string",
            description: "Output file",
        })
        .option("config", {
            alias: "c",
            type: "string",
            description: "Path to configuration file",
        })
        .option("watch", {
            alias: "w",
            type: "boolean",
            description: "Recompiles input files on change",
        })
        .parseSync();

    const config = options.config;

    const help = options.help ?? false;
    const version = options.version ?? false;

    if (version) {
        console.log(require("../package.json").version);

        process.exit(0);
    }

    if (help) {
        yargs.showHelp();

        process.exit(0);
    }

    (async () => {
        if (config) {
            const path = join(cwd, config);

            if (!existsSync(path)) {
                console.error("Configuration file not found");

                process.exit(1);
            }

            const file = JSON.parse(await readFile(path, "utf8"));

            Object.assign(options, file);
        }

        const watch = options.watch ?? false;
        const extension = options.extension ?? "typefp";
        const directory = join(cwd, options.directory ?? "src");
        const out = join(cwd, options.out ?? join(options.directory ?? "src", "typefp.d.ts"));

        async function build(notify?: boolean) {
            const files = await (async function read(dir) {
                const results = [] as string[][];

                const contents = await readdir(dir, {
                    encoding: "utf8",
                    withFileTypes: true,
                });

                await Promise.all(
                    contents.map(async (item) => {
                        if (item.isDirectory()) {
                            return results.push(await read(join(dir, item.name)));
                        }

                        if (item.name.endsWith(extension)) return results.push([join(dir, item.name)]);

                        return;
                    })
                );

                return results.flat();
            })(directory).catch((error) => {
                if (!options.shutup) console.log("Error reading files:", error);

                if (!watch) process.exit(1);
            });

            if (files) {
                if (!files.length) return console.log("No input files found");

                const output = (await Promise.all(files.map((file) => compile(file)))).join("\n\n").trim();

                await writeFile(out, output, "utf8");

                if (notify) console.log(`Compiled ${files.length} file${files.length === 1 ? "" : "s"}.`);
            }
        }

        await build(watch);

        if (!watch) return process.exit(0);

        const watcher = chokidar.watch(directory);

        return watcher.on("ready", () =>
            watcher
                .on("all", (event, path) => (!path.endsWith(extension) && !event.toLowerCase().endsWith("dir") ? void 0 : build(true)))
                .on("error", (error) => (!options.shutup ? console.log("Error watching files:", error) : void 0))
        );
    })().catch((error) => {
        console.log("Error compiling:", error);

        process.exit(1);
    });
}
