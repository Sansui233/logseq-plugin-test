import { LsqComponent, LsqComponentIntrinsicProps, renderNode } from "../lib/component";
import { dataAttrs, handlerNames } from "../logseq/info";

// bind handler and data types
export type MyComponent<P> = LsqComponent<
  P & LsqComponentIntrinsicProps,
  typeof handlerNames,
  typeof dataAttrs
>

export function myRenderNode<P extends LsqComponentIntrinsicProps>(components: MyComponent<P>, props: P) {
  return renderNode(components, props, handlerNames, dataAttrs)
}
