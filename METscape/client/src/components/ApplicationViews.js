import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
    UserProfileContext,
    UserProfileProvider,
} from '../providers/UserProfileProvider';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';



const ApplicationViews = () => {
    const { isLoggedIn, isAdmin } = useContext(UserProfileContext);

    const authLevel = () => {
        if (isLoggedIn && isAdmin()) {
            return (
                <>
                    {/* <TagProvider>
                        <Route path="/tags">
                            <TagManager />
                        </Route>
                    </TagProvider>
                    <UserProfileProvider>
                        <Route path="/users">
                            <UserManager />
                        </Route>
                    </UserProfileProvider>
                    <UserProfileProvider>
                        <Route path="/deactive">
                            <DeactiveUserManager />
                        </Route>
                    </UserProfileProvider>
                    <UserProfileProvider>
                        <Route path="/unapprovedPosts">
                            <UnapprovedPosts />
                        </Route>
                    </UserProfileProvider> */}
                </>
            );
        } else if (isLoggedIn && !isAdmin()) {
            return <Redirect to="/" />;
        } else {
            return <Redirect to="/login" />;
        }
    };

    return (
        <Switch>
            <Route path="/" exact>
                {isLoggedIn ? <Home /> : <Redirect to="/login" />}
            </Route>

            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            {authLevel()}
        </Switch>
    );
};

export default ApplicationViews;
