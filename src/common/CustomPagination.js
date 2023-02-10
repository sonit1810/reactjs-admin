import React from 'react';
import { Pagination } from 'antd';
import siteConfig from "../configs/siteConfig";

class CustomPagination extends Pagination {
    constructor(props) {
        super(props);
        this.onShowSizeChange = this.onShowSizeChange.bind(this);
    }

    onShowSizeChange(current, pageSize) {
        this.props.onChange(current);
    }

    render() {
        return (
            <Pagination
                defaultCurrent={1}
                defaultPageSize={siteConfig.defaultItemPerPage}
                current={this.props.currentPage}
                total={this.props.total}
                pageSize={this.props.itemPerPage}
                showLessItems={true}
                onChange={this.onShowSizeChange}
            />
        );
    }
}

export default CustomPagination;