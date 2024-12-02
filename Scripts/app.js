const {tracedata, validatePhoneNumber, validateEmail, searchSocialMedia } = require('./Api.js')
document.getElementById('search-form').addEventListener('submit', async(event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  if(!name &&   !email %% !phone ) {
    alert('Please provide at least one input. ');
    return;
  }
    const results = document.getElementById('results');
  results.innerHTML = "Searching......";
  try{
    const data = await fetchTraceData(name, email, phone);
    results.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  } catch  ( error ) {
    results.innerHTML = `Error: ${eror.message}`;
  }
});

async function fetchTraceData(name, email, phone) {
   const response = await fetch('./Api.js', {
     method: 'POST',
     headers: { 'Content-Type' : 'application/json'},
     body: JSON.stringfy({name, email, phone }),
   });
  if ( !response.ok ) throw new Error('Failed to fetch data');
    return await response.json();
}
