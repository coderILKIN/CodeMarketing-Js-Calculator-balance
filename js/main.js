

let Form = document.querySelector(".todoForm");

let todoList = document.querySelector(".todoList");

let balancediv = document.querySelector(".balance")

let selectElement = document.getElementById("mySelect");



let operationList = JSON.parse(localStorage.getItem("emeliyatlar")) || [];

let totalMoney = 100;


Form.addEventListener("submit", function(e){
    e.preventDefault();

    let amountInp = e.target.elements["amount"];
    let checkarea = e.target.elements["area"];
    let checkInp = e.target.elements["money"];



    let result = totalMoney - Number(amountInp.value);

    if(checkInp.value === "ML" && Number(amountInp.value) >= totalMoney){
        totalMoney = totalMoney + Number(amountInp.value);
    }
   
    else if(result > 0){
        totalMoney = checkInp.value === "ML" ? totalMoney + Number(amountInp.value) : totalMoney - Number(amountInp.value);

    } 
    else{
        alert(`balans: ${totalMoney} AZN`);
    }

  

   



    let operation = {
        id: Math.floor(Math.random() * 10000),
        amount: Number(amountInp.value),
        area: checkarea.value,
        type: checkInp.value,
        moneyy: totalMoney,
        createDate: new Date(),
        resultt: result
    };


    operationList.push(operation);

    localStorage.setItem("emeliyatlar", JSON.stringify(operationList));
    
    amountInp.value = "";
    amountInp.focus();
    document.querySelector("input[value ='ML']").checked = false;
    document.querySelector("input[value ='MC']").checked = false;


    ShowOperations(operationList);



})



function ShowOperations(operations){

    todoList.innerHTML = "";

    balancediv.innerHTML = "";


    operations.forEach((operationn,index) => {
        if(operationn.resultt > 0 || operationn.type === "ML"){

        let liElement = document.createElement("li");
        liElement.classList.add("todo-item");

        liElement.textContent = operationn.type === "ML" ? `+ ${operationn.amount} AZN ${operationn.area}` : `- ${operationn.amount} AZN ${operationn.area}`;

        
        let deleteBtn = document.createElement("button");
    
        deleteBtn.textContent = "Sil";


        deleteBtn.addEventListener("click", function(e){
            e.stopPropagation();
            operationList.splice(index,1);
            localStorage.setItem("emeliyatlar", JSON.stringify(operationList));
            ShowOperations(operationList);
        })
    
        liElement.append(deleteBtn);
        todoList.append(liElement);



          balancediv.innerHTML = "";
          let balnce = document.createElement("span");

          balnce.textContent = `Balance : ${operationn.moneyy} AZN`;

          balancediv.append(balnce);

          localStorage.setItem("balnce", JSON.stringify(balnce));
          
          
    }
         
    });
    
}



selectElement.addEventListener("change", function(e){
    if(e.target.value == 1){
        ShowOperations(operationList);
    }
    if(e.target.value == 3){
        shoTransfer(operationList);
    }
    if(e.target.value == 2){
        showmexaric(operationList);
    }
  });


function shoTransfer(arrlists){
    todoList.innerHTML = "";
    arrlists.forEach((arrlist) => {
        let liElement = document.createElement("li");
        liElement.classList.add("todo-item");

        if(arrlist.type === "ML"){
        liElement.textContent = `+ ${arrlist.amount} AZN ${arrlist.area}`;
        let deleteBtn = document.createElement("button");
    
        deleteBtn.textContent = "Sil";
        liElement.append(deleteBtn);
        todoList.append(liElement);
        }
    })

}

function showmexaric(newarrlists){
    todoList.innerHTML = "";
    newarrlists.forEach((newarr) => {
        let liElement = document.createElement("li");
        liElement.classList.add("todo-item");

        if(newarr.type === "MC" && newarr.resultt > 0){
        liElement.textContent = `- ${newarr.amount} AZN ${newarr.area}`;
        let deleteBtn = document.createElement("button");
    
        deleteBtn.textContent = "Sil";
        liElement.append(deleteBtn);
        todoList.append(liElement);
        }

    })
}








document.addEventListener("DOMContentLoaded", function(){
    ShowOperations(operationList)
})