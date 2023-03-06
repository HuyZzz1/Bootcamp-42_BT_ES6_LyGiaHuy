import { Person, Student, Employee, Customer } from "./Person.js";
import {
  getPersonAPI,
  deletePersonAPI,
  createPersonAPI,
  getPersonByID,
  updatePersonAPI,
} from "./personAPI.js";
import { alertFail, alertSuccess, warningDelete } from "./sweetAlert.js";

getPerson();

getElement("#btnAdd").addEventListener("click", () => {
  const person = {
    category: getElement("#categoryForm").value,
    fullName: getElement("#fullName").value,
    email: getElement("#email").value,
    address: getElement("#address").value,
  };

  const student = {
    ...person,
    math: getElement("#math").value,
    physics: getElement("#physics").value,
    chemistry: getElement("#chemistry").value,
  };

  const employee = {
    ...person,
    days: getElement("#days").value,
    baseSalary: getElement("#baseSalary").value,
  };

  const customer = {
    ...person,
    company: getElement("#company").value,
    invoice: getElement("#invoice").value,
    comment: getElement("#comment").value,
  };

  let categoryForm = getElement("#categoryForm").value;
  switch (categoryForm) {
    case "Học sinh":
      const isValidStudent = validateFormStudent();
      if (!isValidStudent) {
        return;
      }
      createPersonAPI(student);
      alertSuccess("Thêm dữ liệu học sinh thành công");
      break;
    case "Nhân viên":
      const isValidEmployee = validateFormEmployee();
      if (!isValidEmployee) {
        return;
      }
      createPersonAPI(employee);
      alertSuccess("Thêm dữ liệu nhân viên thành công");
      break;
    case "Khách hàng":
      const isValidCustomer = validateFormCustomer();
      if (!isValidCustomer) {
        return;
      }
      createPersonAPI(customer);
      alertSuccess("Thêm dữ liệu khách hàng thành công");
      break;
    default:
      alertFail("Vui lòng chọn loại người dùng");
      break;
  }
  resetForm("#personForm");
});

getElement("#academyTable").addEventListener("click", (event) => {
  const id = event.target.getAttribute("data-id");
  if (!id) return;
  selectPerson(id);
});

window.updatePerson = function updatePerson(personID) {
  const person = {
    category: getElement("#categoryForm").value,
    fullName: getElement("#fullName").value,
    email: getElement("#email").value,
    address: getElement("#address").value,
  };

  const student = {
    ...person,
    math: getElement("#math").value,
    physics: getElement("#physics").value,
    chemistry: getElement("#chemistry").value,
  };

  const employee = {
    ...person,
    days: getElement("#days").value,
    baseSalary: getElement("#baseSalary").value,
  };

  const customer = {
    ...person,
    company: getElement("#company").value,
    invoice: getElement("#invoice").value,
    comment: getElement("#comment").value,
  };

  let categoryForm = getElement("#categoryForm").value;
  switch (categoryForm) {
    case "Học sinh":
      const isValidStudent = validateFormStudent();
      if (!isValidStudent) {
        return;
      }
      updatePersonAPI(personID, student);
      alertSuccess("Cập nhật dữ liệu học sinh thành công");
      break;
    case "Nhân viên":
      const isValidEmployee = validateFormEmployee();
      if (!isValidEmployee) {
        return;
      }
      updatePersonAPI(personID, employee);
      alertSuccess("Cập nhật dữ liệu nhân viên thành công");
      break;
    case "Khách hàng":
      if (!isValidCustomer) {
        return;
      }
      updatePersonAPI(personID, customer);
      alertSuccess("Cập nhật dữ liệu khách hàng thành công");
      break;
    default:
      alertFail("Phải điền đầy đủ thông tin người dùng");
      break;
  }

  resetForm("#personForm");
};

