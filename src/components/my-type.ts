import { LsqComponent, LsqComponentIntrinsicProps, renderNode } from "../lib/component";
import { dataProterties, modelHandlers } from "../logseq/info";

// bind handler and data types
export type MyComponent<P> = LsqComponent<
  P & LsqComponentIntrinsicProps,
  typeof modelHandlers,
  typeof dataProterties
>

export function myRenderNode<P extends LsqComponentIntrinsicProps>(components: MyComponent<P>, props: P) {
  return renderNode(components, props, modelHandlers, dataProterties)
}
