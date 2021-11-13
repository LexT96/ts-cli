# ts CLI

A CLI for typescript projects made using gluegun.

## Commands
generate (g): Generates a new typescript interface, a createDto and an updateDto for your model.
```
ts-cli g User id:number name:string age:number
```
will create 
<ol>
  <li>a User.ts in interfaces/types/User.ts and will add the given properties</li>
  <li>a UpdateUserDto.ts in interfaces/dtos </li>
  <li>a CreateUserDto.ts in interfaces/dtos </li>
</ol>

remove (r): Removes a single property from an object.
```
ts-cli r User age:number
```
will remove the property from the type and dto interfaces.

add (a): Adds the given properties to an object.
```
ts-cli a User points:number team:number
```
will add the properties to all three interfaces.

## Getting started
1. Clone this project `git clone https://github.com/LexT96/ts-cli`.
2. Globally link the cli `cd ts-cli && (sudo) yarn link`.
3. Link the cli to your projects. cd into your project and run `yarn link "ts-cli"`.
4. Use the cli by running `ts-cli COMMAND PARAMETERS, e.g. ts-cli g User id:number name:string age: number`.


