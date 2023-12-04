import { renderTemplate } from "../../lib/component";
import { tableRenderer } from "../../logseq/info";
import { MyComponent } from "../my-type";
import htmlString from "./index.html?raw";

type Props = {
  renderId: string,
  content: string,
  blockUuid: string,
}

const MyInput: MyComponent<Props> = ({ content, blockUuid, renderId }, datas) => {
  return renderTemplate(datas, htmlString, {
    id: tableRenderer.genId("myid"),
    value: content,
    bindings: {
      renderId,
      blockUuid,
      onInput: datas.callbackNames.handleInput,
      onFocusOut: datas.callbackNames.handleFocusOut,
    }
  })
}

export default MyInput