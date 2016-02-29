import bows from 'bows';
import React from 'react';
import ReactDOM from 'react-dom';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';

let log = bows('Simpleauth.logout');

export default class extends React.Component{

    constructor(props){
        super(props);
    };

    handleLogout = () => {
        log("Handling logout");
    };

    render(){
        return (
            <FlatButton label="Logout" onClick={this.handleLogout} />
        );
    }
};
