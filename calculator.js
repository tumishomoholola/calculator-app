document.addEventListener("DOMContentLoaded", function(){

// OPEN/CLOSE MODAL
function openCalculator(){ document.getElementById("calculator-modal").style.display="flex"; showMode("standard"); }
window.openCalculator = openCalculator;
document.querySelector(".close").onclick = ()=>{ document.getElementById("calculator-modal").style.display="none"; }

// MODE SWITCH
const modeBtns = document.querySelectorAll(".mode-btn");
const modes = document.querySelectorAll(".calc-mode");
function showMode(mode){ modes.forEach(m=>m.style.display="none"); document.getElementById(mode).style.display="block"; }
modeBtns.forEach(btn=>{ btn.addEventListener("click", ()=>showMode(btn.dataset.mode)); });

// STANDARD CALCULATOR
const display = document.getElementById("display");
let inputArray = []; // store inputs
function updateDisplay(){ display.value = inputArray.join('') || "0"; }

document.querySelectorAll(".number-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{ inputArray.push(btn.dataset.number); updateDisplay(); });
});
document.querySelectorAll(".operator-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{ inputArray.push(btn.dataset.action); updateDisplay(); });
});

// FUNCTION BUTTONS
document.querySelectorAll(".function-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
        const action = btn.dataset.action;
        if(action==="clear"){ inputArray=[]; updateDisplay(); }
        if(action==="back"){ inputArray.pop(); updateDisplay(); }
        if(action==="percent"){ 
            try { inputArray=[(eval(inputArray.join(''))/100).toString()]; updateDisplay(); }
            catch(e){ inputArray=[]; updateDisplay(); }
        }
        if(action==="sqrt"){
            try { inputArray=[Math.sqrt(eval(inputArray.join(''))).toString()]; updateDisplay(); }
            catch(e){ inputArray=[]; updateDisplay(); }
        }
    });
});

// EQUALS
document.querySelector(".equal-btn").addEventListener("click", ()=>{
    try{
        inputArray=[eval(inputArray.join('')).toString()];
        updateDisplay();
    }catch(e){ inputArray=["Error"]; updateDisplay(); }
});

// BMI
document.getElementById("bmi-calc").onclick = ()=>{
    const weight=parseFloat(document.getElementById("weight").value);
    const height=parseFloat(document.getElementById("height").value)/100;
    if(weight && height){
        const bmi=(weight/(height*height)).toFixed(2);
        document.getElementById("bmi-result").innerText=`Your BMI is ${bmi}`;
    } else document.getElementById("bmi-result").innerText="Enter valid values";
};

// LOAN
document.getElementById("loan-calc").onclick = ()=>{
    const principal=parseFloat(document.getElementById("principal").value);
    const interest=parseFloat(document.getElementById("interest").value)/100/12;
    const n=parseFloat(document.getElementById("years").value)*12;
    if(principal && interest && n){
        const payment=(principal*interest)/(1-Math.pow(1+interest,-n));
        document.getElementById("loan-result").innerText=`Monthly Payment: R${payment.toFixed(2)}`;
    } else document.getElementById("loan-result").innerText="Enter valid values";
};

});
