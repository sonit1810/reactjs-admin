import React from 'react';
class ScreensPageDetail extends React.Component {
    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Detail Page
                    </h1>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-primary">
                                <form className="form-horizontal">
                                <div className="box-body">
                                    <div className="form-group row">
                                        <label htmlFor="user_group" className="col-sm-3 col-md-2 control-label">Group</label>
                                        <div className="col-sm-9 col-md-9 col-lg-8">
                                            <select className="form-control" id="cat_group" name="group">
                                                <option value="food">Food</option>
                                                <option value="drink">Drink</option>
                                                <option value="new">New</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="" className="col-sm-2 col-md-2 control-label">Tên</label>
                                        <div className="col-sm-2 col-md-2 col-lg-2">
                                            <select className="form-control" id="cat_group" name="group">
                                                <option value="food">VN</option>
                                                <option value="drink">JP</option>
                                                <option value="new">EN</option>
                                            </select>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <input type="text" className="form-control" id="cat_name" name="name" placeholder="" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="" className="col-sm-2 col-md-2 control-label">Mô tả chi tiết</label>
                                        <div className="col-sm-2 col-md-2 col-lg-2">
                                            <select className="form-control" id="cat_group" name="group">
                                                <option value="food">VN</option>
                                                <option value="drink">JP</option>
                                                <option value="new">EN</option>
                                            </select>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <input type="text" className="form-control" id="cate_desc" name="description" placeholder="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="box-footer text-center">
                                    <button type="button" className="btn btn-secondary">Cancel</button>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default ScreensPageDetail;