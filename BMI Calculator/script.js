const form=document.querySelector("form")
form.addEventListener("submit",function(e){
    e.preventDefault();

    const height=parseInt(document.querySelector("#height").value);
    const weight=parseInt(document.querySelector("#weight").value);
    const result=document.querySelector("#results")
    if(height<0 || weight<0 || isNaN(height) || isNaN(weight)){
        result.innerHTML=`<span>Enter a Valid width and Height</span>`
    }else{
    const bmi=(weight / ((height * height) / 10000)).toFixed(2);
    result.innerHTML=`<span>Your BMI IS : ${bmi}</span>`
    }
})