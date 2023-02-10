import React from 'react';
import * as PagesUrl from '../../configs/PagesUrl';
import { Link, withRouter, matchPath } from 'react-router-dom';
import { connect } from "react-redux";
import { Accordion } from 'react-bootstrap';
import CustomMenu from "./CustomMenu";
import {isAdmin, isSuper} from "../../helpers/Ultis";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCheck : true
        };
        this.handleCheck = this.handleCheck.bind(this);
    }

    matchPathCustom(path, pathCheck) {
        return matchPath(path, pathCheck);
    }

    componentWillMount() {
        // if(this.matchPathCustom(this.props.location.pathname, { path: PagesUrl.PAGE_HIERARCHICAL_SITE_SELECT, exact: true }) ) {
        //     this.setState({
        //         isCheck : false
        //     });
        // }
    }

    handleCheck(e) {
        if(e.currentTarget.dataset.check) {
            this.setState({
                isCheck : true
            });
        } else {
            this.setState({
                isCheck : false
            });
        }
    }

    render() {
        const messages = this.props.languageSwitcher.languageMessages;
        if (!isSuper(this.props.authReducer.userInfo.roles) && !isAdmin(this.props.authReducer.userInfo.roles)) {
            return (
                <React.Fragment>
                    403 Forbidden
                </React.Fragment>
            )
        }

        return (
            <Accordion defaultActiveKey="0">
                <aside className="main-sidebar">
                    <section className="sidebar">
                        <ul className="sidebar-menu" data-widget="tree">
                            <li className="header"> </li>
                            <li onClick={this.handleCheck} className={this.matchPathCustom(this.props.location.pathname, { path: PagesUrl.PAGE_DASHBOARD }) ? 'active' : ''}>
                                <Link to={PagesUrl.PAGE_DASHBOARD}>
                                    <i className="fa fa-dashboard"> </i>
                                    <span>{messages['layout.sidebar.dashboard']}</span>
                                </Link>
                            </li>
                            {/*<li className="treeview">*/}
                                {/*<CustomMenu eventKey="1" url="#" hasChild={true} >*/}
                                    {/*<i className="fa fa-clone"> </i>*/}
                                    {/*<span>Manage Menu</span>*/}
                                {/*</CustomMenu>*/}
                                {/*<Accordion.Collapse eventKey="1">*/}
                                    {/*<ul className="treeview-menu">*/}
                                        {/*<li>*/}
                                            {/*<Link to={PagesUrl.PAGE_MENU_CATEGORIES}>*/}
                                                {/*<i className="fa fa-address-book"> </i>*/}
                                                {/*<span>Menu</span>*/}
                                            {/*</Link>*/}
                                        {/*</li>*/}
                                    {/*</ul>*/}
                                {/*</Accordion.Collapse>*/}
                            {/*</li>*/}
                            <li className="treeview">
                                <CustomMenu eventKey="2" url="#" hasChild={true} >
                                    <i className="fa fa-database"> </i>
                                    <span>Quản lý</span>
                                </CustomMenu>
                                <Accordion.Collapse eventKey="2">
                                    <ul className="treeview-menu">
                                        <li onClick={this.handleCheck} className={this.matchPathCustom(this.props.location.pathname, { path: PagesUrl.PAGE_ROOM_LIST }) ? 'active' : ''}>
                                            <Link to={PagesUrl.PAGE_ROOM_LIST}>
                                                <i className="fa fa-microchip"> </i>
                                                <span>Sản phẩm</span>
                                            </Link>
                                        </li>
                                        <li onClick={this.handleCheck} className={this.matchPathCustom(this.props.location.pathname, { path: PagesUrl.PAGE_ROOM_TYPE_LIST }) ? 'active' : ''}>
                                            <Link to={PagesUrl.PAGE_ROOM_TYPE_LIST}>
                                                <i className="fa fa-folder"> </i>
                                                <span>Danh mục</span>
                                            </Link>
                                        </li>
                                        {/*<li onClick={this.handleCheck} className={this.matchPathCustom(this.props.location.pathname, { path: PagesUrl.PAGE_ROOM_FACILITY_LIST }) ? 'active' : ''}>*/}
                                            {/*<Link to={PagesUrl.PAGE_ROOM_FACILITY_LIST}>*/}
                                                {/*<i className="fa fa-flask"> </i>*/}
                                                {/*<span>Room Facilities</span>*/}
                                            {/*</Link>*/}
                                        {/*</li>*/}
                                    </ul>
                                </Accordion.Collapse>
                            </li>
                            {/*<li className="treeview">*/}
                                {/*<CustomMenu eventKey="3" url="#" hasChild={true} >*/}
                                    {/*<i className="fa fa-credit-card"> </i>*/}
                                    {/*<span>Manage Promotion</span>*/}
                                {/*</CustomMenu>*/}
                                {/*<Accordion.Collapse eventKey="3">*/}
                                    {/*<ul className="treeview-menu">*/}
                                        {/*<li onClick={this.handleCheck} className={this.matchPathCustom(this.props.location.pathname, { path: PagesUrl.PAGE_PROMOTION_LIST }) ? 'active' : ''}>*/}
                                            {/*<Link to={PagesUrl.PAGE_PROMOTION_LIST}>*/}
                                                {/*<i className="fa fa-address-book"> </i>*/}
                                                {/*<span>Promotion</span>*/}
                                            {/*</Link>*/}
                                        {/*</li>*/}
                                    {/*</ul>*/}
                                {/*</Accordion.Collapse>*/}
                            {/*</li>*/}
                            <li className="treeview">
                                <CustomMenu eventKey="7" url="#" hasChild={true} >
                                    <i className="fa fa-credit-card"> </i>
                                    <span>Hình ảnh</span>
                                </CustomMenu>
                                <Accordion.Collapse eventKey="7">
                                    <ul className="treeview-menu">
                                        <li onClick={this.handleCheck} className={this.matchPathCustom(this.props.location.pathname, { path: PagesUrl.PAGE_HOMEPAGE_GALLERY_LIST }) ? 'active' : ''}>
                                            <Link to={PagesUrl.PAGE_HOMEPAGE_GALLERY_LIST}>
                                                <i className="fa fa-image"> </i>
                                                <span>Hình slide</span>
                                            </Link>
                                        </li>
                                        <li onClick={this.handleCheck} className={this.matchPathCustom(this.props.location.pathname, { path: PagesUrl.PAGE_GALLERY_LIST }) ? 'active' : ''}>
                                            <Link to={PagesUrl.PAGE_GALLERY_LIST}>
                                                <i className="fa fa-image"> </i>
                                                <span>Thư viện hình ảnh</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </Accordion.Collapse>
                            </li>
                            <li className="treeview">
                                <CustomMenu eventKey="8" url="#" hasChild={true} >
                                    <i className="fa fa-credit-card"> </i>
                                    <span>Thông tin</span>
                                </CustomMenu>
                                <Accordion.Collapse eventKey="8">
                                    <ul className="treeview-menu">
                                        {/*<li onClick={this.handleCheck} className={this.matchPathCustom(this.props.location.pathname, { path: PagesUrl.PAGE_SERVICE_LIST }) ? 'active' : ''}>*/}
                                            {/*<Link to={PagesUrl.PAGE_SERVICE_LIST}>*/}
                                                {/*<i className="fa fa-address-book"> </i>*/}
                                                {/*<span>Dịch vụ</span>*/}
                                            {/*</Link>*/}
                                        {/*</li>*/}
                                        <li onClick={this.handleCheck} className={this.matchPathCustom(this.props.location.pathname, { path: PagesUrl.PAGE_INFORMATION_LIST }) ? 'active' : ''}>
                                            <Link to={PagesUrl.PAGE_INFORMATION_LIST}>
                                                <i className="fa fa-address-book"> </i>
                                                <span>Báo giá</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </Accordion.Collapse>
                            </li>
                            { isSuper(this.props.authReducer.userInfo.roles) ?
                            <li className="treeview">
                                <CustomMenu eventKey="5" url="#" hasChild={true} >
                                    <i className="fa fa-users"> </i>
                                    <span>{messages['layout.sidebar.manageUserAndRole']}</span>
                                </CustomMenu>
                                <Accordion.Collapse eventKey="5">
                                    <ul className="treeview-menu">
                                        <li onClick={this.handleCheck} className={this.matchPathCustom(this.props.location.pathname, { path: PagesUrl.PAGE_USER_LIST }) ? 'active' : ''}>
                                            <Link to={PagesUrl.PAGE_USER_LIST}>
                                                <i className="fa fa-user"> </i>
                                                <span>Người dùng</span>
                                            </Link>
                                        </li>
                                        <li onClick={this.handleCheck} className={this.matchPathCustom(this.props.location.pathname, { path: PagesUrl.PAGE_ROLE_LIST }) ? 'active' : ''}>
                                            <Link to={PagesUrl.PAGE_ROLE_LIST}>
                                                <i className="fa fa-users"> </i>
                                                <span>Quyền</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </Accordion.Collapse>
                            </li> :''}
                        </ul>
                    </section>
                </aside>
            </Accordion>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state,
    ...state.layoutReducer
});

export default withRouter(connect(mapStateToProps)(Sidebar));
