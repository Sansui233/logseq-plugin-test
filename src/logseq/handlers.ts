import { ModelCallbacks } from "@logseq/libs"
import { NodeData, modelHandlers, tableRenderer } from "./info"

export const model: ModelCallbacks<typeof modelHandlers, NodeData> = {
  handleInput: async (evt) => {
    console.debug("handleInput", evt)
    // the way to get event.target
    // const elem = evt.id !== "" ? document.getElementById(evt.id) : null
  },
  handleFocusOut: async (evt) => {
    console.debug("handleFocusOut", evt)
    const block = await logseq.Editor.getBlock(evt.dataset.blockUuid)
    if (block) {
      logseq.Editor.updateBlock(evt.dataset.blockUuid, tableRenderer.slotText(evt.dataset.renderId, { content: evt.value }))
      console.debug("handleFocusOut new", block.content)
    }
  }
}