import Timer from "../components/Timer";
import { myRenderNode } from "../components/my-type";
import { tableRenderer } from "./info";

type RenderedSlottedHook = Parameters<typeof logseq.App.onMacroRendererSlotted>[0]

export const onMacroRendererSlotted: RenderedSlottedHook = (evt) => {
  const { slot, payload } = evt
  const [rendererName, startTime, durationMins] = payload.arguments // see SlotData
  console.debug("onMacroRendererSlotted event", evt)

  if (!rendererName?.startsWith(`:${tableRenderer.name}`)) return

  const renderId = rendererName.split('_')[1]?.trim()
  if (!renderId) return
  const tableId = tableRenderer.name + '_' + renderId

  if (!startTime?.trim()) {

    console.debug("provideUI on start")

    // first time rendering
    return logseq.provideUI({
      key: tableId, // this is part of the dom id. see keepKey
      slot, reset: true,
      template: myRenderNode(Timer, {
        slotId: slot,
        renderId,
        blockUuid: payload.uuid
      })
    })
  }
  // reset slot ui
  renderTimer({
    tableId: tableId,
    slotId: slot,
    startTime: toNumber(startTime),
    durationMins: durationMins ? toNumber(durationMins) : undefined
  })
}

export function renderTimer({
  tableId, slotId,
  startTime, durationMins,
}: {
  tableId: string,
  slotId: string,
  startTime: number,
  durationMins?: number,
}) {

  if (!startTime) return
  const durationTime = (durationMins || 25) * 60 // default 20 minus

  const keepKey = `${logseq.baseInfo.id}--${tableId}` // important this is the dom id
  const keepOrNot = () => logseq.App.queryElementById(keepKey)

  function _render(init: boolean) {
    const nowTime = Date.now()
    const offsetTime = Math.floor((nowTime - startTime) / 1000)
    const isDone = durationTime < offsetTime
    const humanTime = () => {
      const offset = durationTime - offsetTime
      const minus = Math.floor(offset / 60)
      const secs = offset % 60
      return `${(minus < 10 ? '0' : '') + minus}:${(secs < 10 ? '0' : '') +
        secs}`
    }
    const provideUi = () => logseq.provideUI({
      key: tableId,
      slot: slotId,
      reset: true,
      template: `
      ${!isDone ?
          `<a class="pomodoro-timer-btn is-pending">
          🍅 ${humanTime()}
        </a>` :
          `<a class="pomodoro-timer-btn is-done">
          🍅 ✅
        </a>`
        }
    `,
    })

    Promise.resolve(init || keepOrNot()).then((res) => {
      if (res) {
        console.debug("provideUI on update")
        provideUi()
        !isDone && setTimeout(() => {
          _render(false)
        }, 1000)
      }
    })
  }

  _render(true)
}

const toNumber = (s: string) => {
  const num = parseInt(s)
  if (isNaN(num)) {
    console.error("[plugin-test] invalid start time, reset to now") // TODO log
    return Date.now()
  } else {
    return num
  }
}