window.selectPerson = async function selectPerson(personID) {
  getElement("#btnAdd").style.display = "none";
  getElement("#btnUpdate").style.display = "inline-block";

  const { data: person } = await getPersonByID(personID);
  let type = person.category;
  switch (type) {
    case "Học sinh":
      getElement("#categoryForm").value = type;
      getElement("#fullName").value = person.fullName;
      getElement("#email").value = person.email;
      getElement("#address").value = person.address;
      getElement("#math").value = person.math;
      getElement("#physics").value = person.physics;
      getElement("#chemistry").value = person.chemistry;
      displayStudentForm();
      break;
    case "Nhân viên":
      getElement("#categoryForm").value = type;
      getElement("#fullName").value = person.fullName;
      getElement("#email").value = person.email;
      getElement("#address").value = person.address;
      getElement("#days").value = person.days;
      getElement("#baseSalary").value = person.baseSalary;
      displayEmployeeForm();
      break;
    case "Khách hàng":
      getElement("#categoryForm").value = type;
      getElement("#fullName").value = person.fullName;
      getElement("#email").value = person.email;
      getElement("#address").value = person.address;
      getElement("#company").value = person.company;
      getElement("#invoice").value = person.invoice;
      getElement("#comment").value = person.comment;
      displayCustomerForm();
      break;
  }

  getElement("#btnUpdate").setAttribute(
    "onclick",
    `window.updatePerson(${person.id})`
  );
};

async function getPerson(value) {
  const response = await getPersonAPI(value);
  console.log(response);
  const person = response.data.map((person) => {
    return new Person(
      person.id,
      person.category,
      person.fullName,
      person.address,
      person.email
    );
  });
  renderPerson(person);
}

async function getStudent() {
  const response = await getPersonAPI("Học sinh");
  const student = response.data.map((student) => {
    return new Student(
      student.id,
      student.category,
      student.fullName,
      student.address,
      student.email,
      student.math,
      student.physics,
      student.chemistry
    );
  });
  console.log(student);
  renderStudent(student);
}

async function getEmployee() {
  const response = await getPersonAPI("Nhân viên");
  const employee = response.data.map((employee) => {
    return new Employee(
      employee.id,
      employee.category,
      employee.fullName,
      employee.address,
      employee.email,
      employee.days,
      employee.baseSalary
    );
  });
  renderEmployee(employee);
}

async function getCustomer() {
  const response = await getPersonAPI("Khách hàng");
  const customer = response.data.map((customer) => {
    return new Customer(
      customer.id,
      customer.category,
      customer.fullName,
      customer.address,
      customer.email,
      customer.company,
      customer.invoice,
      customer.comment
    );
  });
  renderCustomer(customer);
}

window.deletePerson = async function deletePerson(personID) {
  try {
    const { isConfirmed: result } = await warningDelete();
    if (result) {
      await deletePersonAPI(personID);
      await getPerson();
      alertSuccess("Xóa dữ liệu người dùng thành công");
    }
  } catch (error) {
    alertFail("Xóa dữ liệu người dùng thất bại");
  }
};

window.deleteStudent = async function deleteStudent(studentID) {
  try {
    const { isConfirmed: result } = await warningDelete();
    if (result) {
      await deletePersonAPI(studentID, "Học sinh");

      await getStudent();

      alertSuccess("Xóa dữ liệu học sinh thành công");
    }
  } catch (error) {
    alertFail("Xóa dữ liệu học sinh thất bại");
  }
};

window.deleteEmployee = async function deleteEmployee(employeeID) {
  try {
    const { isConfirmed: result } = await warningDelete();
    if (result) {
      await deletePersonAPI(employeeID, "Nhân viên");
      await getEmployee();
      alertSuccess("Xóa dữ liệu nhân viên thành công");
    }
  } catch (error) {
    alertFail("Xóa dữ liệu nhân viên thất bại");
  }
};

window.deleteCustomer = async function deleteCustomer(customerID) {
  try {
    const { isConfirmed: result } = await warningDelete();
    if (result) {
      await deletePersonAPI(customerID, "Khách hàng");

      await getCustomer();

      alertSuccess("Xóa dữ liệu khách hàng thành công");
    }
  } catch (error) {
    alertFail("Xóa dữ liệu khách hàng thất bại");
  }
};

