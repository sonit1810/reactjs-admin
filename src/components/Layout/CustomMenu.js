import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import actions from "../../redux/layout/action";
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

class CustomMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuKey: parseInt(this.props.eventKey),
            hasChild: this.props.hasChild
        };
        this.props.setLeftMenuItem({id: this.state.menuKey, isOpen: false});
    }

    toggleAction() {
        this.props.setAllLeftMenuItemCloseExceptCurrent(this.state.menuKey);
    }

    render() {

        function CustomToggle({ children, eventKey, url, callbackToggle, isOpen }) {

            const decoratedOnClick = useAccordionToggle(eventKey, () => {
                callbackToggle();
            });

            let className = 'link-disabled';
            if (isOpen) {
                className = 'menu-active';
            }

            return (
                <Link
                    to={url}
                    onClick={decoratedOnClick}
                    className={className}
                >
                    {children}
                </Link>
            );
        }

        let isOpen = false;
        const item = this.props.leftMenuItems.filter((item) => {
            return this.state.menuKey === item.id;
        });
        if (item.length > 0) {
            isOpen = item[0].isOpen;
        }

        return (
            <CustomToggle url='#' eventKey={this.props.eventKey}
                          callbackToggle={this.toggleAction.bind(this)} isOpen={isOpen} >
                {this.props.children}
                { this.state.hasChild ?
                    <span className="pull-right-container">
                        { isOpen ?
                            <i className='fa fa-angle-down pull-right ant-menu-item-active'/>
                            : <i className='fa fa-angle-right pull-right'/> }
                    </span>
                    : ''}
            </CustomToggle>
        );

    }
}
const mapStateToProps = (state) => ({
    ...state.layoutReducer,
    ...state
});
export default connect(mapStateToProps, actions)(CustomMenu);