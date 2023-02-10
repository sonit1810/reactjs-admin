import React from 'react';
import { connect } from "react-redux";
import { Modal } from 'react-bootstrap';
import actions from '../../../redux/room/action';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.handleApplyFilterButton = this.applyFilter.bind(this);
        this.handleDiscardsFilterButton = this.discardFilter.bind(this);
        this.changeSearchText = this.changeSearchTextFunc.bind(this);
        this.changeGroup = this.changeGroupFunc.bind(this);
        this.changeStatus = this.changeStatusFunc.bind(this);

        //need same param name in reducer.filter which we want override
        this.state = {
            ...this.props.filter,
            room_type_id: this.props.filter.room_type_id
        };
    }
    applyFilter() {
        //simple clone value of state pass back to parent callback
        this.props.onApplyFilter({...this.state});
    }
    discardFilter() {
        //discard meaning reset all state params
        this.setState({ s: '', room_type_id: 0}, () => {
            //simple clone value of state pass back to parent callback
            this.props.onApplyFilter({...this.state});
        })
    }
    changeSearchTextFunc(e) {
        this.setState({ s: e.target.value});
    }
    changeGroupFunc(e) {
        this.setState({ room_type_id: e.target.value});
    }
    changeStatusFunc(e) {
        this.setState({ status: e.target.value});
    }
    componentDidMount() {
        this.props.getListRoomType();
    }

    render() {

        const lang = this.props.languageSwitcher.languageMessages;
        const { listRoomType } = this.props;

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
                            <label htmlFor="user" className="col-md-3 control-label">Tìm</label>
                            <div className="col-md-9">
                                <input type="text" className="form-control"
                                       value={this.state.s}
                                       onChange={this.changeSearchText}
                                       id="s" name="s" placeholder="Gõ tên để tìm" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="group_id" className="col-md-3 control-label">Danh mục</label>
                            <div className="col-md-9">
                                <select className="form-control"
                                        onChange={this.changeGroup}
                                        value={this.state.room_type_id}>
                                    <option value="0">{lang['common.select.default']}</option>
                                    {listRoomType.map(d => (
                                        <option key={d.id} value={d.id}>{d.name.vi} - {d.name.en} </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="group_id" className="col-md-3 control-label">Trạng thái</label>
                            <div className="col-md-9">
                                <select className="form-control"
                                        onChange={this.changeStatus}
                                        value={this.state.status}>
                                    <option value="">{lang['common.select.default']}</option>
                                    <option value="1">Hiển thị</option>
                                    <option value="0">Ẩn</option>
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
    ...state.roomReducer,
    ...state,
});

export default connect(mapStateToProps, actions)(Filter);
