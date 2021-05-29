const form = document.querySelector('form'),
    input = document.querySelector('input[type="text"]'),
    paras = document.querySelectorAll('.output');

// Listen for submit event on the form
form.addEventListener('submit', e=>{
    e.preventDefault();

    paras[0].textContent = 'Loading message...';
    paras[1].textContent = '';
    
    // Get the weather for particular location and display
    fetch(`/weather?address=${input.value}`)
    .then(res=>res.json())
    .then(data=>{
        if(data.error) throw data;
        paras[0].innerHTML = `Current state is ${data.forecast}. It is currently ${data.temperature} &deg;C outside and feels like ${data.feelsLike} &deg;C.`;
        paras[1].textContent = `Location - ${data.location}`;
    })
    .catch(err=>{
        paras[0].textContent = 'Error';
        paras[1].textContent = err.error.info || err.error;
    });
})