class Person {
    constructor(initKey, initFirstName, initLastName) {
        this.key = initKey;
        this.firstName = initFirstName;
        this.lastName = initLastName;
    }
    
    toString() {
        return this.firstName + " " + this.lastName;
    }
}

class Employee extends Person {
    constructor(initKey, initFirstName, initLastName, initSalary) {
        super(initKey, initFirstName, initLastName);
        this.salary = initSalary;
    }

    toString() {
        return  super.toString() + " ($" + this.salary.toLocaleString() + ")";
    }
}

class Student extends Person {
    constructor(initKey, initFirstName, initLastName, initGPA) {
        super(initKey, initFirstName, initLastName);
        this.gpa = initGPA;
    }

    toString() {
        try {
        return super.toString() + " (" + this.gpa.toFixed(1) + " GPA)";
        }
        catch (e) {}
    }
}

class Undergraduates extends Student {
   constructor(initKey, initFirstName, initLastName, initStanding) {
       super(initKey, initFirstName, initLastName);
       this.standing = initStanding;
   }
 
   //returns the super toString method and adds the standing to the output
   toString() {
       return super.toString() + " (" + this.standing.toLocaleString() + ")";
   }
}


export {Person, Employee, Student, Undergraduates};