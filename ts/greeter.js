var Student = /** @class */ (function() {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
    }
    return Student;
}());

function greeter(person) {
    return 'Hello, ' + person.firstName + ' ' + person.lastName;
}
var user = { firstName: 'Mary', lastName: 'Jane' };
var student = new Student('Ryan', 'Node', 'Dahl');
document.body.innerHTML = greeter(student);