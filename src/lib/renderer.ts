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

  return {
    name: conf.name,
    slotText
  }
}