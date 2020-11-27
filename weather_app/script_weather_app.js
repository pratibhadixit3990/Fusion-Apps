const imgs = { 
    Clouds: "https://i.pinimg.com/originals/aa/96/97/aa9697a3f7a61389675b8dc109518753.gif",
    Mist: "https://www.pngkey.com/png/detail/123-1236518_smoke-haze-png-haze-png.png",
    Rain: "https://giffiles.alphacoders.com/116/11620.gif",
    Haze: "https://www.pngkey.com/png/detail/123-1236518_smoke-haze-png-haze-png.png",
    Snow: "https://media1.tenor.com/images/735e68b36fb24b5cadda815230daad05/tenor.gif?itemid=13649339",
    Clear: "https://ak.picdn.net/shutterstock/videos/7824385/thumb/4.jpg",
    Thunderstorm: "https://i.pinimg.com/originals/14/0f/02/140f02ad145786db59e085b058749131.jpg"
   };
 const API_KEY = "14067ca47d30fb0bcb278f67509d646d";
 function getInfo(city) {
   var unit =  document.querySelector('button.active').innerText;
   var unit_map = unit == "C" ? 'metric' : 'imperial'; 
   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit_map}&APPID=${API_KEY}`)
     .then(response => response.json()).then(data => {
     console.log(data)
     var card = document.querySelector('.card');
     var place  = document.querySelector('.place-name');
     var status = document.querySelector('.status');
     var hum = document.querySelector('.hum');
     var min = document.querySelector('.min');
     var max = document.querySelector('.max');
     var error = document.querySelector('.error');
     var temp = document.querySelector('.temp-value');
     var img = document.querySelector('.temp-img');
     
     if(data.cod == "404") {
           error.innerHTML = data.message;
           return;
     }
     setTimeout(()=>{
       card.animate([
         {transform: "rotate3d(1, 0, 0, 10deg)", filter: "blur(2px)"},
         {transform: "rotate3d(1, 0, 0, 80deg)", filter: "blur(2px)"},
         {transform: "rotate3d(1, 0, 0, 120deg)", filter: "blur(2px)"},
         {transform: "rotate3d(1, 0, 0, 170deg)", filter: "blur(2px)"},
         {transform: "rotate3d(1, 0, 0, 220deg)", filter: "blur(2px)"},
         {transform: "rotate3d(1, 0, 0, 260deg)", filter: "blur(2px)"},
         {transform: "rotate3d(1, 0, 0, 300deg)", filter: "blur(2px)"},
         {transform: "rotate3d(1, 0, 0, 360deg)", filter: "blur(2px)"},
       ], {
         duration: 1000
       })
     })
     document.querySelector('.error').innerHTML = "";
     status.innerHTML = data['weather'][0]['main'];
     place.innerHTML = data['name'] + ' ' + data['sys']['country'];
     temp.innerHTML = data['main']['temp'];
     max.innerHTML = data['main']['temp_max'];
     min.innerHTML = data['main']['temp_min'];
     hum.innerHTML = data['main']['humidity'] + '%';
     img.src = imgs[data['weather'][0]['main']];
     document.querySelectorAll('.temp-unit').forEach((ele)=>{
       if(unit == 'C') {
         ele.classList.add('cel');
         ele.classList.remove('feh');
       }
       else {
         ele.classList.add('feh');
         ele.classList.remove('cel');
       }
   })
     
   }).catch(err => {
       console.log(err);
     });
 
 }
 
 function onchangeCity(event) {
   if(event.keyCode != 13) return;
   var city = document.querySelector('.place').value;
   getInfo(city);
 }
 
 
 function changeUnit(event) {
   var button = event.target;
   document.querySelector('button.active').classList.toggle('active')
   button.classList.add('active');
   
   getInfo(document.querySelector('.place-name').innerText.split(" ")[0]);
   
 }
 
 document.querySelectorAll('button').forEach((ele) => ele.addEventListener('click', changeUnit));
 
 
 
 getInfo("landon");