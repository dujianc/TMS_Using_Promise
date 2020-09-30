let CalculateTotal = () => {
    return new Promise((resolve, reject) => {
    let retryNum = 3; 
    let i = 0;
    let totalCalculated = new Array(retryNum);
    do {
    totalCalculated[i] = Math.random() < 0.5;
    console.log("calculateTotal is " + totalCalculated[i], i+1);
    if(totalCalculated[i] == true){  
    resolve(" 'total calculated' ");
    console.log("total calculated");
    {break;}}
    else {i++;} 
    } while (i<retryNum)
    
    if (totalCalculated[i] != true && i == retryNum) {
    reject(" 'calculateTotal failed' "); 
    console.log("calculateTotal failed");
  } 
  })  
  }
   
let UpdateCouponUsage = (message) => {
    return new Promise((resolve, reject) => { 
    let retryNum = 3; 
    let i = 0;
    let couponUsageUpdated = new Array(retryNum);
    do {   
    couponUsageUpdated[i] = Math.random() < 0.5;
    console.log("couponUsageUpdate is " + couponUsageUpdated[i], i+1);

    if(couponUsageUpdated[i] == true){
    resolve(message+" 'coupon updated' ");
    console.log("coupon updated");
    {break;}}
    else {i++;}
   
    } while (i<retryNum)
    if (couponUsageUpdated[i] != true && i == retryNum) { 
    reject(message+" 'couponUpdate failed' ");
    console.log("couponUpdate failed");
    rollbackCalculateTotal();
    } 

 })
 } 

let ChargeVendorProcessingFee = (message) => {
    return new Promise((resolve, reject) => {
    let retryNum = 3; 
    let i = 0;
    let vendorProcessingFeeCharged = new Array(retryNum);
    do {   
    vendorProcessingFeeCharged[i] = Math.random() < 0.5;
    console.log("vendorProcessingFeeCharge is " + vendorProcessingFeeCharged[i], i+1);
    if(vendorProcessingFeeCharged[i] == true){
    resolve(message + " 'vendorProcessingFee charged' ");
    console.log("vendorProcessingFee charged");
    {break;}}
    else {i++;}
    } while (i<retryNum)
  
    if (vendorProcessingFeeCharged[i] != true && i == retryNum) { 
    reject(message + " 'vendorProcessingFeeCharge failed' ");
    console.log("vendorProcessingFeeCharge failed");
    rollbackUpdateCouponUsage();
    rollbackCalculateTotal();
   } 

 })
 }

let ChargeCreditCard = (message) => {
    return new Promise((resolve, reject) => {
    let retryNum = 3; 
    let i = 0;
    let creditCardCharged = new Array(retryNum);
    do {     
    creditCardCharged[i] = Math.random() < 0.5;
    console.log("creditCardCharge is "+ creditCardCharged[i], i+1);
    if(creditCardCharged[i] == true){
    resolve(message + " 'creditCard charged' ");
    console.log("creditCard charged");
    {break;}}
    else {i++;}
   
    } while (i<retryNum)
    
    if (creditCardCharged[i] != true && i == retryNum) { 
    reject(message + " 'creditCardCharge failed' ");
    console.log("creditCardCharge failed");
    rollbackChargeVendorProcessingFee();
    rollbackUpdateCouponUsage();
    rollbackCalculateTotal();
   } 

 })
 }

function placeOrder(){

  CalculateTotal().then((result) => {
     return UpdateCouponUsage(result);
  }).then ((result) => {   
     return ChargeVendorProcessingFee(result);
  }).then((result) => {
    return ChargeCreditCard(result);
  }).then((result) => {
    console.log("Summary of Transaction: " + result + "'place-order has succeeded'");
  }).catch(((result) => {
     console.log("Summary of Transaction: " + result +"'place-order has failed'" );
  }))
}

placeOrder();

function rollbackCalculateTotal(){
  console.log(" 'calculateTotal rolled back' ");
};

function rollbackUpdateCouponUsage(){
  console.log(" 'couponUsage rolled back' ");
};

function rollbackChargeVendorProcessingFee(){
  console.log(" 'vendorFeeCharge rolled back' ");
};