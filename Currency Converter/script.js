const baseUrl="https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_P3GA52JYBAJgX8jWoPJBHagrHDtU4pU3uRY21C2J&currencies="
let fromCurr=document.querySelector(".from select")
let toCurr=document.querySelector(".to select")
const dropdowns=document.querySelectorAll(".dropdown select")
const btn=document.querySelector("form button")
const msg=document.querySelector("#msg")
for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode=="USD"){
            newOption.selected="selected"
        }else if(select.name==="to" && currCode=="INR"){
            newOption.selected="selected"
        }
        select.appendChild(newOption);

        
    }
    
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    })

}

function updateFlag(element){
    let currCode=element.value
    let countryCode=countryList[currCode]
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img=element.parentElement.querySelector("img")
    img.src=newSrc
}
window.addEventListener("load",()=>{
    btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input")
    let amtVal=amount.value
    if(amtVal=='' || amtVal<1){
        amtVal=1
        amount.value="1"
    }
    const URL=`${baseUrl}${toCurr.value}&base_currency=${fromCurr.value}`
  
    
    let response=await fetch(URL);
    let data=await response.json();
    let rate = data.data[toCurr.value];
    let finalAmt=amount.value*rate
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`
    
    
})
})