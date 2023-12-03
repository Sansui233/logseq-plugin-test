import { generateBinds } from "../lib/component";
import { MyComponent } from "./my-type";

type Props = {
  slotId: string
  renderId: string
  blockUuid: string
}

const Timer: MyComponent<Props> = (props, datas) => {
  const { slotId, renderId, blockUuid } = props

  return `
    <button
    class="pomodoro-timer-btn is-start"
    ${generateBinds(datas, {
    slotId: slotId,
    renderId: renderId,
    blockUuid: blockUuid,
    onClick: datas.callbackNames.startPomoTimer
  })}>
    🍅 START
    </button>
  `
}

export default Timer