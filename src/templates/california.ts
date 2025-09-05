import type { TemplateProps, TemplateReturn } from "."

const california = (props: TemplateProps): TemplateReturn => {
    return {
        subject: `[CONFIRM RECEIPT] Subject Access Request under GDPR`,
        body: `Dear HoYoverse Privacy Team,

I am writing to formally submit a Subject Access Request (SAR) under Article 15 of the General Data Protection Regulation (GDPR), to which operations in ${props.country} are bound. Unless otherwise noted, all Dates and Times in this communication are in Coordinated Universal Time (UTC).
Specifically, I request access to all personal data concerning me that you process in relation to my Genshin Impact account whose details are specified below:

Genshin Impact UID: ${props.genshinUid} (${props.server})
HoYoVerse account email: ${props.email}

In accordance with GDPR, this request includes but is not limited to the following categories of data:

- Comprehensive inventory details, such as Food, Gadgets, and more.
- Comprehensive Artifact details, such as non-5 star Artifacts, Minor Affixes, quality of rolls, etc.
- Information about currently equipped weapons and artifacts per character, as well as character health, Elemental Burst loading amount, etc.
- Information about Achievements.
- Specific granular data regarding in-game exploration, such as opened chests, completed challenge domains, collected Oculi, etc.
- Specific information about the currently unlocked entries in the Archive and other related systems such as the Adventurer's Handbook, including Quest Dialogue choices.
- Detailed information concerning participation in past and present in-game events, including but not limited to progress in current events.
- More extensive information related to quests, such as in-progress quests and their status, World Quests, Hangout Events, etc.
- Information as shown in HoYoLAB's Battle Chronicle, Traveler's Diary, Daily Check-In, Character Companionship, etc.
- Information about my current progress within Genius Invokation TCG.
- Detailed information about the location of Marks on the in-game Map.
- Information about currently saved character Parties.
- Specific information about current friends, chat logs within the in-game chat system, recent Co-Op sessions, etc.
- Details regarding the current progress for the Level-Up of a Character (Character EXP and Ascension status).
- The player-chosen names for in-game entities such as Wanderer and the Natlan Tepetlisaur companion.
- The currently equipped gadgets and pets.
- Details about the progress of Statue of the Seven Offerings and other offering systems (Sacred Sakura Tree, Tree of Dreams, Frostbearing Tree, etc.).
- Detailed information about my current progress in the Serenitea Pot, including current layout, Trust Rank, etc.
- Details about amount limits on the in-game Shop system, including integrated Shops via the Paimon Menu as well as physical Shops.
- Information about the progress in Repertoire of Myriad Memories, including related time-limited events.
- Information about the current and past progress in the in-game Battle Pass.
- Any available details about Surveys.
- Information about my current claimed Mail and Gift Mail Box.
- Details about current locations and progress of placeable items, such as the Crystalfly Trap, Portable Waypoint, Parametric Transformer, etc.
- Information about Expeditions, their progress, rewards, etc.
- Any logs sent to the server by the client, such as Crash Logs, Error Logs, etc.
- Basic Profile information such as Showcased Characters, current Avatar and Namecard, Signature, etc.
- Details about currently collected Enemies or Resources, such as Local Specialties, etc.
- Any other information you may identify that relates to me or my account.

Article 15 GDPR provides me the right to obtain confirmation as to whether or not personal data concerning me is being processed, access to that data, and specific information regarding its processing. This right extends to the provision of a copy of the personal data undergoing processing, provided in a concise, transparent, intelligible, and easily accessible form.

As required by Article 12(3) GDPR, you must provide this information without undue delay and, in any event, within one calendar month of receipt of this request. Where necessary, this period may be extended by a further two months, taking into account the complexity and number of the requests. However, such an extension must be communicated to me within the initial one-month period, together with the reasons for the delay.

Please confirm receipt of this request. Should you fail to comply with your obligations under the GDPR, I will have no choice but to exercise my right to lodge a formal complaint with the Agencia Española de Protección de Datos (AEPD) in Spain, as the competent supervisory authority, and other relevant data protection organizations.

I look forward to your prompt attention to this matter and a full and compliant disclosure of all personal data held concerning me.

Sincerely,
${props.fullName}
${props.email}`
    }
}

export default california
