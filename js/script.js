const HEIGHT_OF_BOARD = 600;
const SIZE_OF_PIECE = HEIGHT_OF_BOARD / 10;
const WIDTH_OF_BOARD = HEIGHT_OF_BOARD - SIZE_OF_PIECE;
const SIZE_OF_MARK = SIZE_OF_PIECE / 2;
const DISTANCE_SIZE_OF_P_M = SIZE_OF_PIECE - SIZE_OF_MARK;
const CENTER_POINT_RED = {x: SIZE_OF_PIECE, y : (WIDTH_OF_BOARD - SIZE_OF_PIECE) / 2};
const CENTER_POINT_BLUE = {x: HEIGHT_OF_BOARD - 2*SIZE_OF_PIECE, y : (WIDTH_OF_BOARD - SIZE_OF_PIECE) / 2};
const ZONE_NOBLE_Y1 = (WIDTH_OF_BOARD - SIZE_OF_PIECE) / 2 - SIZE_OF_PIECE;
const ZONE_NOBLE_Y2 = (WIDTH_OF_BOARD - SIZE_OF_PIECE) / 2 + SIZE_OF_PIECE;
const ZONE_NOBLE_RX1 = 0
const ZONE_NOBLE_RX2 = 2 * SIZE_OF_PIECE;
const ZONE_NOBLE_BX1 = HEIGHT_OF_BOARD - 3 * SIZE_OF_PIECE;
const ZONE_NOBLE_BX2 = HEIGHT_OF_BOARD - SIZE_OF_PIECE;


var arrBoard = [];  //Mảng tương ứng với bàn cờ
//var arrPiece = ["bP", "bC", "bR", "bN", "bB", "bA", "bK", "rP", "rC", "rR", "rN", "rB", "rA", "rK"]
var isMarked = false; //Biến dùng để đánh dấu đang trong trạng thái chỉ đường cho quân cờ hay không
var turn = 'r';     //Biến dùng để đánh dấu lượt chơi
var board = null;  //Biến tương ứng với thẻ Div của html dùng để vẽ bàn cờ


//Hàm start game
function startGame()
{
    initializeValue();
    if(board == null)
        drawBoard();
    arrangePieceOnBoard();
}

//Hàm khởi tạo giá trị ban đầu cho game
function initializeValue(){
    arrBoard = [["rR", "rN", "rB", "rA", "rK", "rA", "rB", "rN", "rR"],
                ["NN", "NN", "NN", "NN", "NN", "NN", "NN", "NN", "NN"],
                ["NN", "rC", "NN", "NN", "NN", "NN", "NN", "rC", "NN"],
                ["rP", "NN", "rP", "NN", "rP", "NN", "rP", "NN", "rP"],
                ["NN", "NN", "NN", "NN", "NN", "NN", "NN", "NN", "NN"],
                ["NN", "NN", "NN", "NN", "NN", "NN", "NN", "NN", "NN"],
                ["bP", "NN", "bP", "NN", "bP", "NN", "bP", "NN", "bP"],
                ["NN", "bC", "NN", "NN", "NN", "NN", "NN", "bC", "NN"],
                ["NN", "NN", "NN", "NN", "NN", "NN", "NN", "NN", "NN"],
                ["bR", "bN", "bB", "bA", "bK", "bA", "bB", "bN", "bR"],];
    //arrPiece = ["bP", "bC", "bR", "bN", "bB", "bA", "bK", "rP", "rC", "rR", "rN", "rB", "rA", "rK"]
    isMarked = false;
    turn = 'r';
}

//Hàm vẽ bàn cờ
function drawBoard(){
    board = document.createElement("div");

    board.id = "IdBoard";
    board.style.width = WIDTH_OF_BOARD + "px";
    board.style.height = HEIGHT_OF_BOARD + "px";
    board.style.backgroundColor

    document.body.appendChild(board);
}

//vẽ quân cờ
function drawPiece(row, column){
    let node = document.createElement("img");
    
    node.width = SIZE_OF_PIECE;
    node.height = SIZE_OF_PIECE;
    node.typeOfPiece = arrBoard[row][column][0];
    node.src = "./img/piece/" + arrBoard[row][column] + ".png";
    node.className = "piece"
    node.style.top = row*SIZE_OF_PIECE + "px";
    node.style.left= column*SIZE_OF_PIECE + "px";          
    node.positionX = row*SIZE_OF_PIECE;
    node.positionY = column*SIZE_OF_PIECE;
    node.namePiece = arrBoard[row][column];
    node.onclick = function(){onClickFunction(node)};

    board.appendChild(node)
}


