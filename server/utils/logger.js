class Logger{
    constructor(className = "") {
        this.className = className;
    }
    #getClassName() {
        if (this.className == "" || this.className == undefined || this.className == null)
            return "";
        return ` [ ${this.className} ]`;
    }
    async print(color, type, args) {
        const chalk = (await import('chalk')).default;
        const date = new Date();
        let zone = parseInt(date.getTimezoneOffset() / 60);
        let sign = zone < 0;
        zone = ((sign) ? -zone : zone).toString().padStart(2,'0');
        zone = (sign) ? `+${zone}` : `-${zone}`;
        let s = chalk[color](`[Express] `)+chalk.white(date.toLocaleString('sr-RS') + ` GMT${zone}`)+' '+ chalk[color](type) + chalk.bold.hex("#1e0578") (this.#getClassName()+" ") + args.join(' ');
        console.log(s);
    }
    log(...args) {
        this.print("green", "LOG", args);
    }
    error(...args) {
        this.print("red", "ERR", args);
    }
    warning(...args) {
        this.print("yellow", "WARN", args);
    }
}

module.exports = Logger;