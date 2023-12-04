import { createRenderer } from "../lib/renderer";
import { model } from "./handlers";


// register all the injected variables here

export type SlotData = {
  content?: string
}

export const tableRenderer = createRenderer<SlotData>({
  name: "live-table"
})

// variable Name: dom property string
// event handler support see https://github.com/logseq/logseq/blob/master/libs/src/helpers.ts#L422-L451
export const dataAttrs = {
  renderId: 'data-render-id',
  blockUuid: 'data-block-uuid',
  onInput: 'data-on-input',
  onFocusOut: 'data-on-focusout',
} as const

// data type fetch from logseq event.dataset
export type NodeData = {
  [P in keyof typeof dataAttrs]: string
}

// method name: dom property string
export const handlerNames = (() => {
  const keys = Object.keys(model) as Array<keyof typeof model>
  let o: any = {};
  for (let i = 0; i < keys.length; i++) {
    if (!keys[i]) continue
    o[keys[i]!] = keys[i]
  }
  return o as { [P in keyof typeof model]: P }
})()