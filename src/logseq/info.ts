import { createRenderer } from "../lib/renderer";


// register all the injected variables here

export type SlotData = {
  content?: string
}

export const tableRenderer = createRenderer<SlotData>({
  name: "live-table"
})

// variable Name: dom property string
// event handler support see https://github.com/logseq/logseq/blob/master/libs/src/helpers.ts#L422-L451
export const dataProterties = {
  renderId: 'data-render-id',
  blockUuid: 'data-block-uuid',
  onInput: 'data-on-input',
  onFocusOut: 'data-on-focusout',
} as const

// data type fetch from logseq event.dataset
export type NodeData = {
  [P in keyof typeof dataProterties]: string
}

// method name: dom property string
export const modelHandlers = {
  handleInput: "handleInput",
  handleFocusOut: "handleFocusOut"
} as const