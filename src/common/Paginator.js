import React from 'react';
import { connect } from "react-redux";
import actions from "../redux/user/action";
import siteConfig from "../configs/siteConfig";
import { Pagination } from "antd";
import { Icon } from 'antd';

class Paginator extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeItemPerpageInternal = this.onChangeItemPerPageInternalFunc.bind(this);
        this.onChangePageNumberInternal = this.onChangePageNumberInternalFunc.bind(this);
        this.onTogglePopupFilter = this.onTogglePopupFilterFunc.bind(this);
        this.onTypingSearch = this.onTypingSearch.bind(this);
    }

    onChangeItemPerPageInternalFunc(event) {
        this.props.onChangeItemPerPage(parseInt(event.target.value));
    }

    onChangePageNumberInternalFunc(current, pageSize) {
        this.props.onChangePageNumber(current);
    }

    onTogglePopupFilterFunc() {
        this.props.onTogglePopupFilter();
    }
    onTypingSearch(e) {
        this.props.onTypingSearch(e);
    }
    
    render() {
        const messages = this.props.languageSwitcher.languageMessages;
        const { filterData } = this.props;

        const filterDataCheck = {...filterData};
        const filterStyle = {};
        if (filterData !== undefined) {
            //remove default params
            delete filterDataCheck.page;
            delete filterDataCheck.items_per_page;
            delete filterDataCheck.per_page;
            delete filterDataCheck.sort;
            delete filterDataCheck.sort_by_column;
            delete filterDataCheck.searchText;
            let hasFilterData = false;
            Object.entries(filterDataCheck).forEach(([key,value]) => {
                if (value !== '' && value !== 0) {
                    hasFilterData = true;
                }
            });
            if (hasFilterData) {
                filterStyle.color = 'red';
            }
        }

        return (
            <div className="row m-0">
                <div className="col-md-2 p-0 pr-md-2">
                    <div className="dataTables_length">
                        <label className="mb-0">
                            <select name="datatable_length" className="form-control form-control-sm d-inline-block" value={this.props.itemPerPage}
                                onChange={this.onChangeItemPerpageInternal}>
                                <option value="15">15</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="999999999999">All</option>
                            </select>
                            &nbsp;{messages['layout.filter.rowDisplay']}
                        </label>
                    </div>
                </div>
                <div className="col-md-4 p-0 pr-md-2">
                    <input placeholder={messages['layout.filter.find']}
                           className="form-control"
                           autoComplete="off"
                           type="search"
                           value={filterData.searchText}
                           onChange={(e) => this.onTypingSearch(e)}
                    />
                </div>
                <div className="col-md-6 text-md-right p-0 pl-md-2 mt-2 mt-md-0">
                    <button onClick={this.onTogglePopupFilter} type="button" className="btn btn-secondary btn-sm btn-filter">
                        <Icon type="filter" />
                        <span style={filterStyle}  className="d-inline-block align-middle ml-1">
                            {messages['layout.list.filter']}
                        </span>
                    </button>
                    <div className="dataTables_paginate paging_simple_numbers d-inline-block align-middle ml-1" id="example1_paginate">
                        <Pagination
                            defaultCurrent={1}
                            defaultPageSize={siteConfig.defaultItemPerPage}
                            current={this.props.currentPage}
                            total={this.props.total}
                            pageSize={this.props.itemPerPage}
                            showLessItems={true}
                            onChange={this.onChangePageNumberInternal}
                            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    ...state,
});

export default connect(mapStateToProps, actions)(Paginator);