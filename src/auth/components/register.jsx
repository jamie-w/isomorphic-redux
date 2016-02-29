import bows from 'bows';
import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import ReactDOM from 'react-dom';

let log = bows('Simpleauth.register');


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    };
    handleClose = () => {
        this.setState({open: false});
    };
    handleOpen = () => {
        this.setState({open: true});

    };
    customStyle = { width: '400px' };
    render(){
        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onClick={this.handleClose} />,
            <FlatButton
                label="Register"
                primary={true}
                onClick={this.handleClose} />,
        ];
        return <div>
            <FlatButton label="Register" onClick={this.handleOpen} />
            <Dialog
                ref="dialog"
                title="Registration Form"
                modal={false}
                open={this.state.open}
                contentStyle={this.customStyle}
                actions={actions}
                onRequestClose={this.handleClose}
            >
                <TextField type="text" hintText="Username" fullWidth={true} />
                <TextField type="password" hintText="Password" fullWidth={true} />
            </Dialog>
        </div>;
    };
};


export default Register;
