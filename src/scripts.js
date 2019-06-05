
var fieldObjectFactory = function(value, valid,message){
    var obj = {value: value, valid: valid, message: message, modified: false}
    return obj
}

ko.extenders.validation = function(target, arguments){
    var func = arguments.func
    var param = arguments.param
    target.subscribe(function(){
        func(param)
    });
    return target;
};

function emailValidation(fieldObject) {
    fieldObject.modified(true)
    if (fieldObject.value() == undefined || fieldObject.value().trim() < 1){
       fieldObject.valid(false)
       fieldObject.message("Email is missing!")
    }
   else if(!email_regex.test(fieldObject.value())){
       fieldObject.valid(false)
       fieldObject.message("This is not a valid email!")
   }
   else{
       fieldObject.valid(true)
       fieldObject.message("")
   }
  console.log("New value: " + fieldObject.value());
}

function passwordValidation(fieldObject){
    fieldObject.modified(true)
    if (fieldObject.value() == undefined || fieldObject.value().trim() < 1){
        fieldObject.valid(false)
        fieldObject.message("Password is missing!")
    }
    else{
        fieldObject.valid(true)
        fieldObject.message("")
    }   
}

function repeatPasswordValidation(fieldObjects){
    var firstPasswordField = fieldObjects.firstPassword,
    secondPasswordField    = fieldObjects.secondPassword
    secondPasswordField.modified(true)
    if (secondPasswordField.value() == ""){
        secondPasswordField.valid(false)
        secondPasswordField.message("Repeat your password!")
    }
    else if(secondPasswordField.value() != firstPasswordField.value()){
        secondPasswordField.valid(false)
        secondPasswordField.message("Passwords do not match!")
    }
    else{
        secondPasswordField.valid(true)
        secondPasswordField.message("")
    }
};

function dobValidation(fieldObject){
    fieldObject.modified(true)
        if(fieldObject.value() == undefined || fieldObject.value() == ""){
            fieldObject.valid(false)
            fieldObject.message("Date of birth is required")
        }
        else if (!self.isAcceptableDate(fieldObject.value())){
            fieldObject.valid(false)
            fieldObject.message("You must be between "+ MINIMUM_AGE +" and "+ MAXIMUM_AGE+" years old to subscribe")
        }
        else{ 
            fieldObject.valid(true)
            fieldObject.message("")
        }
};

function genderValidation(fieldObject){
    fieldObject.modified(true)
    if (fieldObject.value() == ""){
        fieldObject.valid(false)
        fieldObject.message("Gender is missing!")
    }
    else{
        fieldObject.valid(true)
        fieldObject.message("")
    }
};

function isAcceptableDate(date){
        var minDOB = new Date()
        var maxDOB = new Date()
        var yearNow = minDOB.getFullYear()
        var yearMinAge = yearNow - MINIMUM_AGE
        var yearMaxAge = yearNow - MAXIMUM_AGE
        maxDOB.setFullYear(yearMinAge)
        minDOB.setFullYear(yearMaxAge)
        var dob = new Date(date);
        if(dob > minDOB && dob < maxDOB){
            return true
        }
        else return false
    }


function AppViewModel(){

    //OPERATORS
    var self = this;
    self.hasAccount = ko.observable(true)
    let array = []
    for(let i=0;i<7;i++){
        array.push(fieldObjectFactory("",false,""))
    }
    self.arrayModel = ko.mapping.fromJS(array)

    //extenders
    self.arrayModel()[SIGNUP_EMAIL].value.extend(           {validation: {func: emailValidation,          param:self.arrayModel()[SIGNUP_EMAIL]}})
    self.arrayModel()[SIGNUP_PASSWORD].value.extend(        {validation: {func: passwordValidation,       param:self.arrayModel()[SIGNUP_PASSWORD]}})
    self.arrayModel()[SIGNUP_REPEAT_PASSWORD].value.extend( {validation: {func: repeatPasswordValidation, param: {secondPassword: self.arrayModel()[SIGNUP_REPEAT_PASSWORD], firstPassword: self.arrayModel()[SIGNUP_PASSWORD]}}})
    self.arrayModel()[GENDER].value.extend(                 {validation: {func: genderValidation,         param: self.arrayModel()[GENDER]}}) 
    self.arrayModel()[DOB].value.extend(                    {validation: {func: dobValidation,            param: self.arrayModel()[DOB]}}) 
    
    self.login = function(){
        var usrPsw = localStorage.getItem(self.arrayModel()[SIGNIN_EMAIL].value())
        if (usrPsw == self.arrayModel()[SIGNIN_EMAIL].value() && usrPsw != null){
            console.log("User has logged in!")
            alert("usesr has logged in")
        }
        else{
            console.log("passwords do not match!")
            alert("email or password do not match")
        }
    }

    self.signup = function(){
        if(self.noErrors()){
            localStorage.setItem(self.arrayModel()[SIGNUP_EMAIL].value(), self.arrayModel()[SIGNUP_PASSWORD].value());
            alert(self.arrayModel()[SIGNUP_EMAIL].value()+" has correctly Signed-up!")
        }
        else{
            console.log("test")
           alert("SNAG! \nThere were errors in the form!")
        }
    }

    self.noErrors = function(){
        self.manualValidation()
        for(var i=2; i<7;i++){
            if (!self.arrayModel()[i].valid()){
                return false
            }
        }
        return true
    }

    self.manualValidation = function(){
       self.arrayModel()[SIGNUP_EMAIL].value.valueHasMutated()
       self.arrayModel()[SIGNUP_PASSWORD].value.valueHasMutated()
       self.arrayModel()[SIGNUP_REPEAT_PASSWORD].value.valueHasMutated()
       self.arrayModel()[DOB].value.valueHasMutated()
       self.arrayModel()[GENDER].value.valueHasMutated()
    }
    //OPERATIONS

    self.toggleSign = function(){
       self.hasAccount(!this.hasAccount())
    } 
}

ko.applyBindings(new AppViewModel());
