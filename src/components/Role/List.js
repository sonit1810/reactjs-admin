import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import actions from '../../redux/role/action';
import {withRouter} from 'react-router-dom';
import Paginator from "../../common/Paginator";
import Filter from "./Popup/Filter";
import {Table} from 'react-bootstrap';
import {PAGE_ROLE_LIST} from "../../configs/PagesUrl";

class RoleList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showPopupFilter: false,
        };
        this.onChangePageNumber = this.handlePaging.bind(this);
        this.onChangeItemPerPage = this.handleItemPerPage.bind(this);
        this.onApplyFilter = this.handleFilter.bind(this);
    }

    togglePopupFilter() {
        this.setState({
            showPopupFilter: !this.state.showPopupFilter
        });
    }

    componentDidMount() {
        this.props.getList({
            ...this.props.filter
        });
    }

    async handlePaging(pageNumber) {
        //update filter first, so paging number can changed
        await this.props.updateFilter({
            ...this.props.filter,
            page: pageNumber
        });
        await this.getList();
    }

    async handleItemPerPage(itemPerPage) {
        //update filter first, so paging number can changed
        //change item per page must reset page to 1
        await this.props.updateFilter({
            ...this.props.filter,
            per_page: itemPerPage,
            page: 1
        });
        await this.getList();
    }

    async handleFilter(params) {
        this.setState({showPopupFilter: false}, async () => {
            //update filter first, so paging number can changed
            //change item per page must reset page to 1
            await this.props.updateFilter({
                ...this.props.filter,
                ...params,
                page: 1
            });
            await this.getList();
        });
    }

    getList() {
        this.props.getList(this.props.filter);
    }


    renderList(listData) {
        if (listData === undefined || listData.items === undefined) return;
        console.log(listData.items);

        return listData.items.map((row) => {
            return (
                <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.guard_name}</td>
                    <td className="text-nowrap text-center">
                        {/*<span className="action-link ml-1">*/}
                        {/*    <Link to={PAGE_ROOM_FACILITY_EDIT + '/' + row.id} className="btn btn-sm btn-success">*/}
                        {/*        <i className="fa fa-pencil"> </i>*/}
                        {/*    </Link>*/}
                        {/*</span>*/}
                        {/*<span className="action-link ml-1">*/}
                        {/*    <Link to={PAGE_ROOM_FACILITY_DELETE+ '/' + row.id} className="btn btn-sm btn-danger">*/}
                        {/*        <i className="fa fa-trash"> </i>*/}
                        {/*    </Link>*/}
                        {/*</span>*/}
                    </td>
                </tr>
            );
        });
    }

    render() {
        const messages = this.props.languageSwitcher.languageMessages;

        return (


            <div className="box">
                <div className="box-header with-border">
                    <h3 className="box-title">{messages['role.list.title']}</h3>
                    <div className="float-md-right mt-2 mt-md-0">
                        {/*<button type="button" className="btn btn-secondary btn-sm ml-1"*/}
                        {/*        >{messages['layout.button.export']}*/}
                        {/*</button>*/}
                        {/*<Link to={PAGE_ROOM_FACILITY_ADD}>*/}
                        {/*    <button type="button"*/}
                        {/*            className="btn btn-primary btn-sm ml-1">{messages['layout.button.register']}</button>*/}
                        {/*</Link>*/}
                    </div>
                </div>
                <div className="box-body">
                    <div className="datatable_container">
                        <Paginator
                            total={this.props.listData.total}
                            itemPerPage={this.props.filter.per_page}
                            currentPage={this.props.filter.page}
                            onChangePageNumber={this.onChangePageNumber}
                            onChangeItemPerPage={this.onChangeItemPerPage}
                            onTogglePopupFilter={this.togglePopupFilter.bind(this)}
                            filterData={this.props.filter}
                        />
                        <div className="row m-0 my-2">
                            <div className="col-sm-12 p-0">
                                <Table bordered hover responsive size="sm"
                                       className="table-custom mb-0">
                                    <thead>
                                    <tr>
                                        <th>Tên</th>
                                        <th>Guard</th>
                                        <th style={{width: '100px'}} rowSpan={2}>{messages['layout.column.action']}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.renderList(this.props.listData)}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        <div className="block-paging-bottom">
                            <Paginator
                                total={this.props.listData.total}
                                itemPerPage={this.props.filter.per_page}
                                currentPage={this.props.filter.page}
                                onChangePageNumber={this.onChangePageNumber}
                                onChangeItemPerPage={this.onChangeItemPerPage}
                                filterData={this.props.filter}
                            />
                        </div>
                    </div>
                </div>
                {this.state.showPopupFilter ?
                    <Filter
                        show={this.state.showPopupFilter}
                        closePopup={this.togglePopupFilter.bind(this)}
                        onApplyFilter={this.onApplyFilter}
                    />
                    : null
                }
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    ...state.roleReducer,
    ...state
});

export default withRouter(connect(mapStateToProps, actions)(RoleList));
