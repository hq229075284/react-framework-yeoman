// 记录日志
const logger = store => next => (action) => {
  const result = next(action)
  return result
}

export { logger }
