import Handlebars from "handlebars";
import { $Values } from 'utility-types';

type CallbackNames = Record<string, string>
type DataProperties = Record<string, string>

// todo : add event bindings
export type LsqComponentIntrinsicProps = {}

export type LsqComponent<
  P extends LsqComponentIntrinsicProps = any,
  F extends CallbackNames = CallbackNames,
  D extends DataProperties = DataProperties
> = (props: P, datas: { callbackNames: F, dataProperties: D }) => string

// render node templates
export function renderNode<
  P extends LsqComponentIntrinsicProps,
  F extends CallbackNames = CallbackNames,
  D extends DataProperties = DataProperties,
>
  (component: LsqComponent<P, F, D>, props: P, callbackNames: F, dataProperties: D) {
  return component(props, { callbackNames, dataProperties })
}

export function renderTemplate<
  F extends CallbackNames = CallbackNames,
  D extends DataProperties = DataProperties
>(datas: { callbackNames: F, dataProperties: D },
  htmlTemplate: string,
  slots: {
    id?: string,
    value?: string,
    children?: string,
    bindings?: { // TODO seperate value binding and handler binding to get a better type hints
      [K in keyof Partial<D>]: unknown | $Values<F>
    },
  }): string {
  const template = Handlebars.compile(htmlTemplate)

  // render data-ref
  let bindingStr = ""
  if (slots.bindings) {
    const arr = Object.keys(slots.bindings).map(k => `${datas.dataProperties[k]}="${slots.bindings![k]}"`) // ts compiler bug here
    bindingStr = " " + arr.join(" ") + " "
  }

  return template({
    id: slots.id,
    value: slots.value,
    children: slots.children,
    bindings: new Handlebars.SafeString(bindingStr),
  })

}