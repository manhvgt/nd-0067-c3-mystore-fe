# MyStore Project Overview

MyStore is Angular application that allows users to view a list of available products to purchase, add them to a shopping cart, and ultimately complete the checkout process.
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.7.

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and follow instruction below to setup and run the project.

## Structure
<pre>
Project Root Directory
├── readme.md
├── src
│   ├── app
│   │   ├── components
│   │   │   ├── app
│   │   │   ├── checkout
│   │   │   ├── ...
│   │   │   └── order-confirmation
│   │   ├── models
│   │   ├── services
│   │   ├── styles
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── assets
│   │   └── data.json
│   ├── index.html
│   ├── main.ts
│   └── styles.ts
├── .env
├── .gitignore
├── package.json
├── package.json.lock
├── .prettierrc
├── tsconfig.json
├── tsconfig.app.json
└── tsconfig.spec.json
</pre>

## Instructions

Before setting up and running this project, make sure below requirements are install and running in your environment.\
- NodeJS & npm
- Angular CLI
To install, run... Go to project dirrectory and run below command on terminal (or cmd/windows powershell..).

### Setup project and Install dependencies

`npm install`

- Check installation result on terminal. If project installed successfull, `node_module` directory will be created without error.

### Environment Variables
- It is required to create an `.env` file with below content and put it in project root directory.\

<pre>
SERVER_HOST='localhost'
SERVER_PORT=4200
</pre>

### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

### Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Future development

- Support role-based authentication
- Optimize DB structure and relationship
- Create Frontend side
  ...

## License

This project is modified and updated for study purpose on Udacity.
Refer to https://github.com/manhvgt/nd-0067-c3-mystore-fe

The original project (starter project) is belong to Udacity https://github.com/udacity/nd-0067-c3-angular-fundamentals-project-starter
[License](LICENSE.txt)


## Additional Resources (Development Note)

#### Project introduction: MyStore

You've completed the course! You know how to create a single-page application to offer a rich, dynamic experience on the web.

![MyStore shopping flow](shoppingflow.gif)

To showcase your new skills, you'll build an e-commerce website – an application that allows users to view a list of available products to purchase, add them to a shopping cart, and ultimately complete the checkout process. 

#### Project features

Your application reflects the same user experience as that of a real-world e-commerce website, including a(n):

* **Product list** page, which displays the available products for the user to choose and add to their cart (in various quantities)
* **Product details** page, which displays more information about any particular product
* **Shopping cart**, which includes the products that the user has added to their cart
* **Checkout form**, which collects information about the user (e.g., name, address, payment details, etc.)
* **Order confirmation page**, which shows the outcome after the user completes the checkout process (i.e., submits the checkout form)

#### Development strategy

Feel free to use this overview and the rubric specifications to create this project. You are always welcome to design and implement your own workflow, but if you are stuck or could use some inspiration, we've included the following walkthrough the help you get up and running.

1. **Scaffold your project** using the Angular CLI, and install any dependencies.
2. **Generate the product list component**. Having the product list as the "main" page is a great start for your users.
3. **Begin building the component logic and template** What is the function of the product list? What logic is included in the TypeScript component, and how does its HTML template function? Does this component collect any user input? If so, how does information entered by the user relate to properties in the TypeScript component?
3. **Consider the hierarchy of components**. Which other components do you anticipate you'll need to build in this application? Which component(s) should render other components? Which components should represent a parent-child relationship? Feel free to draw out this hierarchy as a chart to help you visualize the relationships between components.
4. **Create the TypeScript model** for products in the app. Any available product should be of this type, rather than an ordinary object.
5. **Generate the service(s)**. Which service(s) make the most sense? For any particular service, what is its function? Hint: You may want to create a service to handle any asynchronous data.
6. **Fetch data** from the API (or included `data.json` file) and render products in your product list.
7. **Generate and create other components**. How do these components interact, if at all, with the component you first created? How can we facilitate sharing information between them?
8. **Create routing** between components. Which components are linked by the router? How is the app routing module set up and configured to make sure the page doesn't reload during navigation?
9. **Ensure that inputs are validated** in the client. For example, your checkout form needs to collect information from the user in order for them to complete the checkout process. How do you ensure that you are collecting accurate information from the user?

