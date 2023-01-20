//DEMO PROJECT FOR INTERVIEW

//COMMENTS FOR MY UNDERSTANDING

let formEl = document.querySelector('#myForm'); //method to access the first element in the form
let msg = document.querySelector('.message'); //SAA
let userList = document.querySelector(".userList") //SAA

let amountEl = document.querySelector("#amount"); //SAA
let descriptionEl = document.querySelector("#description"); //SAA
let categoryEl = document.querySelector("#category"); //SAA

formEl.addEventListener('submit' , onSubmit) // The event listener is listening for a "submit" event and will trigger the function "onSubmit" when the event occurs

window.addEventListener('DOMContentLoaded' , function(){ //to show the content
    getDataFromApi(); // to retreive the data
})

async function getDataFromApi(){ //This function likely makes an HTTP request to a server or API to retrieve some data
    try{
        let res = await axios.get('https://crudcrud.com/api/3c9b1d8bf0bc475a9e05553bde645394/expensetracker')// api endpoint from crud crud
        for(var i=0;i<res.data.length;i++){ 
            showNewUserOnScreen(res.data[i]);
        }
    }
    catch(err){
        console.log(err);
    }

}

function showNewUserOnScreen(myobj){ // to display the output on the screen
   let child = `<li  id =${myobj._id}>Category :-${myobj.category} Amount:-${myobj.amount} Description:-${myobj.description} <button type="button" class="btn btn-danger btn-sm m-2 float-right" onClick = deleteItem("${myobj._id}")>Delete</button><button type="button" class="btn btn-primary m-2 float-right btn-sm" onClick = editItem('${myobj.description}','${myobj.category}','${myobj.amount}','${myobj._id}')>Edit</button></li>`
   userList.innerHTML = userList.innerHTML + child
}

async function onSubmit(e){ // async function to run without blocking
    e.preventDefault(); // to prevent reload
    if(amountEl.value == "" && descriptionEl.value == "" &&  categoryEl.value == "" ){
        msg.innerHTML = "Please Enter Amount , Description and category";
        setTimeout(function(){ //setTimeout used to execute a function after a specified time
           msg.remove()
        } , 5000)
    }else{ 
        let myobj = {
            amount : amountEl.value,
            description : descriptionEl.value,
            category : categoryEl.value
        }
        try{ // error handling 
         let res = await axios.post('https://crudcrud.com/api/3c9b1d8bf0bc475a9e05553bde645394/expensetracker',myobj)
         userList.innerHTML =""; //inner to set or get a html request
         getDataFromApi();
        }
        catch(err){
            console.log(err)
        }

        // axios.post('https://crudcrud.com/api/bf9792954fdf42eaa82ad98f2f634a0f/expensetracker',myobj)
        // .then(res =>{
        //     userList.innerHTML ="";
        //     getDataFromApi();
        // })
        // .catch(err =>console.log(err))
       // localStorage.setItem(`user${descriptionEl.value}` , JSON.stringify(myobj) );
       // showNewUserOnScreen(myobj)
       amountEl.value="";
       descriptionEl.value =""
    }
    
}

async function  deleteItem(id){  //delete operation
    //localStorage.removeItem(`user${description}`);
    //let child = document.getElementById(description);

    //userList.removeChild(child);
    try{
        let res = await axios.delete(`https://crudcrud.com/api/3c9b1d8bf0bc475a9e05553bde645394/expensetracker/${id}`)
        userList.innerHTML ='';
        getDataFromApi();
    }
    catch (err) {
        console.log(err);
    }
   // let res = await axios.delete(`https://crudcrud.com/api/bf9792954fdf42eaa82ad98f2f634a0f/expensetracker/${id}`)
        // .then(res =>{
        //     userList.innerHTML ="";
        //     getDataFromApi();
        // })
        // .catch(err =>console.log(err))
       // userList.innerHTML ='';
       // getDataFromApi();
    
}

function editItem(description , category  , amount , id){  // edit operation
    descriptionEl.value = description;
    amountEl.value = amount;
    categoryEl.value=category;

    deleteItem(id);
}