import React from 'react';
import { connect } from "react-redux";
import actions from '../../redux/auth/action';
import { withRouter } from 'react-router-dom';
import * as PageUrls from "../../configs/PagesUrl";
import {Link} from 'react-router-dom';
import SpinnerComponent from "../../components/Common/Spinner";

class ScreensUserLogin extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.isLoggedIn) {
            this.props.history.push(PageUrls.PAGE_DASHBOARD);
        }
    }

    componentDidMount() {
        document.body.classList.remove('skin-blue');
        document.body.classList.remove('sidebar-mini');
        document.body.classList.add('login-page');
    }
    componentWillUnmount() {
        document.body.classList.add('skin-blue');
        document.body.classList.add('sidebar-mini');
        document.body.classList.remove('login-page');
    }
    doLogin(event) {
        event.preventDefault();
        this.props.authorize(this.props.payload);
    }

    changeUsername(event) {
        this.props.updateParam({
            ...this.props.payload,
            username: event.target.value
        });
    }

    changePassword(event) {
        this.props.updateParam({
            ...this.props.payload,
            password: event.target.value
        });
    }

    render() {

        const messages = this.props.languageSwitcher.languageMessages;
        //const locale = this.props.languageSwitcher.language.locale;

        return (
            <div className="login-box">
                <div className="login-logo">
                    <Link to="#"><b className="mr-10 login-title">Vi tinh Duc Vy</b> CMS</Link>
                </div>
                <div className="login-box-body">
                    <p className="login-box-msg">{messages['login.title']}</p>
                    <form onSubmit={this.doLogin.bind(this)}>
                        <div className="form-group has-feedback">
                            <span className="fa fa-user form-control-feedback feedback-left"></span>
                            <input type="text" className="form-control form-control-left" placeholder={messages['login.username']}
                                   onChange={this.changeUsername.bind(this)} />
                        </div>
                        <div className="form-group has-feedback">
                            <span className="fa fa-lock form-control-feedback feedback-left"></span>
                            <input type="password" className="form-control form-control-left" placeholder={messages['login.password']}
                                   onChange={this.changePassword.bind(this)}
                            />
                        </div>
                        <div className="row">
                            <div className="col-6 offset-6">
                                <button type="submit" className="btn btn-primary btn-block btn-flat" >{messages['login.login']}</button>
                            </div>
                        </div>
                    </form>
                </div>
                <SpinnerComponent show={this.props.layoutReducer.isCallingApi}> </SpinnerComponent>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    ...state.authReducer,
    ...state
  });

export default withRouter(connect(mapStateToProps,actions)(ScreensUserLogin));
