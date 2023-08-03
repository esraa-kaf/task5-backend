
let form = document.getElementById('form1')
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    // console.log(document.getElementById('address').value)
    weatherFunction()
    form.reset()
})
const errorF = document.getElementById('error')
const locationF = document.getElementById('location')
const forecastF = document.getElementById('forecast')

// async --> function return promise
let weatherFunction = async() =>{
    try{
        const address = document.getElementById('address').value
        const res = await fetch('http://localhost:3000/weather?address='+address)
        const data = await res.json()
        console.log(data)
        if(data.error){
            errorF.innerText = data.error
            locationF.innerText =""
            forecastF.innerText =""
        }
        else {
            setTimeout(()=>{
                locationF.innerText=data.location;
            },500);
            setTimeout(()=>{
                forecastF.innerText=data.forecast;
            },1000);
            
            errorF.innerText =""
        }
    }
    catch(e){
        console.log(e)
    }
}
