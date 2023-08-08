const ePortalBtn = document.getElementById('employeePortal');
const pPortalBtn = document.getElementById('payrollPortal');
const mPortalBtn = document.getElementById('ManagerPortal');

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