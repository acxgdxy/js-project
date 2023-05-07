import * as map from "./map.js";

/**
 * 设置指定的操作
 * @param direction: right left up down
 * */


/**
 * 获取玩家位置
 * */

function getPlayerPoint() {
    for(let row = 0; row < map.rowNumber; row++) {
        for(let col = 0; col < map.colNumber; col++) {
            if(map.content[row][col] === map.PLAYER){
                return {
                  row: row,
                  col: col
                };
            }
        }
    }
    throw new Error("玩家消失不见啦！！！");
}

/**
 * @param row 当前的行
 * @param col 当前的列
 * @param direction 键盘输入的操作
 * */
function getNextInfo(row, col, direction) {
    if(direction === "up") {
        return {
            row: row - 1,
            col: col,
            value: map.content[row - 1][col]//位置的值
        };
    }
    else if(direction === "down") {
        return {
            row: row + 1,
            col: col,
            value: map.content[row + 1][col]
        };
    }
    else if(direction === "left") {
        return {
            row: row,
            col: col - 1,
            value: map.content[row][col - 1]
        };
    }
    else if(direction === "right") {
        return {
            row: row,
            col: col + 1,
            value: map.content[row][col + 1]
        };
    }
}

/**
 * @param Point1
 * @param Point2
 * 位置交换
 * */
function exchange(Point1, Point2) {
    const temp = map.content[Point1.row][Point1.col];
    map.content[Point1.row][Point1.col] = map.content[Point2.row][Point2.col];
    map.content[Point2.row][Point2.col] = temp;

}

/**
 * @param direction 键盘操作
 * 实现游戏操作和页面的渲染
 * */
export function playerMove(direction) {
    const playerPoint = getPlayerPoint(); //获取玩家位置
    const nextInfo = getNextInfo(playerPoint.row, playerPoint.col, direction);//获取下一步的信息

    //判断下一步信息，进行是否可以移动的决策
    if(nextInfo.value === map.WALL){
        return false;//不能移动
    }

    if(nextInfo.value === map.SPACE) {
        exchange(playerPoint, nextInfo);
        return true;
    }
    else { //下一个是箱子
        //判断箱子是否可以移动，取决于箱子的前进路线是否为空
        let nextNextInfo = getNextInfo(nextInfo.row, nextInfo.col, direction);
        if(nextNextInfo.value === map.SPACE){
            exchange(nextInfo, nextNextInfo);//箱子与下一个箱子进行交换
            exchange(playerPoint, nextInfo);//玩家与下一个位置进行交换
            return true;
        }
        else {
            return false;
        }
    }

}

/**
 * 判断箱子是不是都在正确的位置上
 * */
export function isWin() {
    for (let i = 0; i < map.correct.length; i++){
        const point = map.correct[i];
        if(map.content[point.row][point.col] !== map.BOX){
            return false; //只要有一个位置上没有正确，则说明没有赢
        }
    }
    return true;
}