//dọn dẹp bàn cờ
function cleanBoard(){
    while (board.firstChild) {
        board.removeChild(board.lastChild);
      }
}


//Hàm xếp cờ lên bàn cờ
function arrangePieceOnBoard(){
    cleanBoard();
    for (let row = 0; row < arrBoard.length; row++) {
        for (let column = 0; column < arrBoard[row].length; column++) {
            if(arrBoard[row][column] != "NN")
            {
                drawPiece(row, column);
            }
            
        }
        
    }
}

//hàm xử lý khi người chơi click vào quân cờ
function onClickFunction(node){
    if(node.typeOfPiece == turn)
    {
        if(isMarked == false)
        {
            markAllNextStep(node)
        }else{
            removeMark();
            if(node.id == "moving"){
                node.id = "";
            }
            else{
                let pieceMoving = document.getElementById("moving");
                pieceMoving.id = "";
                markAllNextStep(node)
                isMarked = true;
                return;
            } 
        }
        
        isMarked = !isMarked;
    }
    
}

//Đánh dấu tất cả nước đi tiếp theo của quân cờ
function markAllNextStep(node){
    let point = {x: node.positionX, y: node.positionY, name: node.namePiece} 
    let points = [];

    if (node.namePiece == "rP" || node.namePiece == "bP")
        points = getAllNextStepP(point);
    else if(node.namePiece == "rC" || node.namePiece == "bC")
        points = getAllNextStepC(point);
    else if(node.namePiece == "rR" || node.namePiece == "bR")
        points = getAllNextStepR(point);
    else if(node.namePiece == "rN" || node.namePiece == "bN")
        points = getAllNextStepN(point);
    else if(node.namePiece == "rB" || node.namePiece == "bB")
        points = getAllNextStepB(point);
    else if(node.namePiece == "rA" || node.namePiece == "bA")
        points = getAllNextStepA(point);
    else if(node.namePiece == "rK" || node.namePiece == "bK")
        points = getAllNextStepK(point);
    
    points = removeStepOutOfBoard(points);
    points = removeStepNotAllowed(points);
    hightLightNextStep(points);
    node.id = "moving";
}

///////////////////////////////////////////////////////
//Mỗi hàm sẽ lấy tất cả các nước đi có thể đi được theo từng quân cờ khác nhau

//Hàm lấy tất cả nước đi tiếp theo có thể đi được của quân tốt
function getAllNextStepP(point)
{
    let points = [];
       
    if(point.name == "rP")
    {
        points.push({x: point.x + SIZE_OF_PIECE, y: point.y})
        if(point.x > (HEIGHT_OF_BOARD - SIZE_OF_PIECE)/2)
        {
            points.push({x: point.x , y: point.y + SIZE_OF_PIECE})
            points.push({x: point.x , y: point.y - SIZE_OF_PIECE})
        }
    }else{
   
        points.push({x: point.x - SIZE_OF_PIECE, y: point.y})
        if(point.x < (HEIGHT_OF_BOARD - SIZE_OF_PIECE)/2)
        {
            points.push({x: point.x , y: point.y + SIZE_OF_PIECE})
            points.push({x: point.x , y: point.y - SIZE_OF_PIECE})
        }
    }

    return points;
}

