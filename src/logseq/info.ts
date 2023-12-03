import { BlockIdentity } from "@logseq/libs/dist/LSPlugin.user";
import { createRenderer } from "../lib/renderer";


export type SlotData = {
  startTime?: string
  durationMins?: string
}

export const tableRenderer = createRenderer<SlotData>({
  name: "live-table"
})

export type NodeData = {
  renderId: string
  slotId: string
  blockUuid: BlockIdentity
  onClick: string
}

// variable Name: dom property string
export const dataNames: {
  readonly [P in keyof NodeData]: string
} = {
  renderId: "data-render-id",
  slotId: "data-slot-id",
  blockUuid: "data-block-uuid",
  onClick: 'data-on-click'
}

// method name: dom property string
export const modelHandlers = {
  startPomoTimer: "startPomoTimer"
}