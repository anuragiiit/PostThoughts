//console.log('hello');

const form =document.querySelector('form');
const mewsElement =document.querySelector('.mews');
const API_URL= 'http://localhost:5000/mews';
listAllMews();
form.addEventListener('submit',(event)=>
{
    event.preventDefault();
   const formData=new FormData(form);
   const name=formData.get('name');
   const content=formData.get('content');
   const mew ={
    name,
    content
   };
  // console.log(mew);
  form.style.display='none';
   fetch(API_URL,{
       method: 'POST',
       body:JSON.stringify(mew),
       headers:{
           'content-type': 'application/json'
       }
   }).then(response => response.json())
        .then(createdMew =>{
        console.log(createdMew);
        form.reset();
        form.style.display='';
        listAllMews();
    });
});

function listAllMews(){
    fetch(API_URL)
    .then(response => response.json())
    .then(mews => {
        console.log(mews);
        mews.forEach(mew =>{
            const div= document.createElement('div');
        const header =document.createElement('h3');
        header.textContent =mew.name;
            const contents= document.createElement('p');
            contents.textContent =mew.content;
            div.appendChild(header);
            div.appendChild(contents);
            mewsElement.appendChild(div);
        });

    });


}

