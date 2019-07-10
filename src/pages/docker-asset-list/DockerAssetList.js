import React from 'react';
import { Card, Row, Col, Table, Tag, Divider, Button } from 'antd';
import './DockerAssetList.css';

const ButtonGroup = Button.Group;

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <span>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </span>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
                <a href="javascript:;">Invite {record.name}</a>
                <Divider type="vertical" />
                <a href="javascript:;">Delete</a>
            </span>
        ),
    },
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '4',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '5',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '6',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '7',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '8',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '9',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '10',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '11',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '12',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    }
];

const pagination = {
    defaultPageSize: 5
};

function StatusTip(props) {
    return (
        <div className="tip">
            <span>{props.title}</span>
            <p>{props.value}</p>
        </div>
    )
}

class DockerAssetList extends React.Component {
    render() {
        const onlineTip = StatusTip({ title: '在线数量', value: 100 });
        const offlineTip = StatusTip({ title: '离线数量', value: 100 });
        const syncDateTip = StatusTip({ title: '同步时间', value: new Date().toLocaleString() });
        return (
            <div>
                <div className="container-header">
                    <Row type="flex">
                        <Col span={8}>
                            <Card bordered={false}>
                                {onlineTip}
                            </Card>
                            <em></em>
                        </Col>
                        <Col span={8}>
                            <Card bordered={false}>
                                {offlineTip}
                            </Card>
                            <em></em>
                        </Col>
                        <Col span={8}>
                            <Card bordered={false}>
                                {syncDateTip}
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div className="container-body">
                    <Card bordered={false} >
                        <Row>
                            <Col span={24}>
                                <Card
                                    size="small"
                                    bordered={false}
                                    extra={
                                        <ButtonGroup>
                                            <Button type="primary">新增</Button>
                                        </ButtonGroup>
                                    }
                                >
                                    <Table pagination={pagination} columns={columns} dataSource={data} />
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>

        )
    }
}

export default DockerAssetList;