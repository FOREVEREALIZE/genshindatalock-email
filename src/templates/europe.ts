import { getTerritoryAtPath, placeholder, type TemplateProps, type TemplateReturn } from "."

const authorities: { [k: string]: string[] } = {
    AT: ["Österreichischen Datenschutzbehörde", "DSB"],
    BE: ["Autorité de la protection des données - Gegevensbeschermingsautoriteit", "APD-GBA"],
    BG: ["Комисия за защита на личните данни - Commission for Personal Data Protection", "КЗЛД-CPDP"],
    HR: ["Agencija za zaštitu osobnih podataka - Personal Data Protection Agency", "AZOP-PDPA"],
    CY: ["Γραφείο Επιτρόπου Προστασίας Δεδομένων Προσωπικού Χαρακτήρα - Office of the Commissioner for Personal Data Protection", "ΟΕΠΔΠ-OCDP"],
    ES: ["Agencia Española de Proteccion de Datos", "AEPD"],
}

const europe = (props: TemplateProps): TemplateReturn => {
    const territory = getTerritoryAtPath(props.territoryPath)

    return {
        subject: `[CONFIRM RECEIPT] Subject Access Request under GDPR`,
        body: [
            { type: 'p', content: 'Dear HoYoverse Privacy Team,' },
            { type: 'p', content: `I am writing to you under the General Data Protection Regulation (GDPR), by which operations in ${territory?.name}, the country I reside, are bound, to formally request access to all personal data that HoYoverse, as the Controller, is processing about me (the Data Subject). This request is being submitted in the context of the #GenshinDataLock campaign. Pursuant to Article 15(1) GDPR, I request that you provide me with a complete copy of all personal data being processed in relation to my account and activities with HoYoverse and Genshin Impact. As per Article 20(1) GDPR, this data should be delivered to me in a structured, commonly used, and machine-readable format (such as CSV, JSON, or equivalent).` },
            { type: 'p', content: 'To help you identify my account, here are my details:' },
            { type: 'l', content: [
                `HoYoverse Account Email: ${placeholder('Your Email', props.email)}`,
                `Genshin Impact UID: ${placeholder('Your UID', props.genshinUid)}`,
                `In-Game Nickname: ${placeholder('Your Genshin Nickname', props.displayName)}`,
            ] },
            { type: 'p', content: 'This request includes all data being processed about me, whether or not it is explicitly listed below. For clarity, here is a non-exhaustive placeholder list of data categories I expect to be included:' },
            { type: 'l', content: [
                'Comprehensive inventory details, such as Food, Gadgets and more.',
                'Comprehensive Artifact details, such as non-5 star Artifacts, Minor Affixes, quality of rolls, etc.',
                'Information about currently equipped weapons and artifacts per character, as well as character health, Elemental Burst loading amount, etc.',
                'Information about Achievements.',
                'Specific granular data regarding in-game exploration, such as opened chests, completed challenge domains, collected Oculi, etc.',
                'Specific information about the currently unlocked entries in the Archive and other related systems such as the Adventurer\'s Handbook, including Quest Dialogue choices.',
                'Detailed information concerning participation in past and present in-game events, including the current "Sunspray Summer Resort” event, including but not limited to wall paintings and minigame progress.',
                'More extensive information related to quests, such as in-progress quests and at what point they are, World Quests, Hangout Events, etc.',
                'Information as shown in HoYoLAB\'s Battle Chronicle, Traveler\'s Diary, Daily Check-In, Character Companionship, etc.',
                'Information about my current progress within Genius Invokation TCG.',
                'Detailed information about the location of Marks on the in-game Map.',
                'Information about currently saved character Parties.',
                'Specific information about current friends, chat logs within the in-game chat system, recent Co-Op sessions, etc.',
                'Details regarding the current progress for the Level-Up of a Character (Character EXP and Ascension status).',
                'The player-chosen names for in-game entities such as Wanderer and the Natlan Tepetlisaur companion.',
                'The currently equipped gadgets and pets.',
                'Details about the progress of Statue of the Seven Offerings, Sigil offering systems such as the Grand Narukami Shrine: Sacred Sakura Tree, Tablet of Tona, Fountain of Lucine, Tree of Dreams, Carp\'s Rest: Votive Rainjade, Frostbearing Tree, etc.',
                'Detailed information about my current progress in the Serenitea Pot, including current layout, Trust Rank, etc.',
                'Details about amount limits on the in-game Shop system, including the integrated Shop accessible via the Paimon Menu as well as physical Shops, such as With Wind Comes Glory, Mingxing Jewelery, Café Lutece, etc.',
                'Information about the progress in Repertoire of Myriad Memories, including related time-limited events.',
                'Information about the current and past progress in the in-game Battle Pass.',
                'Any available details about Surveys.',
                'Information about my current claimed Mail and Gift Mail Box.',
                'Details about current locations and progress of placeable items, such as the Crystalfly Trap, Portable Waypoint, Parametric Transformer, etc.',
                'Information about Expeditions, their progress, rewards, etc.',
                'Any logs sent to the server by the client, such as Crash Logs, Error Logs, etc.',
                'Basic Profile information such as Showcased Characters, current Avatar and Namecard, Signature, etc.',
                'Details about currently collected Enemies or Resources, such as Local Specialties, etc.',
                'Any other information you may identify that relates to me or my account.',
            ] },
            { type: 'p', content: `Please note that this list is illustrative only, and my request applies to all personal data Cognosphere Pte. Ltd. holds or processes about me. According to Article 12(3) GDPR, you are obliged to respond to this request without undue delay and at the latest within one month of receipt, that is, by [DD/MM/YYYY]. I acknowledge that, under the same article, you have the right to extend this period by up to two further months if necessary, provided that you inform me of the reasons for such an extension within one month of receiving this request. If this request is not fulfilled within the legally permitted timeframe or is denied without valid legal basis, I will file a formal complaint with the relevant Data Protection Authority in ${territory!.name}, <strong>${authorities[territory!.code][0]}</strong> (${authorities[territory!.code][1]}), in accordance with Articles 77 and 79 GDPR.` },
            { type: 'p', content: 'Although this request is primarily addressed to the HoYoverse Privacy Team, I am also sending it to the Genshin Impact Customer Support team and the HoYoverse Account Support team for completeness. I kindly ask you to confirm receipt of this request and provide the requested data within the legally mandated timeframe.' },
            { type: 'p', content: `Sincerely,\n${placeholder('Your Full Name', props.fullName)}\n${placeholder('Your Email', props.email)}` },
        ]
    }
}

export default europe
