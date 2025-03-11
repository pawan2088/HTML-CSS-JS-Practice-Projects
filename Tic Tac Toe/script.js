const boxes=document.querySelectorAll(".box")
const reset=document.getElementById("reset-btn")
const WinnerMessage=document.getElementById("msg")
const newGame_btn=document.getElementById("newGame-btn")
const allFilled=document.getElementsByClassName("box")
valO=true


boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        new Audio("mouse-click-290204.mp3").play();
        if(valO){
            box.innerHTML="O"
            box.style.color = "white";
            box.style.fontWeight="bolder"
            valO=false

        }else{
            box.innerHTML="X"
            box.style.color = "white";
            box.style.fontWeight="bolder"
            valO=true 
        }
        box.disabled=true
        checkWinner()
    })
})
const checkWinner=()=>{
    for (const pattern of winPatterns) {
        let p1=boxes[pattern[0]].innerText
        let p2=boxes[pattern[1]].innerText
        let p3=boxes[pattern[2]].innerText
        if(p1!=="" && p2!="" && p3 && p3!=""){
            if(p1===p2 && p2===p3){
                boxes[pattern[0]].style.color="red"
                boxes[pattern[1]].style.color="red"
                boxes[pattern[2]].style.color="red"
                winFlag=true
                winnerMsg(p1,p2,p3)
            }
        }
    }
}
const winnerMsg=(p1)=>{
    WinnerMessage.innerText=`${p1}, Won the Game!`
    newGame()
    disableBoxes()
}
const newGame=()=>{
    newGame_btn.style.display="block"
    newGame_btn.addEventListener("click",()=>{
        resetNow()
    })
}
const disableBoxes=()=>{
    for (const element of boxes) {
        element.disabled=true
    }
}
const enableBoxes=()=>{
    for (const element of boxes) {
        element.disabled=false
    }
}
function resetNow(){
    boxes.forEach((box)=>{
        box.innerText=""
        WinnerMessage.innerText=""
        newGame_btn.style.display="none"
        enableBoxes()

    })
}
reset.addEventListener("click",resetNow)
const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]