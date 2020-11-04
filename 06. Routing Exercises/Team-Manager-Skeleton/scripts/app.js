 import home from './controllers/home.js';
 import about from './controllers/about.js';
 import login from './controllers/login.js';
 import register from './controllers/register.js';
 import catalog from './controllers/catalog.js';
 import details from './controllers/details.js';
 import create from './controllers/create.js';
 import edit from './controllers/edit.js';
 
 $(()=>{
     const app = Sammy("#main", function(){
         this.use('Handlebars', 'hbs');

         this.userData = {loggedIn: true, hasTeam: false};

         this.get("index.html", home);
         this.get("#/home", home);
         this.get("/", home);

         this.get("#/about", about);

         this.get("#/register", register);

         this.get("#/login", login);

         this.get("#/catalog", catalog);

         this.get("#/catalog/:id", details);

         this.get("#/create", create);

         this.get("#/edit/:id", edit);
     });
     app.run();
 })
