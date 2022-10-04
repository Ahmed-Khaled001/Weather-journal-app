/* Global Variables */
const apiKey = '&appid=0bca321c03f70062c3e7bab874a71f2f&units=imperial';
const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?zip=';

const zipCodeElem = document.getElementById('zip');
const feelingElem = document.getElementById('feelings');
const date = document.getElementById('date');
const content = document.getElementById('content');
const temp = document.getElementById('temp');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Start getting zip and feeling input value when cliced on genterate
document.getElementById('generate').addEventListener('click', generate);

function generate(){
    const newZip = zipCodeElem.value;
    const newFeeling = feelingElem.value;  

// Running get weather function with the given input in zip input
    getZipCodeWeather(baseUrl+newZip+apiKey)
    // Don't start the function before fetching the data
    .then(function (data){
        
        // Print all the data returned from the api to console
        console.log(data)
        
        // Posting date, temp and feeling value to server 
        postToServer('/postData', {
            date: newDate,
            temp: data.list[0].main.temp,
            content: newFeeling,
        });

        /* Update UI by adding innerHTML to the result Divs : date, temp, content
        using the data we recived using get method */
        updateUI()
    })
};

// Get weather function which fetches weather data of a zipcode and transforms it into JSON
async function getZipCodeWeather(base,zip,key){
    const res = await fetch (base+zip+key)
    try {
    const resJSON = await res.json();
    return resJSON;
    }
    // Catch an error and print it to console
    catch(error){
        console.log('error', error)
    }
}



// Post data function that takes two parameters the url and the data object
async function postToServer( url='', data = {}){
    console.log(data)
    const res = await fetch(url,  {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        // Create JSON string using JS object
        body: JSON.stringify(data),
    });
    try {
        const dataJSON = res.json();
        return dataJSON;
    }
    // Catch an error and print it to console
    catch (error){
        console.log('error',error)
    }
}

const updateUI = async () =>{
    const request = await fetch('/getAll');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to result DOM elements
    temp.innerHTML ='Temprature is '+ Math.round(allData.temp)+ ' degrees';
    content.innerHTML = 'Feeling '+ allData.content;
    date.innerHTML ='Date: '+ allData.date;
    }
    // Catch an error and print it to console
    catch(error) {
      console.log('error', error);
    }
   }