function renderPerson(person) {
  let html = person.reduce((result, person) => {
    return (
      result +
      `
            <tr>
                <td class="text-center">${person.id}</td>
                <td class="text-center">${person.category}</td>
                <td class="text-center">${person.fullName}</td>
                <td class="text-center">${person.address}</td>
                <td class="text-center">${person.email}</td>
                <td class="text-center">
                    <button class="btn btn-primary my-1" data-toggle="modal" data-target="#personModal" data-id="${person.id}">Sửa<i class="fa-regular fa-pen-to-square ml-2"></i></button>
                    <button class="btn btn-danger my-1" onclick="window.deletePerson(${person.id})">Xóa<i class="fa-regular fa-trash-can ml-2"></i></button>
                </td>
            </tr>
            `
    );
  }, "");

  getElement("#userList").innerHTML = html;
}

function renderStudent(student) {
  let html = student.reduce((result, student) => {
    return (
      result +
      `
            <tr>
                <td class="text-center">${student.id}</td>
                <td class="text-center">${student.category}</td>
                <td class="text-center">${student.fullName}</td>
                <td class="text-center">${student.address}</td>
                <td class="text-center">${student.email}</td>
                <td class="text-center">${student.math}</td>
                <td class="text-center">${student.physics}</td>
                <td class="text-center">${student.chemistry}</td>
                <td class="text-center">${student.averageGrade()}</td>
                <td class="text-center">
                    <button class="btn btn-primary my-1" data-toggle="modal" data-target="#personModal" data-id="${
                      student.id
                    }">Sửa<i class="fa-regular fa-pen-to-square ml-2"></i></button>
                    <button class="btn btn-danger my-1" onclick="window.deleteStudent(${
                      student.id
                    })">Xóa<i class="fa-regular fa-trash-can ml-2"></i></button>
                </td>
            </tr>
            `
    );
  }, "");

  getElement("#userList").innerHTML = html;
}

function renderEmployee(employee) {
  let html = employee.reduce((result, employee) => {
    return (
      result +
      `
            <tr>
                <td class="text-center">${employee.id}</td>
                <td class="text-center">${employee.category}</td>
                <td class="text-center">${employee.fullName}</td>
                <td class="text-center">${employee.address}</td>
                <td class="text-center">${employee.email}</td>
                <td class="text-center">${employee.totalSalary()}</td>
                <td class="text-center">
                    <button class="btn btn-primary my-1" data-toggle="modal" data-target="#personModal" data-id="${
                      employee.id
                    }">Sửa<i class="fa-regular fa-pen-to-square ml-2"></i></button>
                    <button class="btn btn-danger my-1" onclick="window.deleteEmployee(${
                      employee.id
                    })">Xóa<i class="fa-regular fa-trash-can ml-2"></i></button>
                </td>
            </tr>
            `
    );
  }, "");

  getElement("#userList").innerHTML = html;
}

function renderCustomer(customer) {
  let html = customer.reduce((result, customer) => {
    return (
      result +
      `
            <tr>
                <td class="text-center">${customer.id}</td>
                <td class="text-center">${customer.category}</td>
                <td class="text-center">${customer.fullName}</td>
                <td class="text-center">${customer.address}</td>
                <td class="text-center">${customer.email}</td>
                <td class="text-center">${customer.company}</td>
                <td class="text-center">${customer.invoice}</td>
                <td class="text-center">${customer.comment}</td>
                <td class="text-center">
                    <button class="btn btn-primary my-1" data-toggle="modal" data-target="#personModal" data-id="${customer.id}">Sửa<i class="fa-regular fa-pen-to-square ml-2"></i></button>
                    <button class="btn btn-danger my-1" onclick="window.deleteCustomer(${customer.id})">Xóa<i class="fa-regular fa-trash-can ml-2"></i></button>
                </td>
            </tr>
            `
    );
  }, "");

  getElement("#userList").innerHTML = html;
}

getElement("#categoryTable").addEventListener("change", () => {
  let categoryTable = getElement("#categoryTable").value;
  switch (categoryTable) {
    case "student":
      displayStudentTable();
      getStudent();
      break;
    case "employee":
      displayEmployeeTable();
      getEmployee();
      break;
    case "customer":
      displayCustomerTable();
      getCustomer();
      break;
    default:
      displayPersonTable();
      getPerson();
      break;
  }
});

