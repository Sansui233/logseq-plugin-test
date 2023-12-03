import { createRenderer } from "../lib/renderer";


// register all the injected variables here

export type SlotData = {
  startTime?: string
  durationMins?: string
}

export const tableRenderer = createRenderer<SlotData>({
  name: "live-table"
})

// variable Name: dom property string
export const dataProterties = {
  renderId: "data-render-id",
  slotId: "data-slot-id",
  blockUuid: "data-block-uuid",
  onClick: 'data-on-click'
} as const

// data type fetch from logseq event.dataset
export type NodeData = {
  [P in keyof typeof dataProterties]: string
}

// method name: dom property string
export const modelHandlers = {
  startPomoTimer: "startPomoTimer"
} as const