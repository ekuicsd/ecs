# Ecs

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

Pre Installation required: 
------------------------------------------
Angular CLI  >= 8.0.0
Node Package


Instructions to setup on local system:
-------------------------------------------
1. Open the project folder in any suitable IDE for angular.
2. Open terminal and run "npm install" command 
    (in case of error, Please make sure your developer mode on in your system and antivirus
    services are off untill this process).
3. Run "ng serve --o" command in terminal.
This will open your browser with website...


Instructions to deploy:
---------------------------------------------
1. Run command "ng build --prod" in terminal
2. Install express in project by running comand "npm i express"
3. Make a file in the folder of the project by server.js
4. Write code in the above file

		const express = require('express');
		const path = require('path');

		const app = express();
		app.use(express.static('./dist/ecs'));

		app.get('/*', function(req, res) {
			res.sendFile('index.html', {root: 'dist/ecs/'});
		});

		app.listen(process.env.PORT || 4300);
		
5. Check the code by running "localhost:4300" on browser
6. Change the package.json
	replace "ng serve" to "node server.js" in start key.
	
this is how to deploy on heroku... you can deploy on other paltform by different ways.


Additionals
----------------------------------------------
This website build by using Angular framework.
Tech Stack: HTML, CSS, Typescipt, Bootstrap, Ng-Bootstrap;

NavBar which consists of cart and order of the user.

Build a site which show list of all books in tabular form,
search with book by title or author name, sort by rating in descending.
pagination is also there.

ADD To CART button add the same book in the cart. 

and on checkout page, you have to fill your address details and payment details only then you can order the books.