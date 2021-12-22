
interface MineLevel {
    toExit: string;
    isCrystal?: boolean;
}


export const minesMap: { [key: number]: MineLevel } = {
    1: {
        toExit: "Go straight until you get to two wooden structures.  Exit is on far side of the wooden structures"
    },
    2: {
        toExit: "It's directly underneath the stairs.  Go half way down stairs, turn right.  Drop through opening.  Turn right. Exit is just ahead."
    },
    3: {
        toExit: `As you enter the level, you will see an outpost with gallows on the left.
Go down the stairs (we planted a shard on the right side).
There will be a flat part with a drop down to a cave-like structure.
Head right just before you hit the gallows.  Go straight, to exit.`
    },
    4: {
        toExit: "Go straight all the way, maybe very slightly left of straight."
    },
    5: {
        toExit: `
Go halfway down, onto big flat rock.  
Then keep going down to another flat rock and drop off.
Turn right to the structure with gallows and wooden chest.  
Go through it.
Keep going until you get to another small structure with gallows and chest. Its steps point to the exit.`
    },
    6: {
        toExit: `Head straight until you hit a wall.
Turn left and go up staircase and through gallows, and beyond.  
Go underneath second gallows onto large flat rock.
Go through cave entrance with large embedded gallows.
Hug left wall to exit.`
    },
    7: {
        isCrystal: true,
        toExit: `
Go straight until you hit a wall.  
Turn right and head towards the octagonal column.
Slightly to the left of the octagonal column, keep going straight until you reach a wooden structure with a purple crystal located on its left side.
Go through the wooden structure, and turn right at the purple crystal, with the cave wall on your left side.  
Head straight until exit.`
    },
    8: {
        isCrystal: true,
        toExit: `
    Come partially down the stairs until you can see to the right.  
    You will see a hexagonal column. This column is inside the exit.`
    },
    9: {
        isCrystal: true,
        toExit: `
        Head down to the second last platform before the ground floor.
Look left to find a cluster of 5 pillars.
Exit is just past these pillars.`
    },
    10: {
        isCrystal: true,
        toExit: ""
    }
}
export const wordToNumberMap: { [key: string]: number } = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'ten': 10,
    'eleven': 11,
    'twelve': 12,
    'thirteen': 13,
    'fourteen': 14
}
