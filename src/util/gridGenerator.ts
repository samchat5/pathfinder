import Node from "../NodeInterface";

let finalGrid: Array<Array<Node>>;

// Generates a random number in this range INCLUSIVE
const randomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const outerWalls = (): void => {
    const newNodes = finalGrid;
    for (let i = 0; i < finalGrid.length; i += 1) {
        for (let j = 0; j < finalGrid[i].length; j += 1) {
            if (
                i === 0 ||
                j === 0 ||
                j === finalGrid.length - 1 ||
                i === finalGrid.length - 1
            ) {
                newNodes[i][j].isWall = true;
            }
        }
    }
    finalGrid = newNodes;
};

const generateHorizontal = (minX: number, maxX: number, y: number): void => {
    const door = Math.floor(randomNumber(minX, maxX) / 2) * 2 + 1;
    for (let i = minX; i < maxX; i += 1) {
        if (i !== door) {
            finalGrid[y][i].isWall = true;
        }
    }
};

const generateVertical = (minY: number, maxY: number, x: number): void => {
    const door = Math.floor(randomNumber(minY, maxY) / 2) * 2 + 1;
    for (let i = minY; i < maxY; i += 1) {
        if (i !== door) {
            finalGrid[i][x].isWall = true;
        }
    }
};

const innerWalls = (
    isHorz: boolean,
    minX: number,
    maxX: number,
    minY: number,
    maxY: number
): void => {
    if (isHorz) {
        if (maxX - minX < 2) {
            return;
        }
        const y = Math.floor(randomNumber(minY, maxY) / 2) * 2;
        generateHorizontal(minX, maxX, y);
        innerWalls(false, minX, maxX, minY, y - 1);
        innerWalls(false, minX, maxX, y + 1, maxY);
    } else {
        if (maxY - minY < 2) {
            return;
        }
        const x = Math.floor(randomNumber(minX, maxX) / 2) * 2;
        generateVertical(minY, maxY, x);
        innerWalls(true, minX, x - 1, minY, maxY);
        innerWalls(true, x + 1, maxX, minY, maxY);
    }
};

const gridGenerator = (nodes: Array<Array<Node>>): Array<Array<Node>> => {
    finalGrid = nodes;
    outerWalls();
    innerWalls(true, 1, nodes.length - 2, 1, nodes.length - 2);
    return finalGrid;
};

export default gridGenerator;
