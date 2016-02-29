import React, { Component } from 'react';
import { connect } from 'react-redux';

import Login from './auth/components/login';
import Registration from './auth/components/register';
import Logout from './auth/components/logout';

const author = false;

class App extends Component {

    render() {
        if(author)
            return <Logout />
        return (
            <div>
                <Login />
                <Registration />
            </div>);
    }
}

export default App;
