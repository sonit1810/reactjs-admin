import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { Dropdown } from 'react-bootstrap'

class HeaderTest extends React.Component {
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
    render() {
        const messages = this.props.languageSwitcher.languageMessages;

        return (
            <header className="main-header">
                <Link to="/" className="logo">
                    <span className="logo-mini"><b>{messages['layout.logo.name']}</b></span>
                    <span className="logo-lg"><b>{messages['layout.logo.name']}</b></span>
                </Link>
                <nav className="navbar navbar-static-top p-0">
                    <Link to="#" className="sidebar-toggle" data-toggle="push-menu" role="button"
                        onClick={this.toggle}
                    >
                        <span className="sr-only">Toggle navigation</span>
                    </Link>
                    <Dropdown alignRight>
                        <Dropdown.Toggle id="dropdown-user-custom">
                            <i className="fa fa-cog mr-md-2"></i>
                            <span className="d-none d-md-inline-block">サービサ名</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="1" tag={Link} to="#">{messages['layout.link.changePassword']}</Dropdown.Item>
                            <Dropdown.Item eventKey="2" tag={Link} to="#">{messages['layout.link.2StepAuthenticationSetting']}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </nav>
            </header>
            // <header className="main-header">
            //     <Link to="/" className="logo">
            //         <span className="logo-mini"><b>{messages['layout.logo.name']}</b></span>
            //         <span className="logo-lg"><b>{messages['layout.logo.name']}</b></span>
            //     </Link>
            //     <nav className="navbar navbar-static-top" style={{zIndex: -1}}>
            //         <Link href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
            //             <span className="sr-only">Toggle navigation</span>
            //         </Link>

            //         <div className="navbar-custom-menu">
            //             <ul className="nav navbar-nav">
            //                 <li className="dropdown user user-menu">
            //                     <Link to="#" className="dropdown-toggle" data-toggle="dropdown">
            //                         <i className="fa fa-cog"></i>
            //                         <span className="hidden-xs">サービサ名</span>
            //                     </Link>
            //                     <ul className="dropdown-menu">
            //                         <li className="user-footer">
            //                             <ul>
            //                                 <li><Link to="#">{messages['layout.link.changePassword']}</Link></li>
            //                                 <li><Link to="#">{messages['layout.link.2StepAuthenticationSetting']}</Link></li>
            //                             </ul>
            //                         </li>
            //                     </ul>
            //                 </li>
            //             </ul>
            //         </div>
            //     </nav>
            // </header>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state,
});

export default withRouter(connect(mapStateToProps)(HeaderTest));