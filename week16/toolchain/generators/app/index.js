var Generator = require('yeoman-generator');
module.exports = class extends Generator{

    constructor(args, opts){
        super(args, opts);
    }

    initPackage(){
        const pkgJson = {
            devDependencies:{
                eslint: '^3.15.0'
            },
            dependencies:{
                react: '^16.2.0'
            }
        };

        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
        this.npmInstall();
    }

    async method1(){
/*         const answers = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "Your project name",
                default: this.appname
            },
            {
                type: "confirm",
                name: "cool",
                message: "Would you like to enable the Cool feature?"
            }
        ]);

        this.log("app name", answers.name);
        this.log("cool features", answers.cool); */
        this.fs.copyTpl(
            this.templatePath('t.html'),
            this.destinationPath('public/index.html'),
            {title: "Templating with Yeoman"}
        )
    }

    method2(){
        console.log('method 2 just run');
    }
};