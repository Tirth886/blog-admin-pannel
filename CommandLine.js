const { exec } = require("child_process");

const args = process.argv.slice(2);

function commandError() {
    console.error('Usage: node CommandLine.js <module|controller|service> <name>');
    process.exit(1);
}

function isValidModuleName(moduleName) {
    if (!/^[a-zA-Z]+$/.test(moduleName)) {
        return false;
    }
    return true;
}

if (args.length < 2) {
    commandError()
}

const command = args[0];
const commandValue = args[1];

class CommandLine {
    static params = {}

    constructor(params) {
        CommandLine.params = params
        isValidModuleName(CommandLine.params.commandValue)
    }

    static exec() {
        switch (CommandLine.params.command) {
            case "app":
                CommandLine.generateApp()
                break;
            case "controller":
                CommandLine.generateController()
                break;
            case "service":
                CommandLine.generateService()
                break;
            case "module":
                CommandLine.generateModule()
                break;
            default:
                commandError()
                break;
        }
    }

    static generateController() {
        const moduleName = CommandLine.params.commandValue
        const command = `nest generate controller ${moduleName} --no-spec`;
        CommandLine.run(command)
    }
    static generateService() {
        const moduleName = CommandLine.params.commandValue
        const command = `nest generate service ${moduleName} --no-spec`;
        CommandLine.run(command)
    }

    static generateModule() {
        const moduleName = CommandLine.params.commandValue
        const command = `nest generate module ${moduleName} --no-spec`;
        CommandLine.run(command)
    }

    static generateApp() {
        const moduleName = CommandLine.params.commandValue
        const command = ` nest generate resource ${moduleName} --no-spec `;

        CommandLine.run(command)
    }

    static run(command) {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    }
}


new CommandLine({
    command,
    commandValue
})

CommandLine.exec();