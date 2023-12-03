import '@logseq/libs'
import { tableRenderer } from './logseq/info'
import { model } from './logseq/model'
import { onMacroRendererSlotted } from './logseq/render'
import { style } from './logseq/style'

const genRandomStr = () => Math.random().
  toString(36).
  replace(/[^a-z]+/g, '').
  slice(0, 5)

/**
 * main entry
 */
async function main() {
  logseq.provideModel(model) // prepare dom event method
  logseq.provideStyle(style) // prepare css style
  logseq.App.onMacroRendererSlotted(onMacroRendererSlotted) // render on this event

  logseq.Editor.registerSlashCommand('🪟 Live Table', async () => {
    await logseq.Editor.insertAtEditingCursor(
      tableRenderer.slotText(genRandomStr()))
  })
}

// run on logseq start
logseq.ready(main).catch(console.error)
