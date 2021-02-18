// Langkah pertama adalah buatlah sebuah objek dengan nama calculator. Di dalamnya terdapat properti yang 
// menggambarkan data dan kondisi dari kalkulatornya, seperti displayNumber, operator, firstNumber, dan 
// waitingForSecondNumber. Sehingga kodenya akan nampak seperti ini:

const calculator = { //object calculator
    displayNumber: '0', //menyimpan data dan kondisi, angka yang muncul pada layar kalkulator selalu diambil dari sini.
    operator: null, 
    firstNumber: null, //nilai null terlebih dahulu karena properti ini akan diberikan nilai ketika pengguna melakukan aksi
    waitingForSecondNumber: false //kondisi kalkulator sedang menunggu pengguna menentukan angka kedua dalam perhitungan
}

//Fungsi umum Calculator

//fungsi mengupdate angka pada layar dan hapus data kalkulator
function updateDisplay(){
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

//Fungsi memasukkan angka ke dalam nilai displayNumber kalkulator
function inputDigit(digit){
    if(calculator.displayNumber === '0'){
        calculator.displayNumber = digit;
    } else{
        calculator.displayNumber += digit;
    }
}

//variable buttons
//menginisialisasikan nilai seluruh elemen button yang ada, 
//dan berikan event click pada tiap elemennya.
const buttons = document.querySelectorAll(".button"); //mendapatkan nilai seluruh elemen button kita gunakan querySelectorAll(“.button”)

// kemudian kita looping nilainya dan berikan event click pada tiap itemnya.
for (let button of buttons){
    button.addEventListener('click', function(event){
        const target = event.target; //mendapatkan objek elemen yang di klik 

        //Next
        // Fungsi Clear
        // Pada event handler, kita tambahkan kondisi dimana ketika event target merupakan elemen yang menerapkan class 
        // clear maka kita akan panggil fungsi clearCalculator().
        if(target.classList.contains('clear')){
            clearCalculator();
            updateDisplay();
            return;
        }

        if(target.classList.contains('negative')){
            inverseNumber();
            updateDisplay();
            return;
        }

        if(target.classList.contains('equals')){
            performCalculation();
            updateDisplay();
            return;
        }

        if(target.classList.contains('operator')){
            handleOperator(target.innerText);
            return;
        }


        inputDigit(target.innerText);
        updateDisplay()
    });
}

//buat angka jadi negative
function inverseNumber(){
    if(calculator.displayNumber ==='0'){
        return;
    }
    calculator.displayNumber = calculator.displayNumber * - 1;
}

function handleOperator(operator){
    if(!calculator.waitingForSecondNumber){
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';
    } else {
        alert('Operator sudah ditetapkan')
    }
}

function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("Anda belum menetapkan operator");
        return;
    }
  
    let result = 0;
    if (calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
    }
  
    // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
 }