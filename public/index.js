 function donor(){
    var donor_name= document.getElementById('donor_name').value;
    var gender= document.getElementById('gender').value;
    var birth= document.getElementById('date_of_birth').value;
    var mobile=  document.getElementById('mobile_number').value;
    var address= document.getElementById('address').value;
    var weight= document.getElementById('weight').value;
    var bp= document.getElementById('blood_pressure').value;
    var ic= document.getElementById('iron_content').value;
    var doc_name= document.getElementById('doctor_name').value;
    var bankbn= document.getElementById('blood_bank_name').value;
    var blood_type= document.getElementById('blood_type').value;
    
    const data={
        donor_name,
        gender,
        birth,
        mobile,
        address,
        weight,
        bp,
        ic,
        doc_name,
        bankbn,
        blood_type,
    }


    fetch('/api/donor',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
      })
      .then(response=>response.json())
      .then(data=>{
        console.log("server response:",data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

 function patient(){
  var patient_name= document.getElementById('donor_name').value;
  var patient_phone= document.getElementById('donor_mobile_number').value;
  var patient_address= document.getElementById('patient_address').value;
  var hospital_address= document.getElementById('hospital_address').value;
  var bloodname=document.getElementById('blood_bank_name').value;
  const data={
    patient_name,
    patient_phone,
    patient_address,
    hospital_address,
    bloodname,
  }
  fetch('/api/patient',{
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(data)
  })
  .then(response=>response.json())
  .then(data=>{
    console.log("server response:",data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}