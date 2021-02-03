import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UserProfileContext, UserProfileProvider } from '../providers/UserProfileProvider';
import { PostProvider } from "../providers/PostProvider"
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { CategoryBrowser } from "../pages/CategoryBrowser"
import DepartmentFeed from '../pages/DepartmentFeed';
import { ExhibitProvider } from '../providers/ExhibitProvider';
import MyExhibits from '../pages/MyExhibits';
import FriendManager from '../pages/FriendManager';



const ApplicationViews = () => {
    const { isLoggedIn } = useContext(UserProfileContext);

    const authLevel = () => {
        if (isLoggedIn) {
            return (
                <>
                    <PostProvider>
                        <Route path="/categorybrowser">
                            <CategoryBrowser />
                        </Route>
                    </PostProvider>
                    <PostProvider>
                        <ExhibitProvider>
                            <Route path="/departmentfeed/:departmentId" exact>
                                <DepartmentFeed />
                            </Route>
                        </ExhibitProvider>
                    </PostProvider>
                    <PostProvider>
                        <ExhibitProvider>
                            <Route path="/myexhibits" exact>
                                <MyExhibits />
                            </Route>
                        </ExhibitProvider>
                    </PostProvider>
                    <UserProfileProvider>
                        <Route path="/friends" exact>
                            <FriendManager />
                        </Route>
                    </UserProfileProvider>
                </>
            );
        } else if (isLoggedIn) {
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
