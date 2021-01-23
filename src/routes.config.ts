import Home from './routes/Home.svelte'
import Dashboard from './routes/Dashboard.svelte'
import Timer from './routes/Timer.svelte'
import Profile from './routes/Profile.svelte'
import NotFound from './routes/NotFound.svelte'
import { wrap } from 'svelte-spa-router/wrap'
import { isAuthenticated } from './services/authentication'

export const routes = {
    // Exact path
    '/': wrap({
        component: Home,
        props: {
            appName: `Z's Next Meal Planner`
        }
    }),

    '/dashboard': Dashboard,

    '/timer': Timer,

    '/profile': wrap({
        component: Profile,

        // Custom data: any JavaScript object
        // This is optional and can be omitted
        // It can be useful to understand the component who caused the pre-condition failure
        userData: {
            hello: 'world',
            myFunc: () => {
                console.log('do something!')
            }
        },

        conditions: [
            (detail) => {
                console.log('Pre-condition #1 for:', detail.location);
                return true
            },
            (detail) => {
                // This pre-condition is executed only if the first one succeeded
                console.log('Pre-condition #2 executed', detail.location, detail.querystring)

                return isAuthenticated('johny');
            }
        ]
    }),

    // Catch-all
    // This is optional, but if present it must be the last
    '*': NotFound,
}