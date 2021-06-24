# Getting Started With Schematics

This repository is a basic Schematic implementation that serves as a starting point to create and 
publish Schematics to NPM.

## Quick start using @angular-devkit/schematics-cli

**Install CLI globally**

```sh
npm i -g @angular-devkit/schematics-cli
```

**Creating a schematic project**

```sh
schematics blank my-refactoring-tool
```

**Adding an empty schematic**

Inside your schematics project

```sh
schematics blank my-new-schematic
```

**Running the schematic in a project**

The nice thing about schematics is that you don't need to add the dependency to the project you want 
to upgrade, but you have to make it available. For that we have two options:

- install globally, after publishing, install globally
  ```sh
  npm i -g <your-project-name>
  ```

- link local project, run this command inside your schematics project
  ```sh
  npm link
  ```

> ⚠️ Don't forget to build `npm run build`

List all available schematics in a schematics project

```sh
schematics <your-project-name>: --list # DONT FORGET THE COLON `:`
```

Run the desired schematic

```sh
schematics <your-project-name>:<schematic-name>
```

## Testing

To test locally, install `@angular-devkit/schematics-cli` globally and use the `schematics` command 
line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with
```bash
schematics --help
```

## Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

## Publishing

To publish, simply do:

```bash
npm run build
npm publish
```

That's it!
 
