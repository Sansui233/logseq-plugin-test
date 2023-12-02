import '@logseq/libs'

/**
 * main entry
 */
async function main () {
  logseq.Editor.registerSlashCommand('🪟 Live Table', async () => {
    await logseq.Editor.insertAtEditingCursor(
      `{{renderer :live_table}} `,
    )
  })
}

//  
logseq.ready(main).catch(console.error)
