const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

class HandlebarsWebpackPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        const options = this.options;

        compiler.hooks.done.tap({name: "HandlebarsWebpackPlugin"}, () => {
            const template = fs.readFileSync(options.templateFileName, "utf8");
            const templateFunction = handlebars.compile(template);
            const result = templateFunction(options.getTemplateModel());
            const dirname = path.dirname(options.outputFileName);
            if (!fs.existsSync(dirname)) {
                fs.mkdirSync(dirname);
            }
            fs.writeFileSync(options.outputFileName, result);
        });
    }
}

module.exports = HandlebarsWebpackPlugin;