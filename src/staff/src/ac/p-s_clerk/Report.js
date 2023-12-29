import React from "react";
import {Button, Divider, Spin, Table, Typography} from "antd";

class Report extends React.Component {

    state = {
        data: null
    }

    componentDidMount() {
        this.setState({
            //fake data
            data: [
                {
                    key: '1',
                    'fail': '2'
                },
                {
                    key: '2',
                    'success': '2',
                }
            ]
        })
    }

    render() {
        const columns1 = [
            {
                title: 'Success',
                dataIndex: 'success',
                key: 'success',
                width: '70%'
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Button type="primary" onClick={() => {
                        console.log('view')
                    }}>View</Button>
                ),
            }
        ]
        const columns2 = [
            {
                title: 'Fail',
                dataIndex: 'fail',
                key: 'fail',
                width: '70%'
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Button type="primary" onClick={() => {
                        console.log('view')
                    }}>View</Button>
                ),
            }
        ]
        return (
            <div>
                <Typography.Title level={3}>Thống kê</Typography.Title>
                <Spin spinning={this.state.data === null}>
                    <Table
                        dataSource={this.state.data != null ? this.state.data.filter((item, index) => 'fail' in item) : []}
                        columns={columns1}
                        rowKey={record => record.id}
                        pagination={true}
                    />
                    <Divider/>
                    <Table
                        dataSource={this.state.data != null ? this.state.data.filter((item, index) => 'success' in item) : []}
                        columns={columns2}
                        rowKey={record => record.id}
                        pagination={true}
                    />
                </Spin>
            </div>
        );
    }
}

export default Report;