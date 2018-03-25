module.exports = [
  {
    type: 'confirm',
    name: 'needRedux',
    message: '是否使用Redux?',
    when: answers => answers.technologyStack === 'React',
    default: true
  }, {
    type: 'list',
    name: 'reduxMiddleware',
    message: '使用哪种中间件处理异步action?',
    when: answers => answers.technologyStack === 'React' && answers.needRedux,
    choices: [
      { name: '不需要', value: '' },
      { name: 'redux-thunk', value: 'redux-thunk' },
      { name: 'redux-saga', value: 'redux-saga' }
    ],
    default: 0
  }, {
    type: 'confirm',
    name: 'needReactRouter',
    message: '是否使用React-Router?',
    when: answers => answers.technologyStack === 'React',
    default: true
  }, {
    type: 'list',
    name: 'reactRouterVersion',
    message: '使用那个版本的router?',
    when: answers => answers.technologyStack === 'React' && answers.needReactRouter,
    choices: [{ name: 'v3', value: '3' }, { name: 'v4', value: '4' }],
    default: '3'
  },
]