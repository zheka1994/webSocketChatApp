const fs = require("fs");
const path = require("path");

class CopyFilesPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        const options = this.options;

        compiler.hooks.done.tap({name: "CopyFilesPlugin"}, () => {
            if (options.inputFileName) {
                const inputFileName = options.inputFileName;
                const fileContent = fs.readFileSync(inputFileName, "utf8");
                const fileName = path.basename(inputFileName);
                fs.writeFileSync(path.join(options.outputDirectory, fileName), fileContent);  
            } else if (options.inputDirectory) {
                const inputDirectory = options.inputDirectory;
                if (fs.existsSync(inputDirectory)) {
                    fs.readdirSync(inputDirectory).forEach(fileName => {
                        const fullPath = path.resolve(inputDirectory, fileName);
                        const fileContent = fs.readFileSync(fullPath, "utf8");
                        fs.writeFileSync(path.join(options.outputDirectory, fileName), fileContent);
                    })
                }
            }
        });
    }
}

module.exports = CopyFilesPlugin;