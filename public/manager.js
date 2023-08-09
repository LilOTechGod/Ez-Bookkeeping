const baseurl = 'http://localhost:4444';
// variable for the rows in my table
const tableBody = document.getElementById('tableBody')
// variables for add a new manager to manager inputs

// variables for downloading to excel sheet
const exportBtn = document.getElementById('export');
// variable to download file to pdf
const elem = document.getElementById('getPDF');
// variable for subscribe button
const subBtn = document.getElementById('subBtn')
// variable to slick on x from modal pop up
const closeBtn = document.getElementById('closeBtn');


const tableRowCard = (row) => {
    let employeeData = document.createElement('tr')

    employeeData.innerHTML = `
        <th scope="row">${row.users_id}</th>
        <th>${row.first_name}</th>
        <th id="editFirstName" onclick="editName(this,${row.employee_id})">${row.last_name}</th>
        <th>${row.user_name}</th>
        <th>${row.email}</th>
        <th><button  class="trash" onclick="deleteEmp(${row.users_id})"><i class="bi bi-trash3-fill"></i></button></th>
        `

    tableBody.appendChild(employeeData)
}


// function to clear all rows incase manager makes an edit or deletes or adds a new employee
function clearEmployee() {
    tableBody.innerHTML="";
}

// function to get every employee on payout
let getManager = () => {
    clearEmployee();
    axios.get(`${baseurl}/managers`)
        .then(res => {
            console.log(res.data)
            let employee = res.data;
            for(let i=0;i<employee.length; i++) {
                tableRowCard(employee[i])
            }
        })
        .catch(err => console.error(err))
}

// functions that deletes a employee
const deleteEmp = (id) => {
    axios.delete(`${baseurl}/deletemanager/${id}`)
    .then(res => {
        getManager();
        console.log(res.data)
        })
    .catch(err => console.error(err))
}

// function for excel sheet
exportBtn.addEventListener('click', function() {
    var table2excel = new Table2Excel();
    table2excel.export(document.querySelectorAll("table"));
})


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
    doc.save('manager.pdf');
    };
    
    
    const getNotification = () => {
        window.alert("You've been subscribed to our newsletter!")
    }


// get managers to appear
document.addEventListener('DOMContentLoaded', getManager);
subBtn.addEventListener('click', getNotification);