getElement("#categoryForm").addEventListener("change", () => {
  let categoryForm = getElement("#categoryForm").value;
  switch (categoryForm) {
    case "Học sinh":
      displayStudentForm();
      break;
    case "Nhân viên":
      displayEmployeeForm();
      break;
    case "Khách hàng":
      displayCustomerForm();
      break;
    default:
      displayPersonForm();
      break;
  }
});

getElement("#btnOpenModal").addEventListener("click", () => {
  getElement("#btnUpdate").style.display = "none";
  getElement("#btnAdd").style.display = "inline-block";
});

getElement("#btnClose").addEventListener("click", () => {
  resetForm("#personForm");
});

function getElement(selector) {
  return document.querySelector(selector);
}

function displayPersonTable() {
  getElement("#thMath").classList.add("d-none");
  getElement("#thPhysics").classList.add("d-none");
  getElement("#thChemistry").classList.add("d-none");
  getElement("#thAverageGrade").classList.add("d-none");
  getElement("#thTotalSalary").classList.add("d-none");
  getElement("#thCompany").classList.add("d-none");
  getElement("#thInvoice").classList.add("d-none");
  getElement("#thComment").classList.add("d-none");
}

function displayStudentTable() {
  getElement("#thMath").classList.remove("d-none");
  getElement("#thPhysics").classList.remove("d-none");
  getElement("#thChemistry").classList.remove("d-none");
  getElement("#thAverageGrade").classList.remove("d-none");
  getElement("#thTotalSalary").classList.add("d-none");
  getElement("#thCompany").classList.add("d-none");
  getElement("#thInvoice").classList.add("d-none");
  getElement("#thComment").classList.add("d-none");
}

function displayEmployeeTable() {
  getElement("#thMath").classList.add("d-none");
  getElement("#thPhysics").classList.add("d-none");
  getElement("#thChemistry").classList.add("d-none");
  getElement("#thAverageGrade").classList.add("d-none");
  getElement("#thTotalSalary").classList.remove("d-none");
  getElement("#thCompany").classList.add("d-none");
  getElement("#thInvoice").classList.add("d-none");
  getElement("#thComment").classList.add("d-none");
}

function displayCustomerTable() {
  getElement("#thMath").classList.add("d-none");
  getElement("#thPhysics").classList.add("d-none");
  getElement("#thChemistry").classList.add("d-none");
  getElement("#thAverageGrade").classList.add("d-none");
  getElement("#thTotalSalary").classList.add("d-none");
  getElement("#thCompany").classList.remove("d-none");
  getElement("#thInvoice").classList.remove("d-none");
  getElement("#thComment").classList.remove("d-none");
}

function resetForm(formID) {
  getElement(formID).reset();
  getElement("#notiFullName").innerHTML = "";
  getElement("#notiEmail").innerHTML = "";
  getElement("#notiAddres").innerHTML = "";
  getElement("#notiMath").innerHTML = "";
  getElement("#notiPhysics").innerHTML = "";
  getElement("#notiChemistry").innerHTML = "";
  getElement("#notiDays").innerHTML = "";
  getElement("#notiBaseSalary").innerHTML = "";
  getElement("#notiCompany").innerHTML = "";
  getElement("#notiInvoice").innerHTML = "";
  getElement("#notiComment").innerHTML = "";
}

function displayPersonForm() {
  getElement(".student-info").classList.add("d-none");
  getElement(".employee-info").classList.add("d-none");
  getElement(".company-info").classList.add("d-none");
}

function displayStudentForm() {
  getElement(".student-info").classList.remove("d-none");
  getElement(".employee-info").classList.add("d-none");
  getElement(".company-info").classList.add("d-none");
}

function displayEmployeeForm() {
  getElement(".student-info").classList.add("d-none");
  getElement(".employee-info").classList.remove("d-none");
  getElement(".company-info").classList.add("d-none");
}

function displayCustomerForm() {
  getElement(".student-info").classList.add("d-none");
  getElement(".employee-info").classList.add("d-none");
  getElement(".company-info").classList.remove("d-none");
}

