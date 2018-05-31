function greeter(person) {
    return 'Hello, ' + person.firstName + ' ' + person.lastName;
}
var user = { firstName: 'Mary', lastName: 'Jane' };
document.body.innerHTML = greeter(user);