//Hàm lấy tất cả nước đi tiếp theo có thể đi được của quân pháo
function getAllNextStepC(point)
{
    let points = []; 
    let count = 0;
    
    for (let x = point.x +  SIZE_OF_PIECE; x < HEIGHT_OF_BOARD; x+=SIZE_OF_PIECE) {  
        if(count == 1 && arrBoard[x / SIZE_OF_PIECE][point.y / SIZE_OF_PIECE] != "NN")
            points.push({x: x, y: point.y}) 
        
        if(arrBoard[x / SIZE_OF_PIECE][point.y / SIZE_OF_PIECE] != "NN")
            count++;

        if(count < 1)
            points.push({x: x, y: point.y}) 
    }

    count = 0;
    for (let x = point.x - SIZE_OF_PIECE; x >= 0; x-=SIZE_OF_PIECE) {
        if(count == 1 && arrBoard[x / SIZE_OF_PIECE][point.y / SIZE_OF_PIECE] != "NN")
            points.push({x: x, y: point.y})  
        
        if(arrBoard[x / SIZE_OF_PIECE][point.y / SIZE_OF_PIECE] != "NN")
            count++;

        if(count < 1)
            points.push({x: x, y: point.y})  
    }

    count = 0;
    for (let y = point.y + SIZE_OF_PIECE; y < HEIGHT_OF_BOARD; y+=SIZE_OF_PIECE) {
        if(count == 1 && arrBoard[point.x / SIZE_OF_PIECE][y / SIZE_OF_PIECE] != "NN")
            points.push({x: point.x, y: y})
        
        if(arrBoard[point.x / SIZE_OF_PIECE][y / SIZE_OF_PIECE] != "NN")
            count++;

        if(count < 1)
            points.push({x: point.x, y: y})
    }

    count = 0;
    for (let y = point.y - SIZE_OF_PIECE;  y >=0; y-=SIZE_OF_PIECE) {
        if(count == 1 && arrBoard[point.x / SIZE_OF_PIECE][y / SIZE_OF_PIECE] != "NN")
            points.push({x: point.x, y: y})
        
        if(arrBoard[point.x / SIZE_OF_PIECE][y / SIZE_OF_PIECE] != "NN")
            count++;

        if(count < 1)
            points.push({x: point.x, y: y})
    }

    return points;
}

//Hàm lấy tất cả nước đi tiếp theo có thể đi được của quân xe
function getAllNextStepR(point)
{
    let points = [];   
    let count = 0;
    
    for (let x = point.x + SIZE_OF_PIECE; x < HEIGHT_OF_BOARD; x+=SIZE_OF_PIECE) {
        if(count >= 1)
            break;
        
        points.push({x: x, y: point.y})
        
        if(arrBoard[x / SIZE_OF_PIECE][point.y / SIZE_OF_PIECE] != "NN")
            count++;
    }

    count = 0;
    for (let x = point.x - SIZE_OF_PIECE; x >= 0; x-=SIZE_OF_PIECE) {      
        if(count >= 1)
            break;
        
        points.push({x: x, y: point.y})  
       
        if(arrBoard[x / SIZE_OF_PIECE][point.y / SIZE_OF_PIECE] != "NN")
            count++;
    }

    count = 0;
    for (let y = point.y + SIZE_OF_PIECE; y < HEIGHT_OF_BOARD; y+=SIZE_OF_PIECE) {
        if(count >= 1)
            break;

        points.push({x: point.x, y: y}) 
            
        if(arrBoard[point.x / SIZE_OF_PIECE][y / SIZE_OF_PIECE] != "NN")
            count++;
    }

    count = 0;
    for (let y = point.y - SIZE_OF_PIECE;  y >=0; y-=SIZE_OF_PIECE) {
        if(count >= 1)
            break;

        points.push({x: point.x, y: y}) 
 
        if(arrBoard[point.x / SIZE_OF_PIECE][y / SIZE_OF_PIECE] != "NN")
            count++;
    }

    return points;
}

//Hàm lấy tất cả nước đi tiếp theo có thể đi được của quân Mã
function getAllNextStepN(point)
{
    let points = [];

    if(point.x > 0 && arrBoard[point.x / SIZE_OF_PIECE - 1][point.y / SIZE_OF_PIECE] == "NN")
    {
        points.push({x: point.x - 2*SIZE_OF_PIECE, y: point.y + SIZE_OF_PIECE})
        points.push({x: point.x - 2*SIZE_OF_PIECE, y: point.y - SIZE_OF_PIECE})
    }
    
    if(point.x < 405 && arrBoard[point.x / SIZE_OF_PIECE + 1][point.y / SIZE_OF_PIECE] == "NN")
    {
        points.push({x: point.x + 2*SIZE_OF_PIECE, y: point.y + SIZE_OF_PIECE})
        points.push({x: point.x + 2*SIZE_OF_PIECE, y: point.y - SIZE_OF_PIECE})
    }
    
    if(point.y < 450 && arrBoard[point.x / SIZE_OF_PIECE][point.y / SIZE_OF_PIECE + 1] == "NN")
    {
        points.push({x: point.x - SIZE_OF_PIECE, y: point.y + 2*SIZE_OF_PIECE})
        points.push({x: point.x + SIZE_OF_PIECE, y: point.y + 2*SIZE_OF_PIECE})        
    }
    
    if(point.y > 0 && arrBoard[point.x / SIZE_OF_PIECE][point.y / SIZE_OF_PIECE - 1] == "NN")
    {
        points.push({x: point.x + SIZE_OF_PIECE, y: point.y - 2*SIZE_OF_PIECE})
        points.push({x: point.x - SIZE_OF_PIECE, y: point.y - 2*SIZE_OF_PIECE})
    }

    return points;
}

