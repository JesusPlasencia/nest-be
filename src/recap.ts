const nombre: string = 'Jesus Plasencia Toledo';

class Persona {
  constructor(private age: number, private name: string) { }

  getSummary() {
    return `My name is ${this.name}, i'm ${this.age} years old.`
  }
}

const Jesus = new Persona(21, "Jesus Plasencia Toledo");
const message: string = Jesus.getSummary();

console.log(`INFO: ${message}`);
