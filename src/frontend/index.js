import '@tjmonsi/small-router/small-router.js';
import { routes } from './routes.js';
// loads the header-component to be rendered
import './components/header-component/index.js';

// get the router from body to initialize routes
const router = document.querySelector('small-router');
// initialize it using here
router.routes = routes;