//Hàm lấy tất cả nước đi tiếp theo có thể đi được của quân tượng
function getAllNextStepB(point)
{
    let points = [];

    if(point.name == "rB" && point.x >= HEIGHT_OF_BOARD / 2 - SIZE_OF_PIECE)
    {
        points.push({x: point.x - 2*SIZE_OF_PIECE, y: point.y - 2*SIZE_OF_PIECE})
        points.push({x: point.x - 2*SIZE_OF_PIECE, y: point.y + 2*SIZE_OF_PIECE})

    } else if(point.name == "bB" && point.x <= HEIGHT_OF_BOARD / 2 + SIZE_OF_PIECE)
    {
        points.push({x: point.x + 2*SIZE_OF_PIECE, y: point.y + 2*SIZE_OF_PIECE})
        points.push({x: point.x + 2*SIZE_OF_PIECE, y: point.y - 2*SIZE_OF_PIECE})

    }else{
        points.push({x: point.x - 2*SIZE_OF_PIECE, y: point.y - 2*SIZE_OF_PIECE})
        points.push({x: point.x - 2*SIZE_OF_PIECE, y: point.y + 2*SIZE_OF_PIECE})
        points.push({x: point.x + 2*SIZE_OF_PIECE, y: point.y + 2*SIZE_OF_PIECE})
        points.push({x: point.x + 2*SIZE_OF_PIECE, y: point.y - 2*SIZE_OF_PIECE})
    }
    
    return points;
}

//Hàm lấy tất cả nước đi tiếp theo có thể đi được của quân sĩ
function getAllNextStepA(point)
{
    let points = [];

    if(point.name == "rA")
    {
        if(point.y == ZONE_NOBLE_Y1 || point.y == ZONE_NOBLE_Y2 || point.x == ZONE_NOBLE_RX1 || point.x == ZONE_NOBLE_RX2)
            points.push({x: CENTER_POINT_RED.x, y: CENTER_POINT_RED.y})
        else{
            points.push({x: point.x - SIZE_OF_PIECE, y: point.y - SIZE_OF_PIECE})
            points.push({x: point.x - SIZE_OF_PIECE, y: point.y + SIZE_OF_PIECE})
            points.push({x: point.x + SIZE_OF_PIECE, y: point.y + SIZE_OF_PIECE})
            points.push({x: point.x + SIZE_OF_PIECE, y: point.y - SIZE_OF_PIECE})
        }

    }else if(point.name == "bA"){
        if(point.y == ZONE_NOBLE_Y1 || point.y == ZONE_NOBLE_Y2 || point.x == ZONE_NOBLE_BX1 || point.x == ZONE_NOBLE_BX2)
            points.push({x: CENTER_POINT_BLUE.x, y: CENTER_POINT_BLUE.y})
        else{
            points.push({x: point.x - SIZE_OF_PIECE, y: point.y - SIZE_OF_PIECE})
            points.push({x: point.x - SIZE_OF_PIECE, y: point.y + SIZE_OF_PIECE})
            points.push({x: point.x + SIZE_OF_PIECE, y: point.y + SIZE_OF_PIECE})
            points.push({x: point.x + SIZE_OF_PIECE, y: point.y - SIZE_OF_PIECE})
        }
    }
    
    return points;
}

//Hàm lấy tất cả nước đi tiếp theo có thể đi được của quân tướng
function getAllNextStepK(point)
{
    let points = [];
    
    points.push({x: point.x + SIZE_OF_PIECE, y: point.y})
    points.push({x: point.x - SIZE_OF_PIECE, y: point.y})
    points.push({x: point.x , y: point.y - SIZE_OF_PIECE})
    points.push({x: point.x , y: point.y + SIZE_OF_PIECE})
  
    
    if(point.name == "rK")
    {
        aPoints = points.filter(function(point, index, arr){            
            if (point.y >= ZONE_NOBLE_Y1 && point.y <= ZONE_NOBLE_Y2 && point.x >= ZONE_NOBLE_RX1 && point.x <= ZONE_NOBLE_RX2)
                return true;
        });
    }else{
        aPoints = points.filter(function(point, index, arr){ 
            if (point.y >= ZONE_NOBLE_Y1 && point.y <= ZONE_NOBLE_Y2 && point.x >= ZONE_NOBLE_BX1 && point.x <= ZONE_NOBLE_BX2)
                return true;
        });
    }

    return aPoints;
}

