import { renderBinds } from "../../lib/component";
import { tableRenderer } from "../../logseq/info";
import { MyComponent } from "../my-type";
// import htmlString from "./index.html?raw";

type Props = {
  renderId: string,
  content: string,
  blockUuid: string,
}

const MyInput: MyComponent<Props> = ({ content, blockUuid, renderId }, datas) => {
  const bindings = renderBinds(datas, {
    renderId,
    blockUuid,
    onInput: datas.callbackNames.handleInput,
    onFocusOut: datas.callbackNames.handleFocusOut,
  })

  // console.debug(htmlString)

  return `
    <input text="text" class="pomodoro-timer-btn is-start"
      id="${tableRenderer.genId("myid")}"
      value="${content}"
      ${bindings} 
    />
  `
}

export default MyInput