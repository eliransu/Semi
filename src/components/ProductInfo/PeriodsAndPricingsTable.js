import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Table, Divider, Tag} from 'antd';


const columns = [{
    title: 'Period',
    dataIndex: 'period',
    key: 'period',
}, {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
}];


export class PeriodsAndPricingsTable extends Component {

    render(){
        return(
            <Table columns={columns} dataSource={this.props.data} pagination={false} style={{width: "500px", border: "1px solid #dcd6d6",margin: "auto" }}/>
        )
    }
}

export default PeriodsAndPricingsTable