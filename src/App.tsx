import { useMemo, useState } from 'react'
import supportedTemplates, { getTerritoryAtPath, renderTemplateToHTML, type TemplateFunction, type TemplateObject } from './templates'
import COUNTRIES from './COUNTRIES'

const servers = [
    { code: 'NA', name: 'North America' },
    { code: 'EU', name: 'Europe' },
    { code: 'AS', name: 'Asia' },
    { code: 'TW', name: 'TW, HK, MO' },
]

function App() {
    const [territoryPath, setTerritoryPath] = useState<string[]>([])
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [genshinUid, setGenshinUid] = useState('')
    const [server, setServer] = useState('')
    const [displayName, setDisplayName] = useState('')

    const emailTemplate = useMemo(() => {
        const findTemplate = (templates: TemplateObject, region: string[]): TemplateFunction | null => {
            if (region.length === 0) return null

            const [head, ...rest] = region
            const template = templates[head]
            if (!template) return null

            if (rest.length === 0) return template as TemplateFunction

            return findTemplate(template as TemplateObject, rest)
        }

        return findTemplate(supportedTemplates, territoryPath)
    }, [territoryPath])

    const templateProps = useMemo(() => {
        return ({
            fullName,
            email,
            territoryPath,
            genshinUid,
            server,
            displayName
        })
    }, [fullName, email, territoryPath, genshinUid, server, displayName])

    const emailTemplateResult = useMemo(() => {
        if (!emailTemplate) return null
        if (typeof emailTemplate != 'function') return null

        return emailTemplate(templateProps)
    }, [emailTemplate, templateProps])

    // Copy to clipboard handler
    const handleCopy = () => {
        navigator.clipboard.write([
            new ClipboardItem({
                "text/html": new Blob([renderTemplateToHTML(emailTemplateResult?.body)], { type: "text/html" }),
                "text/plain": new Blob([], { type: "text/plain" }),
            }),
        ]);
    }

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
            <div className="w-full flex gap-8 justify-center h-3/4">
                <div className="w-1/4 bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-y-scroll p-8 h-full">
                        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">#GenshinDataLock Email Template</h2>
                        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                            {/* Recursive territory selectors */}
                            <>{
                                (() => {
                                    const selectors = []
                                    let path: string[] = []
                                    let list = COUNTRIES
                                    let depth = 0
                                    while (true) {
                                        selectors.push(
                                            <div key={depth}>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    {depth === 0 ? 'Country of Residence' : getTerritoryAtPath(path)?.subLabel || 'Subdivision'}
                                                </label>
                                                <select
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                                    value={territoryPath[depth] || ''}
                                                    onChange={e => {
                                                        const newPath = [...territoryPath.slice(0, depth), e.target.value]
                                                        setTerritoryPath(newPath)
                                                    }}
                                                >
                                                    <option value="">Select {depth === 0 ? 'Country' : getTerritoryAtPath(path)?.subLabel || 'Subdivision'}</option>
                                                    {list.map(t => (
                                                        <option key={t.code} value={t.code}>{t.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        )
                                        const selected = territoryPath[depth]
                                        if (!selected) break
                                        const selectedTerritory = list.find(t => t.code === selected)
                                        if (!selectedTerritory?.subs || selectedTerritory.subs.length === 0) break
                                        path = [...path, selected]
                                        list = selectedTerritory.subs
                                        depth++
                                    }
                                    return selectors
                                })()
                            }</>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Legal Name</label>
                                <input
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    type="text"
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Genshin UID</label>
                                <input
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    type="text"
                                    value={genshinUid}
                                    onChange={e => setGenshinUid(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Server</label>
                                <select
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    value={server}
                                    onChange={e => setServer(e.target.value)}
                                    required
                                >
                                    <option value="">Select Server</option>
                                    {servers.map(s => (
                                        <option key={s.code} value={s.code}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                                <input
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    type="text"
                                    value={displayName}
                                    onChange={e => setDisplayName(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-indigo-700 transition cursor-pointer"
                                onClick={handleCopy}
                            >
                                Copy Email to Clipboard
                            </button>
                            <h3 className="text-xs font-semibold text-center text-indigo-700">
                                None of the data entered in this form is sent to us (#GenshinDataLock team), this website is fully client-side.
                                If you are unable to copy the text using the button above, select it from the text box to the right and copy it directly.
                            </h3>
                        </form>
                    </div>
                </div>
                <div className="w-2/3 bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className='p-8 flex flex-col h-full overflow-y-scroll'>
                        <h3 className="text-xl font-bold mb-4 text-indigo-700">Email Preview</h3>
                        <h3 className="text-sm font-bold text-indigo-700 mb-2">Subject</h3>
                        <pre className="whitespace-pre-wrap break-words bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-800 text-sm mb-4">
                            {emailTemplateResult ? emailTemplateResult.subject : ''}
                        </pre>
                        <h3 className="text-sm font-bold text-indigo-700 mb-2">Body</h3>
                        <p
                            className="break-words bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-800 text-sm flex-grow"
                            dangerouslySetInnerHTML={{__html: renderTemplateToHTML(emailTemplateResult?.body)}}
                        ></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App