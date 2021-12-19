

export function whereIsTheShrine(shrineName: string) {
    shrineName = shrineName.toLowerCase();
    const lookup: { [key: string]: string } = {
        "blacksmith": "Over the bridge near the camps, then up more stairs",
        "mining": "Above the mine entrance",
        "archery": "Right of the town hall, through a pond through the mountain.",
        "warrior": "Left from town hall, through mountain pass maze, and up.",
        'woodcutter': "It's far.  going up the stairs located south of the Smithy",
    }
    const answer = lookup[shrineName];
    return answer ?? ('Valid shrine types: ' + Object.keys(lookup).join(', ') + ".  I don't know about: " + shrineName + " shrine.")

}

export function whereIsThe(item: string) {
    item = item.toLowerCase();
    const lookup: { [key: string]: string } = {
        "camps": "Beyond the gotera",
        "cliffs": "through the dust bowl",
        "ponds": "to the right of the town hall",
        "well": "to the right of the town hall, then up and to the left"
    }
    const placesIKnow = Object.keys(lookup).join(' and ');
    const answer = lookup[item];
    return answer ?? ("I don't know of the place called " + item + ".  I know about" + placesIKnow);
}

export function howDoYouMake(item: string) {
    item = item.toLowerCase();

    const itemsIKnow = Object.keys(makeableThingsLookup).join(' and ');
    const answer = makeableThingsLookup[item];
    return answer ?? ("I don't know how to make " + item + ".  I know about" + itemsIKnow);
}
export function whatCanBeMade() {
    return Object.keys(makeableThingsLookup).join(', ');
}
const makeableThingsLookup: { [key: string]: string } = {
    "red iron": "smelt 2 iron ore with 3 copper ore",
    "hoarder bag": "3 large leather rolls and 23 buckles",
    "quiver": "1 metal plate.  Some other minor items",
    "bucket": "5 metal plates.  Some other minor items",
    "spotlight": "4 metal plates.  Some other minor items",
    "lantern stand": "5 rope bundles, 3 sticks, 1 metal buckle",
    "ore bag": "19 sticks, 1 cloth bundle, 7 rope bundles, 2 leather strips",
    "desmelter": "50 Iron Ingots and 30 coal",
    "backpack assembler": "20 Iron Ingots",
    "televator": "200 stone and 60 crystal",

}
export const thingsToDo = [
    'Go to the mines, get iron from enemies and loot from chests',
    'Go over behind the mines',
    'Loot the chests before the dust bowl, mine entrance, and sewer at ponds',
    'Visit a shrine to spend a skill point',
    'make a repair around town',
    'Fight gotera, loot the chests in their wooded valley, then explore the camps.  Take an axe and shield!',
    'Make a better weapon',
    'Improve your backpack',
    'loot camps beyond the gotera',
]