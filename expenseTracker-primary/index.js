//DEMO PROJECT FOR INTERVIEW

//COMMENTS FOR MY UNDERSTANDING


function saveToLocalStorage(event) { //function named save.. to save data to local storage
  event.preventDefault(); // to prevent reload  
  let amount = event.target.amount.value; 
  let description = event.target.description.value;
  let category = event.target.category.value;
  // localStorage.setItem("amount", amount);
  // localStorage.setItem("description", description);
  // localStorage.setItem("category", category);

  let obj = { // creating a js object of 3 items
    amount,
    description,
    category,
  };

  axios
    .post( // to enter the data 
      "https://crudcrud.com/api/3c9b1d8bf0bc475a9e05553bde645394/expensetracker", // endpoint api
      obj
    )
    .then((response) => { // get back the data
      showNewUserOnScreen(response.data);
    })
    .catch((error) => {  //error handling
      document.body.innerHTML += "<h4> Something went wrong </h4>"; 
      console.log(error);
    });

  // localStorage.setItem(obj.category, JSON.stringify(obj));
  // showNewUserOnScreen(obj);
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get( //display data
      "https://crudcrud.com/api/3c9b1d8bf0bc475a9e05553bde645394/expensetracker"
    )
    .then((response) => {
      console.log(response);

      for (let i = 0; i < response.data.length; i++) {
        showNewUserOnScreen(response.data[i]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  // let localStorageObj = localStorage;
  // let localstoragekeys = Object.keys(localStorageObj);
  // for (var i = 0; i < localstoragekeys.length; i++) {
  //   let key = localstoragekeys[i];
  //   let userDetailsString = localStorageObj[key];
  //   let userDetailsObj = JSON.parse(userDetailsString);
  //   showNewUserOnScreen(userDetailsObj);
  // }
});

function showNewUserOnScreen(user) {
  document.getElementById("category").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("description").value = "";
  if (localStorage.getItem(user._id) !== null) {
    removeUserFromScreen(user._id);
  }

  let parentNode = document.getElementById("listOfExpenses");
  
  let childHTML = `<li style="color:red;  " id=${user._id}> ${user.amount}   -    ${user.description}        - ${user.category}
                     <button type="button" class="btn btn-danger" onclick="deleteUser('${user._id}')"> Delete Expense </button>
                     <button type="button" class="btn btn-warning" onclick="editUserDetails('${user.category}','${user.amount}','${user.description}','${user._id}')"> Edit Expense </button>
                     </li>`;
  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function removeUserFromScreen(userId) {
  let parentNode = document.getElementById("listOfExpenses");
  let childNodeToBeDeleted = document.getElementById(userId);

  if (childNodeToBeDeleted) {
    parentNode.removeChild(childNodeToBeDeleted);
  }
}

function deleteUser(userId) {  // delete functionality
  axios
    .delete( //delete the data
      `https://crudcrud.com/api/3c9b1d8bf0bc475a9e05553bde645394/expensetracker/${userId}`
    )
    .then((response) => {
      removeUserFromScreen(userId); //show data
    })
    .catch((error) => {
      console.log(error);
    });
  // console.log(category);
  // localStorage.removeItem(category);
  // removeUserFromScreen(category);
}

function editUserDetails(category, amount, description, userId) {  // edit functionality
   console.log(category);
  document.getElementById("category").value = category;
  document.getElementById("amount").value = amount;
  document.getElementById("description").value = description;
  deleteUser(userId);
}
