var myForm = document.getElementById("myForm");

var nameRegex = /^[a-zA-Z]+$/;
var emailRegex = /^[a-z0-9.]{1,64}@northeastern.edu$/
var phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
var zipRegex = /^\d{5}$/;
var  map = new Map();

map.set('firstName', 'First name');
map.set('lastName', 'Last name');
map.set('city', 'City');
map.set('state', 'State');
map.set('emailId', 'Email ID');
map.set('phoneNumber', 'Phone Number');
map.set('streetAddress1', 'Address Line 1');
map.set('comments', 'Comments');
map.set('zipcode', 'Zip code');
map.set('specialInstructions', 'Special Instructions');

var drinkDropDownValue = document.getElementById("drinkDropDown").value;
document.getElementsByClassName("option_" + drinkDropDownValue)[0]
        .style.display = "block";

if(document.getElementById("formData").rows.length ==1){
    document.getElementById("formData").style.display = "none";
}

document.querySelectorAll('input[name="hotCofee"]').forEach(el => {
    el.addEventListener('change', displaySpecialInstructions)
});
document.querySelectorAll('input[name="soda"]').forEach(el => {
    el.addEventListener('change', displaySpecialInstructions)
});
document.querySelectorAll('input[name="coldCoffee"]').forEach(el => {
    el.addEventListener('change', displaySpecialInstructions)
});
document.querySelectorAll('input[name="lassi"]').forEach(el => {
    el.addEventListener('change', displaySpecialInstructions)
});
document.querySelectorAll('input[name="water"]').forEach(el => {
    el.addEventListener('change', displaySpecialInstructions)
});



function validate(el){
    var elementId = el.id;
    var elemtntName = el.name;
    if(elemtntName == "source"){
        validateElementByName(el);
    }else{
        validateElementById(el);
    }
}



function validateElementByName(el){
    var parentElement = el.parentElement;
    if(el.checked){
        parentElement.classList.remove("error");
        parentElement.getElementsByTagName('span')[0]
                .innerHTML = "";

    }
}

function validateElementById(el){
    var value = el.value;
    var parentElement = el.parentElement;
    if(value.trim().length == 0){
        el.style.border = "2px solid red";
        el.style.background = "red";
        el.style.borderRadius = "3px";
        parentElement.setAttribute('class',parentElement.className ? parentElement.className +' error' : 'error');
        parentElement.getElementsByTagName('span')[0]
        .innerHTML = map.get(el.id) + " is required";
        return;
    }
    switch(el.id){
        case "firstName":
        case "lastName" :
        case "city":
        case "state":
            if(!value.trim().match(nameRegex)){
                el.style.border = "2px solid red";
                el.style.background = "red";
                el.style.borderRadius = "3px";
                parentElement.setAttribute('class','error');
                parentElement.getElementsByTagName('span')[0]
                .innerHTML = map.get(el.id)  + " has to be alphabets. Numeric and special are characters not allowed";
            }else{
                el.style.border = "";
                el.style.background = "white";
                el.style.border = "5px solid green";
                el.style.borderRadius = "5px";
                parentElement.classList.remove("error");
            }
            break;
        case "emailId":
            if(!value.trim().match(emailRegex)){
                el.style.border = "2px solid red";
                el.style.background = "red";
                parentElement.setAttribute('class','error');
                parentElement.getElementsByTagName('span')[0]
                .innerHTML = map.get(el.id)  + " has to belong to northeastern domain.";
            }else{
                el.style.border = "";
                el.style.background = "white";
                el.style.border = "5px solid green";
                el.style.borderRadius = "5px";
                parentElement.classList.remove("error");
            }
            break;
        case "phoneNumber":
            if(el.value.length == 3 || el.value.length == 7)
                el.value = el.value + "-"; 
            if(!value.trim().match(phoneRegex)){
                el.style.border = "2px solid red";
                el.style.background = "red";
                parentElement.setAttribute('class','error');
                parentElement.getElementsByTagName('span')[0]
                .innerHTML ="Phone number has to be numeric and should have 10 digits in the following format \' xxx-xxx-xxxx\'";

            }else{
                el.style.border = "";
                el.style.background = "white";
                el.style.border = "5px solid green";
                el.style.borderRadius = "5px";
                parentElement.classList.remove("error");    
            }
            break;
        case "zipcode":
            if(!value.trim().match(zipRegex)){
                el.style.border = "2px solid red";
                el.style.background = "red";
                parentElement.setAttribute('class','error');
                parentElement.getElementsByTagName('span')[0]
                .innerHTML ="Please enter 5 digit ZIP code";

            }else{
                el.style.background = "white";
                el.style.border = "5px solid green";
                el.style.borderRadius = "5px";
                parentElement.classList.remove("error");   
            }
            break;
        case "streetAddress1":
        case "comments":
            el.style.border = "";
            el.style.background = "white";
            el.style.border = "5px solid green";
            el.style.borderRadius = "5px";
            parentElement.classList.remove("error"); 
            break;
        case "specialInstructions":
            el.style.border = "";
            el.style.background = "white";
            el.style.border = "5px solid green";
            el.style.borderRadius = "5px";
            parentElement.classList.remove("error"); 
            break;

    }
}

