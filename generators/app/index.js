const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.argument('aa', { required: false })
    this.option('bb')

    this.log('aa:', this.options.aa)
    this.log('bb:', this.options.bb)
  }

  // prompting() {
  //   return this.prompt([{
  //     type: 'input',
  //     name: 'name',
  //     message: 'Your project name',
  //     default: this.appname // Default to current folder name
  //   }, {
  //     type: 'confirm',
  //     name: 'cool',
  //     message: 'Would you like to enable the Cool feature?'
  //   }]).then((answers) => {
  //     this.log('app name', answers.name);
  //     this.log('cool feature', answers.cool);
  //   });
  // }

  method1() {
    this.log(this.contextRoot)
    this.log(this.destinationRoot())
    this.log('method w just ran');
    console.log(123)
    this.config.save()
  }
}
