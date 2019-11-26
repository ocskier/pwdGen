const lowerCase = 'abcdefghijklmnopqrstuvwxyz'.split('');
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.split('');
const numbers = '0123456789'.split('');
const allChars = [lowerCase,upperCase,symbols,numbers];
const passwordObj = {
    length: 0,
    questions: ["Lowercase characters?","Uppercase characters?","Special characters?","Numeric characters?"],
    answers: []
}
const codeBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copy');
const pwdOutput = document.getElementById('password');
const modal = document.querySelector('.modal-body');

function generateCode () {
    let code = '';
    const filteredCharTypes = passwordObj.answers.map((answer,i)=>{if(answer){return i}}).filter(index=>typeof(index)==='number');
    for (let i = 0; i < passwordObj.length; i++) {
        const randomCharType = Math.floor(Math.random()*filteredCharTypes.length);
        const letter = allChars[filteredCharTypes[randomCharType]][Math.floor(Math.random()*allChars[filteredCharTypes[randomCharType]].length)];
        code += letter;
    }
    pwdOutput.textContent = code;
}
function startOver(msg) {
    alert(msg);
}
function getAnswers () {
    pwdOutput.textContent = "";
    const passwordLength = modal.children[0].children[0].value;
    if (passwordLength < 8 || passwordLength > 128 | !passwordLength) {
        startOver('Password Length Invalid!')
    } else {
        passwordObj.length = passwordLength;
        let oneCharTypeSelected = false;
        passwordObj['answers']=[];
        for (let i = 1; i <= passwordObj.questions.length; i++) {
            const charTypeAns = modal.children[i].children[0].children[0].children[0].checked;
            if (oneCharTypeSelected === false) {
                oneCharTypeSelected = charTypeAns;
            }
            passwordObj['answers'].push(charTypeAns);
        }
        oneCharTypeSelected === true ? generateCode() : startOver('No valid char types entered!')
    }
}
codeBtn.addEventListener('click', getAnswers);
copyBtn.addEventListener('click', function(){
    pwdOutput.select();
    document.execCommand("copy",false,pwdOutput.textContent)
})

// Previous development with window alerts, prompts, and confirms 
// Current implementation with bootstrap Modal

// function askQuestions () {
//     const passwordLength = parseInt(prompt('Enter a length of password from 8 to 126:', 8));
//     if (passwordLength < 8 || passwordLength > 128 | !passwordLength) {
//         startOver('Password length incorrect! Retry?');
//     } else {
//         passwordObj.length = passwordLength;
//         let oneCharTypeSelected = false;
//         passwordObj['answers']=[];
//         for (let i = 0; i < passwordObj.questions.length; i++) {
//             const charTypeAns = confirm(passwordObj.questions[i]);
//             if (oneCharTypeSelected === false) {
//                 oneCharTypeSelected = charTypeAns;
//             }
//             passwordObj['answers'].push(charTypeAns);
//         }
//         oneCharTypeSelected === true ? generateCode() : startOver('No valid char types entered! Retry?')
//     }
// }

