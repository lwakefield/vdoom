export function observe (obj, fn) {
  return new Proxy(obj, {
    set (target, property, val) {
      target[property] = val instanceof Array || val instanceof Object
        ? observe(val, fn)
        : val
      fn()
      return true
    }
  })
}

export function proxy (ontoObj, val) {
  if (!val) return

  for (let key of Object.keys(val)) {
    Object.defineProperty(ontoObj, key, {
      enumerable: true,
      configurable: true,
      get () {
        return val[key]
      },
      set (newVal) {
        val[key] = newVal
      },
    })
  }
}

export function arrToObj (arr, fn) {
  return arr.reduce(
    (result, v) => Object.assign(result, fn(v)),
    {}
  )
}