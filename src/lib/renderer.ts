type Config = {
  name: string // do not use "_"
}
export const createRenderer = <Opt extends Record<string, unknown>>(conf: Config) => {

  const slotText = (renderId?: string, opt?: Opt) => {
    const nameSuffix = renderId ? "_" + renderId : ""
    // convert opt to string[] payload
    const optArr = opt
      ? Object.keys(opt).map(k => `${opt[k]}`)
      : undefined
    const payload = optArr ? "," + optArr.join(",") : ""

    return "{{renderer :" + conf.name + nameSuffix + payload + "}}"
  }

  const genId = (renderId: string) => conf.name + "_" + renderId
  const genDomId = (renderId: string) => `${logseq.baseInfo.id}--${conf.name}_${renderId}`

  return {
    name: conf.name,
    slotText,
    genId,
    genDomId
  }
}