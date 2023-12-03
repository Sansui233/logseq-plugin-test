import '@logseq/libs'

declare module '@logseq/libs' {
  export type ModelCallbacks<
    CallbackNames extends Record<string, unknown>,
    NodeData extends Record<string, unknown>
  > = {
      [P in keyof CallbackNames]: (event: {
        className: string
        dataset: NodeData
        id: string
        type: keyof HTMLElementEventMap
        value: string
      }) => Promise<void> | void
    }
}