function validateFormStudent() {
  let isValid = true;

  const fullName = getElement("#fullName").value;
  const email = getElement("#email").value;
  const address = getElement("#address").value;
  const math = getElement("#math").value;
  const physics = getElement("#physics").value;
  const chemistry = getElement("#chemistry").value;

  if (!fullName.trim()) {
    isValid = false;
    getElement("#notiFullName").innerHTML = "Không để trống";
  } else {
    getElement("#notiFullName").innerHTML = "";
  }
  if (!email.trim()) {
    isValid = false;
    getElement("#notiEmail").innerHTML = "Không để trống";
  } else {
    getElement("#notiEmail").innerHTML = "";
  }
  if (!address.trim()) {
    isValid = false;
    getElement("#notiAddress").innerHTML = "Không để trống";
  } else {
    getElement("#notiAddress").innerHTML = "";
  }
  if (!math.trim()) {
    isValid = false;
    getElement("#notiMath").innerHTML = "Không để trống";
  } else {
    getElement("#notiMath").innerHTML = "";
  }
  if (!physics.trim()) {
    isValid = false;
    getElement("#notiPhysics").innerHTML = "Không để trống";
  } else {
    getElement("#notiPhysics").innerHTML = "";
  }
  if (!chemistry.trim()) {
    isValid = false;
    getElement("#notiChemistry").innerHTML = "Không để trống";
  } else {
    getElement("#notiChemistry").innerHTML = "";
  }

  return isValid;
}

function validateFormEmployee() {
  let isValid = true;

  const fullName = getElement("#fullName").value;
  const email = getElement("#email").value;
  const address = getElement("#address").value;
  const days = getElement("#days").value;
  const baseSalary = getElement("#baseSalary").value;

  if (!fullName.trim()) {
    isValid = false;
    getElement("#notiFullName").innerHTML = "Không để trống";
  } else {
    getElement("#notiFullName").innerHTML = "";
  }
  if (!email.trim()) {
    isValid = false;
    getElement("#notiEmail").innerHTML = "Không để trống";
  } else {
    getElement("#notiEmail").innerHTML = "";
  }
  if (!address.trim()) {
    isValid = false;
    getElement("#notiAddress").innerHTML = "Không để trống";
  } else {
    getElement("#notiAddress").innerHTML = "";
  }

  if (!days.trim()) {
    isValid = false;
    getElement("#notiDays").innerHTML = "Không để trống";
  } else {
    getElement("#notiDays").innerHTML = "";
  }
  if (!baseSalary.trim()) {
    isValid = false;
    getElement("#notiBaseSalary").innerHTML = "Không để trống";
  } else {
    getElement("#notiBaseSalary").innerHTML = "";
  }

  return isValid;
}
function validateFormCustomer() {
  let isValid = true;

  const fullName = getElement("#fullName").value;
  const email = getElement("#email").value;
  const address = getElement("#address").value;
  const company = getElement("#company").value;
  const invoice = getElement("#invoice").value;
  const comment = getElement("#comment").value;

  if (!fullName.trim()) {
    isValid = false;
    getElement("#notiFullName").innerHTML = "Không để trống";
  } else {
    getElement("#notiFullName").innerHTML = "";
  }
  if (!email.trim()) {
    isValid = false;
    getElement("#notiEmail").innerHTML = "Không để trống";
  } else {
    getElement("#notiEmail").innerHTML = "";
  }
  if (!address.trim()) {
    isValid = false;
    getElement("#notiAddress").innerHTML = "Không để trống";
  } else {
    getElement("#notiAddress").innerHTML = "";
  }
  if (!company.trim()) {
    isValid = false;
    getElement("#notiCompany").innerHTML = "Không để trống";
  } else {
    getElement("#notiCompany").innerHTML = "";
  }
  if (!invoice.trim()) {
    isValid = false;
    getElement("#notiInvoice").innerHTML = "Không để trống";
  } else {
    getElement("#notiInvoice").innerHTML = "";
  }
  if (!comment.trim()) {
    isValid = false;
    getElement("#notiComment").innerHTML = "Không để trống";
  } else {
    getElement("#notiComment").innerHTML = "";
  }

  return isValid;
}
