import { ModelCallbacks } from "@logseq/libs"
import { NodeData, modelHandlers, tableRenderer } from "./info"
import { renderTimer } from "./render"

export const model: ModelCallbacks<typeof modelHandlers, NodeData> = {
  startPomoTimer: async (evt) => {
    // get plugin dom info
    console.debug("e on model hook:", evt)
    const { renderId, slotId, blockUuid } = evt.dataset
    console.debug("[model.ts] renderId:", renderId)

    // get logseq block
    const block = await logseq.Editor.getBlock(blockUuid)
    console.debug('block', block)

    const startTime = Date.now()
    const flag = `{{renderer :${tableRenderer.name}_${renderId}`
    const newContent = block?.content?.replace(`${flag}}}`,
      `${flag},${startTime}}}`)
    if (!newContent) return

    await logseq.Editor.updateBlock(blockUuid, newContent)
    renderTimer({ renderId: renderId, slotId, startTime })
  },
}