function submit2(event){
    event.preventDefault()
    var selected = false;
    var radioGroup = document.getElementsByClassName("radio-group")[0];
    var inputList = radioGroup.querySelectorAll("input");
    var spanErrorMessage;
    inputList.forEach(el => {
        if(el.checked)
            selected = true;
    });
    spanErrorMessage =  radioGroup.querySelectorAll("span");
    
    if(!selected){
        radioGroup.setAttribute('class' , radioGroup.className ? radioGroup.className + ' error' : 'error');
        spanErrorMessage[0].innerHTML = "Please select title";
        alert("Some fields are either missing/having incorrect data in the form , Please Rectify them and submit again");
        document.querySelectorAll("input[type=text]:not(.ignore)")
        .forEach(el => validate(el));
        document.querySelectorAll("textarea")
        .forEach(el => validate(el));
        return;
    }else{
        radioGroup.classList.remove('error');
        spanErrorMessage[0].innerHTML = '';
    }
    selected = false;
    var checkboxGroup = document.getElementsByClassName("checkbox-group")[0];
    var inputListCheckBox = checkboxGroup.querySelectorAll("input");
    var spanErrorMessage2 =   checkboxGroup.querySelectorAll("span");
    inputListCheckBox.forEach(el => {
        if(el.checked)
            selected = true;
    });
    if(!selected){
        checkboxGroup.setAttribute('class' , checkboxGroup.className ? checkboxGroup.className +' error' : 'error');
        spanErrorMessage2[0].innerHTML = "Please select one of the option"; 
        alert("Some fields are either missing/having incorrect data in the form , Please Rectify them and submit again");
        document.querySelectorAll("input[type=text]:not(.ignore)")
        .forEach(el => validate(el));
        document.querySelectorAll("textarea")
        .forEach(el => validate(el));
        return;
    }else{
        checkboxGroup.classList.remove('error');
        spanErrorMessage2[0].innerHTML = '';
    }

    document.querySelectorAll("input[type=text]:not(.ignore)")
    .forEach(el => validate(el));
    
    document.querySelectorAll("textarea")
    .forEach(el => validate(el));

    var errorClass = document.querySelector(".error");
    if(null != errorClass){
        alert("Some fields are either missing/having incorrect data in the form , Please Rectify them and submit again");
        return;
    }
    document.querySelectorAll("input[type=text]:not(.ignore)")
    .forEach(el =>
        el.style.border = "");
    document.querySelectorAll("textarea")
    .forEach(el =>  el.style.border = "");
    copyFormData(myForm);
    
    myForm.reset();
    hideDropDown(document.querySelector('input[name="freeSwag"]:checked'));
    changeCheckBoxDisplay(document.querySelector('select[name="drinkDropDown"]'));
    displaySpecialInstructions();
    return false;
}

function copyFormData(myForm){
    document.getElementById("formData").style.display = "block";
    var inputList = document.querySelectorAll("#myForm input[type=text]");
    var table = document.getElementById('formData');
    var titleValue = document.querySelector('input[name="title"]:checked').value;
    var newRow = table.insertRow();
    var newCol = newRow.insertCell();
    newCol.innerHTML = titleValue;
    inputList.forEach(el => {
        newCol = newRow.insertCell();
        newCol.innerHTML = el.value;
    });
    var socialMedia =   document.querySelectorAll('input[name="source"]:checked');
    var text = "";
    socialMedia.forEach(el => text += el.value + ", "); 
    newCol = newRow.insertCell();
    newCol.innerHTML = text;
    inputList = document.querySelectorAll("#myForm textarea");
    newCol = newRow.insertCell();
    newCol.innerHTML = inputList[0].value;
    var freeSwag = document.querySelector('input[name="freeSwag"]:checked').value;
    newCol = newRow.insertCell();
    newCol.innerHTML = freeSwag;
    if(freeSwag == 'yes'){
        var dropDown = document.getElementById('drinkDropDown');
        newCol = newRow.insertCell();
        newCol.innerHTML = dropDown.options[dropDown.selectedIndex].text;  
        var checkboxList = document.querySelectorAll(".option_" + dropDown.value + " input[type=checkbox]");
        var specialInstructions = document.getElementById('specialInstructions');
        var selected = false;
        checkboxList.forEach(el => {
            console.log(el.checked)
            if(el.checked)
                selected = true;
        });
        if(selected){
            newCol = newRow.insertCell();
            newCol.innerHTML = specialInstructions.value;
        }
    }
   

}

function changeCheckBoxDisplay(el){
    var className = "option_";
    for(let i = 1;i < 6;i++){
        document.getElementsByClassName(className + i)[0]
        .style.display = "none";
    }
    document.getElementsByClassName(className+ el.value)[0]
        .style.display = "block";
}

function hideDropDown(el){
    if(el.value == 'no'){
        document.getElementsByClassName('dropdown')[0]
        .style.display = "none";
    }else{
        document.getElementsByClassName('dropdown')[0]
        .style.display = "block";
    }
}


function displaySpecialInstructions(){
    var drinkDropDownValue = document.getElementById('drinkDropDown').value;
    var checkboxList = document.querySelectorAll(".option_" + drinkDropDownValue + " input[type=checkbox]");
    var specialInstructions = document.getElementsByClassName('special-instructions')[0];
    var selected = false;
    checkboxList.forEach(el => {
        console.log(el.checked)
        if(el.checked)
            selected = true;
    });
    console.log(selected);
    console.log(specialInstructions);   
    if(selected){
        specialInstructions.style.display = "block";
    }else{
        specialInstructions.style.display = "none";
    }
}

