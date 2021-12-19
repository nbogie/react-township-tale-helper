import { howDoYouMake, thingsToDo, whatCanBeMade, whereIsThe, whereIsTheShrine } from "./townshipInfo"

export interface MyCommand {
    command: string | RegExp;
    callback: (item: string) => void
}


export function genCommands(logAndSpeak: (obj: { text: string }) => void, genNextIdea: () => string): MyCommand[] {
    return [
        {
            command: /(?:hello|are you there|are you awake)/,
            callback: () => {
                logAndSpeak({
                    text: 'Hi there!'
                })
            }
        },
        {
            command: /where is the (.*) (?:shrine|train|chain)/,
            callback: (shrineType: string) => {
                logAndSpeak({
                    text: whereIsTheShrine(shrineType)

                })
            }
        },

        {
            command: /where (?:is|are) the (.*)/,
            callback: (item: string) => {
                logAndSpeak({
                    text: whereIsThe(item),

                })
            }
        },
        {
            command: /What (?:should|could|can) I do/,
            callback: () => {
                logAndSpeak({
                    text: genNextIdea()
                    ,
                })
            }
        },

        {
            command: /tell me everything I (?:should|could|can) do/,
            callback: () => {
                logAndSpeak({
                    text: thingsToDo.join('.  ')
                    ,
                })
            }
        },
        {
            command: /how (?:do|can) (?:you|i) make a? (.*)/,
            callback: (thingToMake: string) => {
                logAndSpeak({
                    text: howDoYouMake(thingToMake),

                })
            }
        },
        {
            command: /What can (?:I|you) make/,
            callback: () => {
                logAndSpeak({
                    text: whatCanBeMade()
                    ,
                })
            }
        }
    ]
};
