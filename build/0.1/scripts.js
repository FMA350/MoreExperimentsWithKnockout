
// function AppViewModel(){
//     let self = this;
//     // var loginArray = ko.observableArray([
//     //     { name: "emailLogin", flag: true, message: ""},
//     //     { name: "passwordLogin", flag: true, message: ""},
//     // ]);

    
//     //UI observables
//     //login
//     self.emailLogin = ko.observable();
//     ko.when(function(){
//         AppViewModel.emailLogin().trim() != undefined
//     },
//     function(result){
//         self.emailSignupFlag(false)
//         self.passwordSignup1Message("Password is required!")
//     })
//     self.emailLoginFlag = ko.observable(true)


//     self.passwordLogin =  ko.observable();
//     self.passwordLoginFlag = ko.observable(true)

//     //signup
//     self.emailSignup = ko.observable();
//     self.emailSignupFlag = ko.observable(true);
//     self.emailSignupMessage = ko.observable("");
//     self.passwordSignup1 =  ko.observable();
//     self.passwordSignup1Flag = ko.observable(true);
//     self.passwordSignup1Message = ko.observable("")
//     self.passwordSignup2 = ko.observable();
//     self.passwordSignup2Flag = ko.observable(true);
//     self.passwordSignup2Message = ko.observable("")
//     self.dob = ko.observable();
//     self.dobFlag = ko.observable(true);
//     self.dobMessage = ko.observable("")
//     self.radioSelectedOptionValue = ko.observable("")
//     self.radioSelectedOptionValueFlag = ko.observable(true);
//     self.radioSelectedOptionValueMessage = ko.observable("")
//     self.hasAccount = ko.observable(true)



//     //operations



//     // self.login = function(){
//     //     var usrPsw = localStorage.getItem(self.emailLogin())
//     //     if (usrPsw == self.passwordLogin() && usrPsw != null) 
//     //         console.log("User has logged in!")
//     //     else{
//     //         console.log("passwords do not match!")
//     //     }
//     // }

    // self.isAcceptableDate = function(date){
    //     var minDOB = new Date()
    //     var maxDOB = new Date()
    //     var yearNow = minDOB.getFullYear()
    //     var yearMinAge = yearNow - MINIMUM_AGE
    //     var yearMaxAge = yearNow - MAXIMUM_AGE
    //     maxDOB.setFullYear(yearMinAge)
    //     minDOB.setFullYear(yearMaxAge)
    //     var dob = new Date(date);
    //     if(dob > minDOB && dob < maxDOB){
    //         return true
    //     }
    //     else return false
    // }


//     //self.checkForm = function(){
//         // if (self.emailSignup() == undefined || self.emailSignup().trim() < 1){
//         //     self.emailSignupFlag(false)
//         //     self.emailSignupMessage("Email is missing!")
//         // }
//         // else if(!email_regex.test(self.emailSignup())){
//         //     self.emailSignupFlag(false)
//         //     self.emailSignupMessage("This is not a valid email!")
//         // }
//         // else{
//         //     self.emailSignupFlag(true)
//         //     self.emailSignupMessage("")
//         // }
//         // if (self.passwordSignup1() == undefined || self.passwordSignup1().trim() < 1){ 
//         //     self.passwordSignup1Flag(false)
//         //     self.passwordSignup1Message("Password is required!")
//         // }
//         // else{
//         //     self.passwordSignup1Flag(true)
//         //     self.passwordSignup1Message("")

//         // }
//         // if (self.passwordSignup2() != self.passwordSignup1() && self.passwordSignup1() != undefined){
//         //     self.passwordSignup2Flag(false)
//         //     self.passwordSignup2Message("The passwords do not match!")

//         // }
//         // else{
//         //     self.passwordSignup2Flag(true)
//         //     self.passwordSignup2Message("")

//         // }
        // if(self.dob() == undefined){
        //     self.dobFlag(false)
        //     self.dobMessage("Date of birth is required")
        // }
        // else if (!self.isAcceptableDate(self.dob())){
        //     self.dobFlag(false)
        //     self.dobMessage("You must be between"+ MINIMUM_AGE +" and "+ MAXIMUM_AGE+" years old to subscribe")

        // }
        // else{ 
        //     self.dobFlag(true)
        //     self.dobMessage("")
        // }
//         // if(self.radioSelectedOptionValue() == ""){
//         //     self.radioSelectedOptionValueFlag(false)
//         //     self.radioSelectedOptionValueMessage("Please select your gender")

//         // }
//         // else{
//         //     self.radioSelectedOptionValueFlag(true)
//         //     self.radioSelectedOptionValueMessage("")

//         // }
//    // }

//     // self.signup = function(){
//     //     if(self.noErrors()){
//     //         console.log("signing up!")
//     //         localStorage.setItem(self.emailSignup(), self.passwordSignup1());
//     //     }        
//     // }

//     // self.reset = function(){
//     //     console.log("reset pressed")
//     //     self.emailLogin("")
//     //     self.emailLoginFlag(true)
    
//     //     self.passwordLogin("");
//     //     self.passwordLoginFlag(true)
    
//     //     //signup
//     //     self.emailSignup("");
//     //     self.emailSignupFlag(true);
//     //     self.emailSignupMessage("");
//     //     self.passwordSignup1("");
//     //     self.passwordSignup1Flag(true);
//     //     self.passwordSignup1Message("")
//     //     self.passwordSignup2("");
//     //     self.passwordSignup2Flag(true);
//     //     self.passwordSignup2Message("")
//     //     self.dob("");
//     //     self.dobFlag(true);
//     //     self.dobMessage("")
//     //     self.radioSelectedOptionValue("")
//     //     self.radioSelectedOptionValueFlag(true);
//     //     self.radioSelectedOptionValueMessage("")
//     // }


//     self.noErrors = ko.pureComputed(function(){
//         //self.checkForm()
//         //return this.emailSignupFlag && this.passwordSignup1Flag() && this.passwordSignup2Flag() && this.dobFlag() && this.radioSelectedOptionValueFlag()
//     },self)
//     //this last parameter defines the value of this in the function
// }

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
    
    self.noErrors = function(){
        self.manualValidation()
        for(var i=2; i<7;i++){
            if (!self.arrayModel()[i].valid()){
                console.log("found an error")
                return false
            }
        }
        console.log("all good")
        return true
    }

    self.manualValidation = function(){
       // emailValidation(self.arrayModel()[SIGNUP_EMAIL])
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
