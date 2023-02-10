import React from 'react';
import { connect } from "react-redux";
import { Modal } from 'react-bootstrap';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.handleApplyFilterButton = this.applyFilter.bind(this);
        this.handleDiscardsFilterButton = this.discardFilter.bind(this);
        this.changeSearchText = this.changeSearchTextFunc.bind(this);
        this.changeHot = this.changeHotFunc.bind(this);

        //need same param name in reducer.filter which we want override
        this.state = {
            ...this.props.filter
        };
    }
    applyFilter() {
        //simple clone value of state pass back to parent callback
        this.props.onApplyFilter({...this.state});
    }
    discardFilter() {
        //discard meaning reset all state params
        this.setState({ s: ''}, () => {
            //simple clone value of state pass back to parent callback
            this.props.onApplyFilter({...this.state});
        })
    }
    changeSearchTextFunc(e) {
        this.setState({ s: e.target.value});
    }
    changeHotFunc(e) {
        this.setState({ hot: e.target.value});
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
                        {lang['layout.title.filterList']}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal">
                        <div className="form-group row">
                            <label htmlFor="user" className="col-md-3 control-label">Tìm theo tên</label>
                            <div className="col-md-9">
                                <input type="text" className="form-control"
                                       value={this.state.s}
                                       onChange={this.changeSearchText}
                                       id="s" name="s" placeholder="gõ tên bất kỳ để tìm" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="group_id" className="col-md-3 control-label">Vị trí hiển thị</label>
                            <div className="col-md-9">
                                <select className="form-control"
                                        onChange={this.changeHot}
                                        value={this.state.hot}>
                                    <option value="">{lang['common.select.default']}</option>
                                    <option value="1">Hiển thị bên trái</option>
                                    <option value="0">Hiển thị ở menu Sản phẩm</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={this.handleDiscardsFilterButton} >
                        <i className="fa fa-times mr-1"> </i>
                        {lang['layout.button.discardFilter']}
                    </button>
                    <button type="button" className="btn btn-primary ml-1" onClick={this.handleApplyFilterButton} >
                        <i className="fa fa-check mr-1"> </i>
                        {lang['layout.button.applyFilter']}
                    </button>
                </Modal.Footer>
            </Modal>
        )
    }
}
const mapStateToProps = (state) => ({
    ...state.roomTypeReducer,
    ...state,
});

export default connect(mapStateToProps, {})(Filter);
