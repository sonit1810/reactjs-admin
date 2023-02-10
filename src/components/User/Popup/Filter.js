import React from 'react';
import { connect } from "react-redux";
import actions from "../../../redux/user/action";
import moment from 'moment';
import { DatePicker } from 'antd';
import { Icon } from 'antd';
import { Modal } from 'react-bootstrap';

const { RangePicker } = DatePicker;

function onChange(value, dateString) {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
}

class Filter extends React.Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    handleChangeParamsInternal(event) {
        const key = event.target.name;
        const value = event.target.value;

        this.props.updateFilter({
            ...this.props.filter,
            [key]: value
        });
    }

    handleDiscardsFilterButton() {
        this.props.onApplyFilter({
            username: '',
            user_group: '',
            drm: ''
        });
    }

    handleApplyFilterButton() {
        this.props.onApplyFilter({});
    }

    render() {
        const lang = this.props.languageSwitcher.languageMessages;

        return (
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={this.props.show}
                onHide={this.props.closePopup}
                className="popup_inner popup_inner_filter"
            >
                <Modal.Header closeButton className="box-header-filter">
                    <Modal.Title id="contained-modal-title-vcenter" className="box-title-filter">
                        Filter Params
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal">
                        <div className="form-group row">
                            <label htmlFor="user" className="col-md-3 control-label">Search 1</label>
                            <div className="col-md-9">
                                <input type="text" className="form-control "
                                    onChange={this.handleChangeParamsInternal.bind(this)}
                                       id="user" name="username" placeholder="Enter any chars to search" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="user_group" className="col-sm-3 control-label">Type</label>
                            <div className="col-sm-9">
                                <select className="form-control" id="user_group" name="user_group" onChange={this.handleChangeParamsInternal.bind(this)}>
                                    <option value="">Choose</option>
                                    <option value="master">Sample 1</option>
                                    <option value="dev">Sample 2</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="" className="col-sm-3 control-label">Notified at</label>
                            <div className="col-sm-9 text noti-preset-edit-datepicker">
                                <RangePicker
                                    ranges={{
                                        Today: [moment(), moment()],
                                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                                    }}
                                    showTime
                                    format="YYYY/MM/DD HH:mm:ss"
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={this.handleDiscardsFilterButton.bind(this)} type="button" className="btn btn-secondary">
                        <i className="fa fa-times mr-1"> </i>
                        {lang['layout.button.discardFilter']}
                    </button>
                    <button type="button" className="btn btn-primary ml-1" onClick={this.handleApplyFilterButton.bind(this)}>
                        <i className="fa fa-check mr-1"> </i>
                        {lang['layout.button.applyFilter']}
                    </button>
                </Modal.Footer>
            </Modal>
        )
    }
}
const mapStateToProps = (state) => ({
    ...state,
});

export default connect(mapStateToProps, actions)(Filter);