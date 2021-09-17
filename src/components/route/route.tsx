import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes, { routePath } from '../../constants/routes';
import BusyIndicator from '../busy-indicator/busy-indicator';

const Routes = () => {
    return (
        <Suspense fallback={<BusyIndicator />}>
            <Switch>
                <>
                    <Route exact path="/">
                        <Redirect to={routePath.home.index} />
                    </Route>
                    {routes.map((route) => (
                        <Route {...route} key={route.path} />
                    ))}
                </>
            </Switch>
        </Suspense>
    );
};

export default Routes;
