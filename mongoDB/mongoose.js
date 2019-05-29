const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function () {
    console.log('opened!')
})

const kittySchema = mongoose.Schema({
    name: String
})


kittySchema.methods.speak = function () {
    const greeting = this.name ? `Meow name is ${this.name}` : 'I don\'t have a name'
    console.log(greeting)
}
const Kitten = mongoose.model('Kitten', kittySchema) // model是构造document的class         


const felyne = new Kitten({ name: 'Felyne' })
felyne.speak()

const fluffy = new Kitten({ name: 'Fluffy' })
fluffy.save((err, fluffy) => {
    if (err) return console.error(err)
    fluffy.speak()
})

Kitten.find((err, kittens) => {
    if (err) return console.error(err);
    console.log(kittens);
})                                                                                     