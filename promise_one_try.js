let CalculateTotal = () => {
  return new Promise((resolve, reject) => {
  let totalCalculated = Math.random() < 0.5;
  console.log("calculateTotal is " + totalCalculated);
  
  if(totalCalculated === true){ 
  resolve(" 'total calculated' ");
     
} else {
  reject(" 'calculateTotal failed' "); 
 
}
});
} 

let UpdateCouponUsage = (message) => {
  return new Promise((resolve, reject) => {    
  let couponUsageUpdated = Math.random() < 0.5;
  console.log("couponUsageUpdate is " + couponUsageUpdated);

  if(couponUsageUpdated == true){
    resolve(message + " 'coupon updated' ");
   
  } else {  
  reject(message + " 'couponUpdate failed' ");
  rollbackCalculateTotal();
  } 

});
}; 

let ChargeVendorProcessingFee = (message) => {
  return new Promise((resolve, reject) => {
  
   
  let vendorProcessingFeeCharged = Math.random() < 0.5;
  console.log("vendorProcessingFeeCharge is " + vendorProcessingFeeCharged);
  if(vendorProcessingFeeCharged == true){
    resolve(message + " 'vendorFee charged' ");
  
  } else {
    reject(message + " 'vendorFeeCharge failed' ");
    rollbackUpdateCouponUsage();
    rollbackCalculateTotal();
  } 

});
};

let ChargeCreditCard = (message) => {
  return new Promise((resolve, reject) => {
   
 let creditCardCharged = Math.random() < 0.5;
  console.log("creditCardCharge is "+ creditCardCharged);
  if(creditCardCharged == true){
    resolve(message + " 'creditCard charged' ");
    
  } else {
    reject(message + " 'creditCardCharge failed' ");
    rollbackChargeVendorProcessingFee();
    rollbackUpdateCouponUsage();
    rollbackCalculateTotal();
  } 

});
};

function placeOrder(){

  CalculateTotal().then((result) => {
     return UpdateCouponUsage(result);
  }).then ((result) => {   
     return ChargeVendorProcessingFee(result);
  }).then((result) => {
    return ChargeCreditCard(result);
  }).then((result) => {
    console.log(result + " 'place-order has succeeded.' ");
  }).catch(((result) => {
     console.log(result +" 'place-order has failed.' " );
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