////////////////////////////////////////////////////////////////////////

//xóa các nước đi tiếp theo mà ra khỏi bàn cờ
function removeStepOutOfBoard(points){
    var filtered = points.filter(function(value, index, arr){ 
        if (value.x >= 0 && value.y >= 0 && value.x < HEIGHT_OF_BOARD && value.y < WIDTH_OF_BOARD )
            return true;
    });

    return filtered;
}

//xóa những nước đi vướng vào quân của ta
function removeStepNotAllowed(points){
    var filtered = points.filter(function(value, index, arr){ 
        if (arrBoard[value.x / SIZE_OF_PIECE][value.y / SIZE_OF_PIECE] == "NN" ||
            arrBoard[value.x / SIZE_OF_PIECE][value.y / SIZE_OF_PIECE][0] != turn)
            return true;
    });

    return filtered;
}

//Xóa những nước đi tiếp theo đang được đáng dấu
function removeMark(){
    let listMark = document.getElementsByClassName("mark");

    while(listMark[0]) {
        listMark[0].parentNode.removeChild(listMark[0]);
    }
}


//Xóa quân cờ đã bị ăn ra khỏi bàn cờ
function removePieceBeEaten(piece)
{
    var listPiece = document.getElementsByClassName("piece");

    for (let i = 0; i < listPiece.length; i++) {
        const element = listPiece[i];
        
        if(element.positionX == piece.positionX && element.positionY == piece.positionY && 
            element.namePiece != piece.namePiece)
        {            
            element.remove();

            return element;
            
        }
        
    }

    return null;
}

//vẽ hightLight
function drawMark(point){
    let node = document.createElement("img");

    node.src = "./img/mark/mark.png";
    node.className = "mark"
    node.width = SIZE_OF_MARK;
    node.height = SIZE_OF_MARK;
    node.style.top = (point.x + DISTANCE_SIZE_OF_P_M / 2) + "px";
    node.style.left= (point.y + DISTANCE_SIZE_OF_P_M / 2) + "px";
    node.positionX = point.x + DISTANCE_SIZE_OF_P_M / 2;
    node.positionY = point.y + DISTANCE_SIZE_OF_P_M / 2;
    node.onclick = function(){movePiece(node)};    

    board.appendChild(node)
}

//vẽ những nước đi tiếp theo có thể đi được lên bàn cờ
function hightLightNextStep(points)
{ 
    for (let index = 0; index < points.length; index++) {
        drawMark(points[index]);
    }
}
//thay đổi vị trí của quân cờ trong mảng và trên bàn cờ
function changePositionOnArrayPieceAndBoard(node){
    let piece = document.getElementById("moving");

    arrBoard[piece.positionX / SIZE_OF_PIECE][piece.positionY / SIZE_OF_PIECE] = "NN";

    piece.style.top = (node.positionX - DISTANCE_SIZE_OF_P_M / 2) + "px";
    piece.style.left = (node.positionY - DISTANCE_SIZE_OF_P_M / 2) + "px";
    piece.positionX = node.positionX - DISTANCE_SIZE_OF_P_M / 2;
    piece.positionY = node.positionY - DISTANCE_SIZE_OF_P_M / 2;

    arrBoard[piece.positionX / SIZE_OF_PIECE][piece.positionY / SIZE_OF_PIECE] = piece.namePiece;
    
    piece.id = "";
    
    return piece;
}

//Di chuyển quân cờ đến vị trí mong muốn
function movePiece(node)
{
    let piece = changePositionOnArrayPieceAndBoard(node);
    removeMark()
    let pieceEaten = removePieceBeEaten(piece);

    if(pieceEaten != null)
        checkWin(pieceEaten);

    
    isMarked = false;
    turn == 'r' ? turn = 'b': turn = 'r';
}




//Kiểm tra xem ai là người chiến thắng
function checkWin(element)
{
    if(element.namePiece == "rK" || element.namePiece == 'bK')
    {
        if(element.typeOfPiece == 'r')
            alert("Xanh thắng");
        else
            alert("Đỏ thắng");

        startGame();
    }
        
}


startGame();
