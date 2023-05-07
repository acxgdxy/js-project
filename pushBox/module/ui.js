//该模块将元素渲染到game容器中
import * as map from "./map.js";

let divContainer = document.getElementById('game');

//设置方块的长宽
let boxWeight = 45;
let boxHeight = 45;

/**
 * 设置game容器的宽高
 * */
function setDivContainer() {
    divContainer.style.height = boxHeight * map.rowNumber + "px";
    divContainer.style.weight = boxWeight * map.colNumber + "px";
}

/**
 * 判断箱子是否在正确的位置上
 * @param row
 * @param col
 * @returns {boolean}
 */
function isCorrect(row, col) {
    for(let i = 0; i < map.correct.length; i++){
        let point = map.correct[i];
        if(row === point.row && col === point.col){
            return true; // 存在则说明是在正确位置上
        }
    }
    return false;//说明位置不正确
}

/**
 * 渲染地图了，需要将相应的元素插入相应的位置
 * @param row
 * @param col
*/

function setOneBox(row, col) {
    const value = map.content[row][col];
    const div = document.createElement('div');//创建一个div标签
    div.className = "item";
    div.style.left = col * boxWeight + "px";//列
    div.style.top = row * boxHeight + "px";//行

    const correct = isCorrect(row, col);

    if(value === map.PLAYER) { //如果为玩家则进行相应的样式渲染
        div.classList.add("player");
    }
    else if(value === map.WALL) {
        div.classList.add("wall");
    }
    else if(value === map.BOX) {
        if(correct) {//有箱子且为正确位置
            div.classList.add("over-box");
        }
        else {
            div.classList.add("box");
        }
    }
    else{
        if(correct) { //没有箱子，但是位置在正确的位置
            div.classList.add("correct");
        }
        else {
            return ;//只是一个空白的方格
        }
    }

    divContainer.appendChild(div);//将其加入到game容器中
}

function setContainer() {
    divContainer.innerHTML = "";//清空容器
    //遍历位置框架，逐步生成地图
    for(let row = 0; row < map.rowNumber; row++){//行
        for(let col = 0; col < map.colNumber; col++){//列
            console.log(1);
            setOneBox(row, col);
        }
    }
}

export default function () {
    setDivContainer(); //设置地图宽高
    setContainer(); //展示地图内容
}