/* eslint-env mocha */
import {expect} from 'chai'
import sinon from 'sinon'
import jsdom from 'jsdom'

import { Event as EventDirective } from '../src/directive'

beforeEach(() => {
  const window = jsdom.jsdom().defaultView
  const document = window.document
  global['window'] = window
  global['document'] = document
  global['Event'] = window.Event
})

describe('Event', () => {
  it('binds, updates and unbinds correctly', () => {
    const event = new EventDirective()
    const el = document.createElement('button')
    const [spy1, spy2] = [sinon.spy(), sinon.spy()]
    event.bind(el, {name: 'click', value: [spy1]})

    el.dispatchEvent(new Event('click'))
    expect(spy1.calledOnce).to.be.true

    event.update(
      el,
      {name: 'click', value: [spy2]}
    )

    el.dispatchEvent(new Event('click'))
    expect(spy2.calledOnce).to.be.true
    expect(spy1.calledOnce).to.be.true

    event.unbind(el, {name: 'click'})
    el.dispatchEvent(new Event('click'))
    expect(spy2.calledOnce).to.be.true
    expect(spy1.calledOnce).to.be.true
  })
})

