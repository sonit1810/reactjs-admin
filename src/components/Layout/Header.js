import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {connect} from "react-redux";
import authActions from "../../redux/auth/action";
import {Dropdown, Spinner} from "react-bootstrap";
import {PAGE_USER_LIST} from "../../configs/PagesUrl";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            classCollaps: ''
        };
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
        this.handleResize();
    };

    handleResize = e => {
        const windowSize = window.innerWidth;
        const classCollaps = (windowSize > 767) ? 'sidebar-collapse' : 'sidebar-open';
        this.setState({
            classCollaps: classCollaps
        });
    };

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
        window.addEventListener("load", this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
        window.removeEventListener("load", this.handleResize);
    }

    componentDidUpdate() {
        if (this.state.collapsed) {
            if (this.state.classCollaps !== '') {
                document.body.classList.add(this.state.classCollaps);
            }
        } else {
            if (this.state.classCollaps !== '') {
                document.body.classList.remove(this.state.classCollaps);
            }
        }
    }

    doLogout() {
        this.props.logout();
    }

    gotoChangePassword() {
        this.props.history.push(PAGE_USER_LIST);
    }

    render() {
        const messages = this.props.languageSwitcher.languageMessages;

        return (
            <header className="main-header">
                <Link to="/" className="logo">
                    <span className="logo-mini"><b>{messages['layout.logo.name']}</b></span>
                    <span className="logo-lg"><b>{messages['layout.logo.name']}</b></span>
                </Link>
                <nav className="navbar navbar-static-top p-0" style={{zIndex: -1}}>
                    <Link to={'#'} href="#" className="sidebar-toggle" data-toggle="push-menu" role="button"
                          onClick={this.toggle} >
                        <span className="sr-only">Toggle navigation</span>
                    </Link>
                    <Dropdown alignRight>
                        { this.props.isCallingApi ?
                            <Spinner animation="border" variant="danger" size="sm" />
                            : ''}
                        <Dropdown.Toggle id="dropdown-user-custom">
                            <i className="fa fa-cog mr-md-2"> </i>
                            <span className="d-none d-md-inline-block">{this.props.authReducer.userInfo.name}({this.props.authReducer.userInfo.email})</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="1" tag={Link} to={'#'} onClick={this.gotoChangePassword.bind(this)}>{messages['layout.link.changePassword']}</Dropdown.Item>
                            {/*<Dropdown.Item eventKey="2" tag={Link} to="#">{messages['layout.link.2StepAuthenticationSetting']}</Dropdown.Item>*/}
                            <Dropdown.Item eventKey="3" tag={Link} to="#" onClick={this.doLogout.bind(this)}>{messages['layout.link.logout']}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </nav>
            </header>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.layoutReducer,
    ...state
});

export default withRouter(connect(mapStateToProps, authActions)(Header));
