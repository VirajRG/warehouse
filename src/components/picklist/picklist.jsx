import React, { Component } from 'react'
import { Row, Col, Icon, Button, Layout, message, List, Avatar } from 'antd';
const { Header, Content } = Layout;

export default class PickList extends Component {
  render() {

    const data = [
      {
        title: 'Ant Design Title 1',
      },
      {
        title: 'Ant Design Title 2',
      },
      {
        title: 'Ant Design Title 3',
      },
      {
        title: 'Ant Design Title 4',
      },
    ];

    return (
      <div className="pick-list-page">
        <Header className="header">
          <span>Scan Items</span>
          {/* <span className="icon"><Icon type="search" /></span> */}
        </Header>
        <Content className="content">
          <Row>
            <Col className="col" xs={{ span: 16, offset: 4 }}>
              <h3>List :</h3>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon="search" />}
                      title={<a href="https://ant.design">{item.title}</a>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </Content>
      </div>
    )
  }
}
