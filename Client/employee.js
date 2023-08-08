const baseurl = 'http://localhost:4444';
// variable to append thead to it after i create a row or column
const employeeTable = document.getElementById('employeeTable')
const tableBody = document.getElementById('tableBody')
// variable for the add employee button from modal from pop up after clicking add a new employee
const addEmployeeBtn = document.getElementById('empSubmit')
const managerInput = document.getElementById('managersId');
const firstInput = document.getElementById('firstName');
const lastInput = document.getElementById('lastName');
// variable for export to pdf button
const elem = document.getElementById('getPDF');
// variable for export excel button
const exportBtn = document.getElementById('export');
//variable for making addemployee form disappear
const empForm = document.getElementById('signin') 
// variable for subscribe button
const subBtn = document.getElementById('subBtn')
const closeBtn = document.getElementById('closeBtn');


// function to create a row in my table with the correct employee data
const tableRow = (row) => {
    let employeeData = document.createElement('tr')
    employeeData.classList.add('tableRowColor')
    employeeData.style.backgroundColor = 'grey';

    employeeData.innerHTML = `
        <th scope="row">${row.employee_id}</th>
        <th>${row.managers_id}</th>
        <th id="editFirstName" onclick="editName(this,${row.employee_id})">${row.first_name}</th>
        <th>${row.last_name}</th>
        <th><button  class="trash" onclick="deleteEmp(${row.employee_id})"><i class="bi bi-trash3-fill"></i></button></th>
        `

    tableBody.appendChild(employeeData)
}


// const editElement = (element, id) => {
//     console.log(element.value, id)
//    const body = {
//     managers_id,
//     firstName: element.value,
//     last_name
//    }

//     axios.put(`${baseurl}/employee/${id}`, body)
//     .then(res => {
//         console.log(res.data)
//         getEmployees()
//     })

// }


// function editName(elem,id) {
//     const th = document.createElement('th');
//     console.log(elem)
    
//     th.innerHTML= `
//     <input placeholder='New Name' type=''><button onclick="editElement(this.previousSibling,${id})">GO</button></input>`
//     elem.replaceWith(th)
// }


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
        getEmployees();
        console.log(res.data);
    })
    .catch(err => console.error(err));
    }
    managerInput.value = ''
    firstInput.value = ''
    lastInput.value = ''
    closeBtn.click()
};


// functions that deletes a employee
const deleteEmp = (id) => {
    axios.delete(`${baseurl}/deleteemployee/${id}`)
    .then(res => {
        getEmployees();
        console.log(res.data)
        })
    .catch(err => console.error(err))
}



// function for downloading pdf file.
elem.onclick = function () {
    var doc = new jsPDF();
    doc.autoTable({
        html: '#employeeTable',
        didDrawCell: function (data) {
            if (data.column.dataKey === 5 && data.cell.section === 'body') {
                // doc.autoTable({
                //     head: [["One", "Two", "Three", "Four"]],
                //     body: [
                //         ["1", "2", "3", "4"],
                //         ["1", "2", "3", "4"],
                //         ["1", "2", "3", "4"],
                //         ["1", "2", "3", "4"]
                //     ],
                //     startY: data.cell.y + 2,
                //     margin: {left: data.cell.x + data.cell.padding('left')},
                //     tableWidth: 'wrap',
                //     theme: 'grid',
                //     styles: {
                //         fontSize: 7,
                //         cellPadding: 1,
                //     }
                // });
            }
        },
        columnStyles: {
            5: {cellWidth: 40}
        },
        bodyStyles: {
            minCellHeight: 15
        }
    });
    doc.save('table.pdf');
    };


// function for excel sheet
exportBtn.addEventListener('click', function() {
    var table2excel = new Table2Excel();
    table2excel.export(document.querySelectorAll("table"));
})

const getNotification = () => {
    window.alert("You've been subscribed to our newsletter!")
}



document.addEventListener("DOMContentLoaded", getEmployees);
addEmployeeBtn.addEventListener('click', addAEmployee);
subBtn.addEventListener('click', getNotification);
