console.log('Its me again with javascript');


//async function::

async function getRainbow(){
    const response = await fetch("rainbow2.jpg");
    const pic = await response.blob();
    document.getElementById('rainbow').src= URL.createObjectURL(pic);
}
getRainbow();


//poem

async function getPoem(){
    const poems = await fetch('poem.text');
    const poem = await poems.text();
    document.getElementById('poem').innerText = poem;
}
getPoem();


//csv data


async function csvChart(){
    const data = await csvDataFile();

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: data.xlabel, 
        datasets: [{
            label: 'csv data chat',
            data: data.ylabel,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        },{
            label: 'range temp',
            data: data.rlabel,
            backgroundColor: [
                'blue',
            ],
            borderColor: [
                'blue',
            ],
            borderWidth: 1
        },{
            label: 'range2 temp',
            data: data.glabel,
            backgroundColor: [
                'green',
            ],
            borderColor: [
                'green',
            ],
            borderWidth: 1 
        }],
        
    },
});
};
 async function csvDataFile(){
    const xlabel = [];
    const ylabel = [];
    const rlabel = [];
    const glabel = [];

     const dataresponse = await fetch('ZonAnn.Ts+dSST.csv');
     const dataOut = await dataresponse.text();

     const dataTable = dataOut.split('\n').splice('1');

     dataTable.forEach(row=> {
         const column = row.split(',');

         const year = column[0];
         xlabel.push(year);
         const temp = column[1];
         ylabel.push(temp);
         const range = column[2];
         rlabel.push(range);
         const range2 = column[3];
         glabel.push(range2);
     });
     return{xlabel, ylabel, rlabel, glabel};
 };
csvChart()

//where the ISS at


const iss_Api_Url = "https://api.wheretheiss.at/v1/satellites/25544";

const mymap = L.map('issMap').setView([0, 0], 1);
const myIcon = L.icon({
    iconUrl: 'space.png',
    iconSize: [50, 50],
    iconAnchor: [22, 94],
});


const marker = L.marker([0, 0],{icon: myIcon}).addTo(mymap);

const attributor = '&copy<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributor'
const tiles_url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tiles_url, {attributor});

tiles.addTo(mymap);


async function whereTheIssAt(){
    const iss_data_responce = await fetch(iss_Api_Url);
    const issData = await iss_data_responce.json();  

    const issDataOutput = [issData.latitude.toFixed(2), issData.longitude.toFixed(2)];

    const latitude = issDataOutput[0];
    const longitude = issDataOutput[1];


    marker.setLatLng([latitude, longitude]);

    document.getElementById('lat').innerText = latitude;
    document.getElementById('log').innerText = longitude;
}
whereTheIssAt();

setInterval(whereTheIssAt, 1000)

