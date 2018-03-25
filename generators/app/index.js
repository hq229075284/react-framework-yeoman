const Generator = require('yeoman-generator')
const chalk = require('chalk')
const { ES5, React, Vue } = require('./constant')
const reactQ = require('./question/react')
const prefix = 'Orz'

// console.log(process.argv.slice(2))

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    this.answers = {}
    this.argument('appname', { required: false })

    // TODO: warning
    this.destinationRoot('app')

  }

  prompting() {
    const allQuestion = [
      {
        type: 'list',
        name: 'technologyStack',
        message: '请选择技术栈',
        choices: [
          { name: ES5, value: 'ES5' },
          { name: React, value: 'React' },
          { name: Vue, value: 'Vue' }
        ],
        default: 'ES5'
      }, ...reactQ, {
        type: 'confirm',
        name: 'needEslint',
        message: '需要添加eslint?',
        when: answers => answers.technologyStack !== 'ES5',
        default: true
      }, {
        type: 'confirm',
        name: 'needMock',
        message: '需要添加mock?',
        when: answers => answers.technologyStack !== 'ES5',
        default: true
      }, {
        type: 'confirm',
        name: 'isGit',
        message: '是否使用Git做版本控制?',
        default: true
      }, {
        type: 'confirm',
        name: 'needPostCss',
        when: answers => answers.technologyStack !== 'ES5',
        message: '是否使用PostCss?',
        default: true
      }, {
        type: 'confirm',
        name: 'needCssModule',
        when: answers => answers.technologyStack !== 'ES5',
        message: '是否使用cssModule?',
        default: false
      }, {
        type: 'confirm',
        name: 'needCreateREADME',
        message: '是否在当前目录下创建README.md?',
        default: false
      }
    ].map(one => (Object.assign({}, one, { prefix })))

    return this.prompt(allQuestion).then((answers) => {
      this.answers = answers
    });
  }

  configuring() {
    this.log(this.answers)
    if (this.answers.technologyStack === 'React') {
      this._writeBabelrc()
      if (this.answers.needEslint) this._writeEslint()
      // if (this.answers.needPostCss) this._writePostCssConfig()
      this._writePackage()
      this._writeBuildScript()
      if (this.answers.needMock) this._writeMock()
    }
    if (this.answers.isGit) this._writeGit()
    this._writeIndexHTML()
    this._writeEditConfig()
    this._writeREADME()
  }

  writing() { }

  install() { }

  end() { }

  _writeBuildScript() {
    this.fs.copyTpl(
      this.templatePath('build'),
      this.destinationPath('build'),
      this.answers
    )
  }

  _writeBabelrc() {
    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc')
    )
  }

  _writeEslint() {
    this.fs.copyTpl(
      this.templatePath('.eslintrc.json'),
      this.destinationPath('.eslintrc.json')
    )
    this.fs.copyTpl(
      this.templatePath('.eslintignore'),
      this.destinationPath('.eslintignore')
    )
  }

  _writeGit() {
    this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    )
  }

  _writeMock() {
    this.fs.copyTpl(
      this.templatePath('mock'),
      this.destinationPath('mock')
    )
  }

  _writePackage() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.answers
    )
  }

  _writeEditConfig() {
    this.fs.copyTpl(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    )
  }

  _writeIndexHTML() {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('index.html')
    )
  }
  _writeREADME() {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    )
  }
}
