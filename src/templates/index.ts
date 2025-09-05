import COUNTRIES from "../COUNTRIES";
import california from "./california";
import europe from "./europe";

export type BaseTerritory = {
    code: string
    name: string
}

export type LeafTerritory = BaseTerritory & {
    subLabel?: never
    subs?: never
}

export type BranchTerritory = BaseTerritory & {
    subLabel: string
    subs: Territory[]
}

export type Territory = LeafTerritory | BranchTerritory

export type TemplateProps = {
    fullName: string
    email: string
    territoryPath: string[]
    genshinUid: string
    server: string
    displayName: string
}

type TemplateElementList = {
    type: "l"
    content: string[]
}

type TemplateElementParagraph = {
    type: "p"
    content: string
}

type TemplateElement = | TemplateElementParagraph
    | TemplateElementList

export type TemplateReturn = {
    subject: string
    body: TemplateElement[]
}

export type TemplateFunction = (props: TemplateProps) => TemplateReturn

export type TemplateObject = {
    [key: string]: TemplateFunction | TemplateObject
}

export const getTerritoryAtPath = (path: string[]): Territory | undefined => {
    let current: Territory | undefined
    let list = COUNTRIES

    for (const code of path) {
        current = list.find(t => t.code === code)
        if (!current) return undefined
        list = current.subs || []
    }

    return current
}

export const placeholder = (placeholder: string, content: string) => {
    if (!content || content == "") return `[${placeholder}]`

    return content
}

export const renderTemplateToHTML = (template?: TemplateElement[]) => {
    if (!template) return ""

    return (template.map(v => {
        if (v.type == "p") {
            return `
        <p style="font-family: Times New Roman; font-size: 16px; line-height: 1.2; margin-top: 10px; margin-bottom: 10px;">
          ${v.content.replaceAll('\n', '<br />')}
        </p>
      `
        }

        if (v.type == "l") {
            return `
        <ul style="font-family: Times New Roman; font-size: 16px; line-height: 1.2; margin-top: 10px; margin-bottom: 10px;">
          ${v.content.map(v => '<li>' + v + '</li>').join('\n')}
        </ul>
      `
        }
    }).join("\n"))
}

const supportedTemplates: TemplateObject = {
    AT: europe,
    BE: europe,
    BG: europe,
    HR: europe,
    CY: europe,
    CZ: europe,
    DK: europe,
    EE: europe,
    FI: europe,
    FR: europe,
    DE: europe,
    GR: europe,
    HU: europe,
    IE: europe,
    IT: europe,
    LV: europe,
    LT: europe,
    LU: europe,
    MT: europe,
    NL: europe,
    PL: europe,
    PT: europe,
    RO: europe,
    SK: europe,
    SI: europe,
    ES: europe,
    SE: europe,
    GB: europe,
    US: {
        CA: california
    }
}

export default supportedTemplates
