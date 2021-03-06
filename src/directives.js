import {isFormEl, isBoolAttr} from './dom'

export const directives = {}

export function registerDirective(directive) {
  directives[directive.name.toLowerCase()] = directive
}
export function unregisterDirective(directiveOrName) {
  if (directiveOrName instanceof String) {
    delete directives[name]
  } else {
    delete directives[(directiveOrName.name || '').toLowerCase()]
  }
}

export default class Directive {
  bind () {}
  update () {}
  unbind () {}
}

export function event(name, value) {
  return {name, value, constructor: Event}
}

export function attr(name, value) {
  return {name, value, constructor: Attribute}
}

export class Attribute extends Directive {
  bind (el, {name, value}) {
    this.update(el, {name, value}, {})
  }
  update (el, {name, value}, {oldValue}) {
    if (value === oldValue) return

    if (isBoolAttr(name) && (value === 'false' || !value)) {
      el.removeAttribute(name)
    } else {
      el.setAttribute(name, value)
      if (name === 'value' && isFormEl(el)) {
        el.value = value
      }
    }
  }
  unbind (el, {oldName}) {
    el.removeAttribute(oldName)
  }
}

export class Event extends Directive {
  constructor () {
    super(...arguments)
    this.handler = []
    this.listener = null
  }
  bind (el, {name, value}) {
    this.handler = value
    this.listener = $event => {
      this.handler($event)
    }
    el.addEventListener(name, this.listener)
  }
  update (el, {value}) {
    this.handler = value
  }
  unbind(el, {oldName}) {
    el.removeEventListener(oldName, this.listener)
  }
}
