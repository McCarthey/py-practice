function foo() {
  var something = "cool"
  var another = [1, 2, 3]

  function doSomething() {
    console.log(something)
  }

  function doAnither() {
    console.log(another.join("!"))
  }
}