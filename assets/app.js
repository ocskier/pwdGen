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

function generateCode () {
    let code = '';
    const filteredCharTypes = passwordObj.answers.map((answer,i)=>{if(answer){return i}}).filter(index=>typeof(index)==='number');
    for (let i = 0; i < passwordObj.length; i++) {
        const randomCharType = Math.floor(Math.random()*filteredCharTypes.length);
        console.log(randomCharType);
        const letter = allChars[filteredCharTypes[randomCharType]][Math.floor(Math.random()*allChars[filteredCharTypes[randomCharType]].length)];
        code += letter;
        console.log(code);
    }
    pwdOutput.textContent = code;
    
}
function askQuestions () {
    const passwordLength = parseInt(prompt('Enter a length of password from 8 to 126:'));
    if (passwordLength < 8 || passwordLength > 128) {
        askQuestions();
    } else {
        passwordObj.length = passwordLength;
        let oneCharTypeSelected = false;
        passwordObj['answers']=[];
        for (let i = 0; i < passwordObj.questions.length; i++) {
            const charTypeAns = confirm(passwordObj.questions[i]);
            if (oneCharTypeSelected === false) {
                oneCharTypeSelected = charTypeAns;
            }
            passwordObj['answers'].push(charTypeAns);
        }
        oneCharTypeSelected === true ? generateCode() : askQuestions()
    }
}
codeBtn.addEventListener('click', askQuestions);
copyBtn.addEventListener('click', function(){document.execCommand("copy",false,pwdOutput.textContent)})