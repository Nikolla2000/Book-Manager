const departmentWrapper = document.createElement('div');
departmentWrapper.classList.add('wrapper')
const headingDepartments = document.createElement('h2');
headingDepartments.innerText = 'DEPARTMENTS'
departmentWrapper.append(headingDepartments)


const employeesWrapper = document.createElement('div');
employeesWrapper.classList.add('wrapper')
const headingEmployees = document.createElement('h2');
headingEmployees.innerText = 'EMPLOYEES'
employeesWrapper.append(headingEmployees)

function createInput(tagInputName, type, name, placeholder) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('input-wrapper')

    const label = document.createElement('label');

    label.setAttribute('for', name);
    label.innerText = name;

    const input = document.createElement(tagInputName)
    input.type = type;
    input.id = name;
    input.name = name;
    input.placeholder = placeholder;
    const pError = document.createElement('p');
    pError.id = `${name}Error`
    pError.classList.add('input-error')

    input.oninput = () => {
        pError.innerText = ''
    }

    wrapper.append(label, input, pError)
    return wrapper;
}

const deparments = [];
// {
//     name: string
//     maxEmployeesCount: number
//     employees: {employee}[]
//     }
const availableEmployees = [];
// {
//     firstName: string
//     lastName: string
//     job: string
// }

const deparmentForm = document.createElement('form');

const deparmentNameInput = createInput('input', 'text', 'name', 'HR')
const deparmentMaxEmployeesCountInput = createInput('input', 'number', 'maxEmployeesCount', '5')
const departmentSubmitBtn = document.createElement('button');
departmentSubmitBtn.innerText = 'create department'

deparmentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameInput = event.target.querySelector('input[name=name]');
    const maxEmployeesCountInput = event.target.querySelector('input[name=maxEmployeesCount]');
    const newDepartment = {};
    newDepartment.employees = [];

    newDepartment[nameInput.name] = nameInput.value;
    newDepartment[maxEmployeesCountInput.name] = maxEmployeesCountInput.value;

    deparments.push(newDepartment);
    renderDepartmentsList();

})

deparmentForm.append(deparmentNameInput, deparmentMaxEmployeesCountInput, departmentSubmitBtn);

const departmentsListElement = document.createElement('ul');

function createDepartmentLiElement(newDepartment) {
    const liElement = document.createElement('li');

    Object.keys(newDepartment).forEach((key) => {
        const pElement = document.createElement('p');
        pElement.innerText = `${key}: ${newDepartment[key]}`

        liElement.append(pElement);
    })

    return liElement;
}

function renderDepartmentsList() {
    departmentsListElement.replaceChildren(...deparments.map((department) => createDepartmentLiElement(department)))
}

departmentWrapper.append(deparmentForm, departmentsListElement);

document.body.append(departmentWrapper, employeesWrapper);

// create form for employee
const employeesForm = document.createElement('form')

function createSelect(name, options) {
    const wrapper = document.createElement('wrapper')
    wrapper.classList.add('input-wrapper')
    const label = document.createElement('label')
    
    label.setAttribute('for', name)
    label.innerText	 = name;

    const select = document.createElement('select')
    select.name = name;
    select.id = name;
    const optionElements = options.map((option) => {
        const optionElement = document.createElement('option')
        optionElement.value = option;
        optionElement.innerText = option;

        return optionElement
    })
    select.append(...optionElements)
    
    const defaultOption = document.createElement('option')
    defaultOption.innerText = 'Choose'
    defaultOption.value = ''
    defaultOption.selected = 'selected';
    defaultOption.hidden = true;

    select.append(defaultOption)

    const pError = document.createElement('p')
    pError.id = `${name}Error`
    pError.classList.add('input-error')

    
    wrapper.append(label,select, pError)
    
    return wrapper
}

const firstNameEmployee = createInput('input', 'text', 'firstName', 'Enter first Name')
const lastNameEmployee = createInput('input', 'text', 'lastName', 'Enter last Name')
const jobEmployee = createInput('input', 'text', 'job', 'Enter Job')


const employeesSelect = createSelect('selectEmployee', availableEmployees)

const selectBtn = document.createElement('button')
selectBtn.innerText = 'Add'

employeesForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameInput = event.target.querySelectorAll('input');
    const newEmployee = {};

    newEmployee[firstNameEmployee.name] = nameInput.value;
    newEmployee[lastNameEmployee.name] = nameInput.value;
    newEmployee[jobEmployee.name] = nameInput.value;

    availableEmployees.push(newEmployee);
    renderDepartmentsList();

})

// create list for employee

// **

// EMPLOYEE WILL HAVE A SELECT WITH A BUTTON. SELECT WILL GIVE OPTIONS WITH DEPARTMENTS WHICH HAVE FREE SPOTS. WHEN ADD BUTTON IS CLICKED
// ADD EMPLOYEE TO DEPARTMENT AND REMOVE EMPLOYEE FROM LIST WITH AVAILABLE EMPLOYEES 
// - remove from employees array and push to departments employee list
// - render departments list
// - render employee list
// *-> update selects inputs of available employees

// DEPARTMENT WILL HAVE EMPLOYEE LIST WHICH WILL HAVE EMPLOYEE AND NEXT TO IT LEAVE BUTTON:
// - remove employee from department and move it back to employee array
// - render departments list
// - render employee list
// *-> update selects inputs of available employees

employeesForm.append(firstNameEmployee, lastNameEmployee, jobEmployee)
const EmployeesListElement = document.createElement('ul');
employeesWrapper.append(employeesForm, selectBtn)

