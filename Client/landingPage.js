const ePortalBtn = document.getElementById('employeePortal');
const pPortalBtn = document.getElementById('payrollPortal');
const mPortalBtn = document.getElementById('ManagerPortal');
const subBtn = document.getElementById('subBtn')


ePortalBtn.addEventListener('click', () => {
    console.log(ePortalBtn.textContent)

    window.location.href = './employeePortal.html';
})

pPortalBtn.addEventListener('click', () => {
    console.log(pPortalBtn.textContent)

    window.location.href = './payrollPortal.html'
})

mPortalBtn.addEventListener('click', () => {
    console.log(mPortalBtn.textContent);

    window.location.href = './manager.html'
})

const getNotification = () => {
    window.alert("You've been subscribed to our newsletter!")
}

subBtn.addEventListener('click', getNotification);
