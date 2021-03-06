import { howDoYouGet, howDoYouMake, howDoYouNavigateLevel, thingsToDo, whatCanBeGotten, whatCanBeMade, whereCanIGo, whereIsThe, whereIsTheShrine } from "./townshipInfo"
import { wordToNumberMap } from "./townshipMinesMap";

export interface MyCommand {
    command: string | RegExp;
    callback: (item: string) => void
}

function getShrineName(str: string): string | null {
    const regex = /(warrior|blacksmith|archery|mining|woodcutter) (?:shrine|train|chain)/;
    const res = str.match(regex);
    if (res && res.length > 0) {
        return res[1];
    } else {
        return null;
    }
}

export function genCommands(logAndSpeak: (obj: { text: string }) => void, genNextIdea: () => string): MyCommand[] {
    return [
        {
            command: /(?:hello|are you there|are you awake|can you hear me)/,
            callback: () => {
                logAndSpeak({
                    text: 'Hi there!'
                })
            }
        },
        {
            command: /where (?:is|are) the (.*)/,
            callback: (match: string) => {
                const shrineName = getShrineName(match);
                if (shrineName) {
                    console.log({ match })
                    logAndSpeak({
                        text: whereIsTheShrine(shrineName)
                    })
                }
                else {
                    logAndSpeak({
                        text: whereIsThe(match),
                    });
                }
            }
        },
        {
            command: /Where (?:should|could|can) I go/,
            callback: () => {
                logAndSpeak({
                    text: whereCanIGo()
                    ,
                })
            }
        }, {
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
            command: /(?:how|where) (?:do|can) (?:you|i) get (?:a )?(.*)/,
            callback: (desiredThing: string) => {
                logAndSpeak({
                    text: howDoYouGet(desiredThing),

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
        ,
        {
            command: /What can (?:I|you) get/,
            callback: () => {
                logAndSpeak({
                    text: whatCanBeGotten()
                    ,
                })
            }
        },

        {
            command: /(?:how) (?:do|can) (?:you|i) navigate level ?(.*)/,
            callback: (levelName: string) => {
                const levelNum: number = wordToNumberMap[levelName] ?? parseInt(levelName);
                console.log("navigation: ", { levelNum, levelName })
                if (levelNum > 0) {
                    logAndSpeak({
                        text: howDoYouNavigateLevel(levelNum),
                    })
                } else {
                    logAndSpeak({ text: 'Unrecognised level number: ' + levelName });
                }
            }
        },
    ]
};
