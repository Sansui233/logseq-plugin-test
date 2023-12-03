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


/**
 * generate data-ref=something
 * 
 * Usage
 * generateBinds(datas, {
 *  renderId: "as0psf7ov",
 *  slotId: "slot__0as9d"
 * })
 */
export const generateBinds = <
  F extends CallbackNames = CallbackNames,
  D extends DataProperties = DataProperties
>(
  datas: {
    callbackNames: F
    dataProperties: D
  },
  maps: {
    [K in keyof Partial<D>]: unknown | $Values<F>
  },
) => {

  const arr = Object.keys(maps).map(k => `${datas.dataProperties[k]}="${maps[k]}"`)
  return " " + arr.join(" ") + " "

}