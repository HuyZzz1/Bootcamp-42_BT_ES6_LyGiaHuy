export class Person {
  constructor(id, category, fullName, address, email) {
    this.id = id;
    this.category = category;
    this.fullName = fullName;
    this.address = address;
    this.email = email;
  }
}

export class Student extends Person {
  constructor(
    id,
    category,
    fullName,
    address,
    email,
    math,
    physics,
    chemistry
  ) {
    super(id, category, fullName, address, email);
    this.math = +math;
    this.physics = +physics;
    this.chemistry = +chemistry;
  }

  averageGrade() {
    let grade = (this.math + this.physics + this.chemistry) / 3;
    return grade.toFixed(2);
  }
}

export class Employee extends Person {
  constructor(id, category, fullName, address, email, days, baseSalary) {
    super(id, category, fullName, address, email);
    this.days = +days;
    this.baseSalary = +baseSalary;
  }

  totalSalary() {
    return (this.days * this.baseSalary).toLocaleString();
  }
}

export class Customer extends Person {
  constructor(
    id,
    category,
    fullName,
    address,
    email,
    company,
    invoice,
    comment
  ) {
    super(id, category, fullName, address, email);
    this.company = company;
    this.invoice = +invoice.toLocaleString();
    this.comment = comment;
  }
}
