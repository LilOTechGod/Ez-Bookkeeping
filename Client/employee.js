const baseurl = 'http://localhost:4444';
// variable to append thead to it after i create a row or column
const employeeTable = document.getElementById('employeeTable')
const tableBody = document.getElementById('tableBody')
// variable for the add employee button from modal from pop up after clicking add a new employee
const addEmployeeBtn = document.getElementById('empSubmit')
const managerInput = document.getElementById('managersId');
const firstInput = document.getElementById('firstName');
const lastInput = document.getElementById('lastName');


// function to create a row in my table with the correct employee data
const tableRow = (row) => {
    let employeeData = document.createElement('tr')

    employeeData.innerHTML = `
        <th scope="row">${row.employee_id}</th>
        <th>${row.managers_id}</th>
        <th>${row.first_name}</th>
        <th>${row.last_name}</th>`


    tableBody.appendChild(employeeData)
}

// function to clear all rows incase manager makes an edit or deletes or adds a new employee
function clearEmployee() {
    tableBody.innerHTML="";
}

// function that clears all employee rows then grabs all employees and makes a row for every single one
let getEmployees = () => {
    clearEmployee();
    axios.get(`${baseurl}/home`)
    .then(res => {
        console.log(res.data)
        let employee = res.data;
        for(let i=0; i<employee.length; i++) {
            tableRow(employee[i])
        }
    })
    .catch(err => console.error(err))
}


// function that clears all employee rows and add a employee
let addAEmployee = (e) => {
    e.preventDefault();

    if(managerInput && firstInput && lastInput) {
    const body = {
        managerId: managerInput.value,
        firstName: firstInput.value,
        lastName: lastInput.value
    };

    // console.log(managerInput, firstInput, lastInput);
    axios.post(`${baseurl}/newemployee`, body)
    .then(res => {
        tableRow(res.data)
        getEmployees();
        console.log(res.data);
    })
    .catch(err => console.error(err));
    }
    managerInput.value = ''
    firstInput.value = ''
    lastInput.value = ''
};

document.addEventListener("DOMContentLoaded", getEmployees);
addEmployeeBtn.addEventListener('click', addAEmployee)
