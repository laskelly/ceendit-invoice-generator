// Declare global variable
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const invoicePage = document.querySelector('.invoice-page')

//  Hide other sections on document load for only header to show
window.addEventListener('DOMContentLoaded', ()=> {
  main.classList.add('display-none');
  invoicePage.classList.add('display-none');
})


// Function to show input forms
function showInvoiceForm(){
  const createInvoice = document.querySelector('.create-invoice');
  createInvoice.addEventListener('click', ()=> { 
    header.classList.add('display-none');
    main.classList.remove('display-none');
  })
}

showInvoiceForm();


// Defining Input variables here
const senderName = document.getElementById('sender-name');
const senderNum = document.getElementById('sender-num');
const senderEmail= document.getElementById('sender-email');
const recipientName = document.getElementById('recipient-name');
const recipientCompany = document.getElementById('recipient-company');
const recipientEmail= document.getElementById('recipient-email');
const dateCreated = document.getElementById('date-created');
const dateDue = document.getElementById('date-due');
const servicesProvided = document.querySelector('#services');
const servicesPrice = document.getElementById('price');
const bankName = document.getElementById('bank-name');
const accountNum = document.getElementById('account-num');
const accountName = document.getElementById('account-name');
const generateInvoice = document.getElementById('generate-invoice');

// Define div variables
const addInvoiceDate = document.querySelector('.add-invoice-date');
const senderDetailsDiv = document.querySelector('.sender-details');
const receiverDetailsDiv = document.querySelector('#receiver-details');
const paymentMethod = document.querySelector('#payment-method');
const productDetails = document.querySelector('.product-details');

// General Function to add input values to the invoice page
function addToInvoice(formInput, appendDiv){
  // Authentication of empty input
  if(formInput.value === ''){
    const redAlert = document.querySelector('.red-alert');
    redAlert.classList.remove('display-none');

    // Work on stopping appended child
    // ===============================

    setTimeout(() => {
      redAlert.classList.add('display-none');
    }, 1000);

    main.classList.remove('display-none');
    invoicePage.classList.add('display-none');
  } else {
    main.classList.add('display-none');
    invoicePage.classList.remove('display-none')
  }

  // Add input value to an element
  const createParagraph = document.createElement('p');
  createParagraph.innerText = formInput.value;

  appendDiv.appendChild(createParagraph);
  formInput.value = '';
}

// Add to product / service provided table
function productItems(row1, row2, appendDiv){
  const createRow = document.createElement('tr');
  createRow.innerHTML =  `
  <td>${row1.value}</td>
  <td>${row2.value}</td>
  <td><i class="fa-solid fa-ellipsis-vertical"></i><p class="display-none">Edit invoice</p></td>
  `
  appendDiv.appendChild(createRow);
  row1.value = '';
  row2.value = '';
}

/* ==========================================
 Add to bank payment method table
=============================================
*/
function paymentTable(row1, row2, row3, appendDiv){
  const createRow = document.createElement('tr');
  createRow.innerHTML =  `
  <td>${row1.value}</td>
  <td>${row2.value}</td>
  <td>${row3.value}</td>
  `
  appendDiv.appendChild(createRow);
  row1.value = '';
  row2.value = '';
  row3.value = '';
}

/* ==========================================
 Generate invoice page details 
 ============================================
*/
generateInvoice.addEventListener('click', (formInput)=> {

  // Add to function
  addToInvoice(dateCreated, addInvoiceDate);
  addToInvoice(dateDue, addInvoiceDate);
  addToInvoice(senderName, senderDetailsDiv);
  addToInvoice(senderNum, senderDetailsDiv);
  addToInvoice(senderEmail, senderDetailsDiv);
  addToInvoice(recipientName, receiverDetailsDiv);
  addToInvoice(recipientCompany, receiverDetailsDiv);
  addToInvoice(recipientEmail, receiverDetailsDiv);
  productItems(servicesProvided, servicesPrice, productDetails)
  paymentTable(bankName, accountName, accountNum,paymentMethod) 

})

// Add more services list
const addMoreServices = document.getElementById('add-services');

addMoreServices.addEventListener('click', ()=> {
  const newServicesDiv = document.createElement('div');
  newServicesDiv.innerHTML = `
      <label for="">Services provided</label>
      <input type="text" name="" class="services" placeholder="Add services rendered here">`
    
  const addSibling = addMoreServices.parentElement.previousElementSibling;

  addSibling.insertAdjacentElement("afterend", newServicesDiv);
  }   
)

/* ==========================================
Save pdf
===========================================
*/
const savePdf = document.querySelector('.save-pdf');
  const createAnotherInvoice = document.querySelector('.create-another-invoice')
function saveInvoice(){ 
  savePdf.addEventListener('click', ()=> {
    main.classList.add('display-none');
    header.classList.add('display-none');
    savePdf.classList.add('display-none');
    createAnotherInvoice.classList.add('display-none')
    window.print();
    createInvoiceAgain()
  })
}

saveInvoice()

// Function create Another invoice
function createInvoiceAgain(){
  setTimeout(() => {
    createAnotherInvoice.classList.remove('display-none');
    createAnotherInvoice.addEventListener('click', ()=> {
      header.classList.remove('display-none');
      invoicePage.classList.add('display-none');
    })
  }, 2000)
}

createInvoiceAgain()

/* ================================
To suggest bank names in the input field
Inspo here - https://dev.to/walternascimentobarroso/autocomplete-with-js-551f
============================ */
  "use strict";
  bankName;
  let ulField = document.getElementById('suggestions');
  bankName.addEventListener('input', changeAutoComplete);
  ulField.addEventListener('click', selectItem)

  // Check auto complete for banks
  function changeAutoComplete({target}) {
    let data = target.value;
    ulField.innerHTML = ``;
    if(data.length){
      let autoCompleteValues = autoComplete(data);
      autoCompleteValues.forEach(value => { addItem(value); });
    }
  }

  function autoComplete(inputValue){
    let naijaBanks = ['Access Bank Plc',
    'Fidelity Bank Plc',
    'First City Monument Bank Limited',
    'First Bank of Nigeria Limited',
    'Guaranty Trust Holding Company Plc',
    'Union Bank of Nigeria Plc',
    'United Bank for Africa Plc',
    'Zenith Bank Plc', "Citibank Nigeria Limited", "Ecobank Nigeria", "Heritage Bank Plc", "Keystone Bank Limited", "Polaris Bank Limited", "Stanbic IBTC Bank Plc", "Standard Chartered Bank", "Sterling Bank Plc", "Titan Trust Bank Limited", "Unity Bank Plc", "Wema Bank Plc", "Globus Bank Limited", "Parallex Bank Limited", "Providus Bank Limited", "SunTrust Bank Nigeria Limited", "Sparkle Bank", "Kuda Bank", "Rubies Bank", "VFD Microfinance Bank", "Mint Finex MFB"];
    return naijaBanks.filter((value) => value.toLowerCase().includes(inputValue.toLowerCase()));
  }

  function addItem(value){
    ulField.innerHTML = ulField.innerHTML + `<li>${value}</li>`
  }

  function selectItem({ target }){
    if (target.tagName === 'LI'){
      bankName.value = target.textContent;
      ulField.innerHTML = ``;
    }
  }