interface Person {
    firstName: string
    lastName: string
}

function greeter(person: Person) {
    return 'Hello, ' + person.firstName + ' ' + person.lastName
}

let user = {firstName: 'Mary', lastName: 'Jane'}

document.body.innerHTML = greeter(user)
