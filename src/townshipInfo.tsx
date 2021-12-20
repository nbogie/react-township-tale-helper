

export function whereIsTheShrine(shrineName: string) {
    shrineName = shrineName.toLowerCase();
    const lookup: { [key: string]: string } = {
        "blacksmith": "Over the bridge near the camps, then up more stairs",
        "mining": "Overlooking the mine entrance, to the left.",
        "archery": "Right of the town hall, through a pond through the mountain.",
        "warrior": "Left from town hall, through mountain pass maze, and up.",
        'woodcutter': "It's far.  going up the stairs located south of the Smithy",
    }
    const answer = lookup[shrineName];
    return answer ?? ('Valid shrine types: ' + Object.keys(lookup).join(', ') + ".  I don't know about: " + shrineName + " shrine.")

}

const placesIKnowLookup: { [key: string]: string } = {
    "camps": "Beyond the gotera.",
    "cliffs": "through the dust bowl.",
    "ponds": "to the right of the town hall.",
    "well": "to the right of the town hall, then up and to the left.",
    "mountain pass": "to the left of the town hall. it is signposted in town.",
    "dust bowl": "it is signposted in town",
    "televator": "high above the mines - take the road up to the right of the mines",
}

export function whereCanIGo() {
    return Object.keys(placesIKnowLookup).join(' and ');
}
export function whereIsThe(item: string) {
    item = item.toLowerCase();
    const answer = placesIKnowLookup[item];
    return answer ?? ("I don't know of the place called " + item);
}

export function howDoYouMake(item: string) {
    item = item.toLowerCase();

    const answer = makeableThingsLookup[item];
    return answer ?? ("I don't know how to make " + item);
}


export function howDoYouGet(item: string) {
    item = item.toLowerCase();

    const answer = gettableThingsLookup[item];
    return answer ?? ("I don't know how to get " + item);
}
export function whatCanBeMade() {
    return Object.keys(makeableThingsLookup).join(', ');
}
export function whatCanBeGotten() {
    return Object.keys(gettableThingsLookup).join(', ');
}
const makeableThingsLookup: { [key: string]: string } = {
    "red iron": "smelt 2 iron ore with 3 copper ore",
    "hoarder bag": "3 large leather rolls and 23 buckles",
    "quiver": "1 metal plate.  Some other minor items",
    "bucket": "5 metal plates.  Some other minor items",
    "spotlight": "4 metal plates.  Some other minor items",
    "lantern stand": "5 rope bundles, 3 sticks, 1 metal buckle",
    "ore bag": "19 sticks, 1 cloth bundle, 7 rope bundles, 2 leather strips",
    "de-smelter": "50 Iron Ingots and 30 coal",
    "backpack assembler": "20 Iron Ingots",
    "televator": "200 stone and 60 crystal",

}

const gettableThingsLookup: { [key: string]: string } = {
    "red iron": "smelt it from other ores",
    "iron": "Kill turabadas in the mines or beyond. Or, go deep in the mines. Also, find buckets.",
    "gold": "Kill turabadas in the mines.   Or, go deep in the mines.",
    "wood": "In the forest with the gotera, or the cliffs beyond the dust bowl.",
    "stone": "It depends where you have mined already.  It doesn't grow back!",
    "food": "In the presents at the town hall.  Or at the camps.",
}

export const thingsToDo = [
    'Go to the mines, get iron from enemies and loot from chests',
    'Go over behind the mines',
    'Loot the chests before the dust bowl, mine entrance, and sewer at ponds',
    'Visit a shrine to spend a skill point',
    'Repair something around town - that is, upgrade it!',
    'Fight gotera, loot the chests in their wooded valley, then explore the camps.  Take an axe and shield!',
    'Make a better weapon',
    'Make stews for hunger',
    'Improve your backpack',
    'loot the camps beyond the gotera',
    'At night, search the plains and cliffs for heartfruit'
]