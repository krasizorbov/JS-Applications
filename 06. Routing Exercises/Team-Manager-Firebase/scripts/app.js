import home from '../controllersViews/home.js';
import about from '../controllersViews/about.js';
import catalog from '../controllersViews/catalog.js';
import create, {createTeam} from '../controllersViews/create.js';
import details from '../controllersViews/details.js';
import edit, {editTeam} from '../controllersViews/edit.js';
import login, {loginUser} from '../controllersViews/login.js'
import register, {registerUser} from '../controllersViews/register.js'
import leaveTeam from '../controllersViews/leave.js'
import logout from '../controllersViews/logout.js'
import join from '../controllersViews/join.js'

window.addEventListener('load', function(e) {
    const app = Sammy("#main", function() {
        this.use("Handlebars", "hbs");

        this.userInfo = {
            loggedIn: '',
            hasTeam: '',
            username: '',
            ownerTeamId: '',
            memberTeamId: '',
            id: ''
        };

        this.get('home', home);
        this.get('index.html', home);
        this.get('/', home);

        this.get('login', login);

        this.get('register', register);

        this.get('about', about);

        this.get('catalog', catalog);

        this.get('create', create);

        this.get('catalog/:id', details);

        this.get('edit/:id', edit);

        this.get('leave', leaveTeam);

        this.get('join/:id', join);

        this.get('logout', logout);

        this.post('edit', (context) => { editTeam.call(context); });

        this.post('register', (context) => { registerUser.call(context); });

        this.post('login', (context) => { loginUser.call(context); } );

        this.post('create', (context) => { createTeam.call(context) });

    });

    app.run();
})
