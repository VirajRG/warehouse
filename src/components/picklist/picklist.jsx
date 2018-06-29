import React, { Component } from 'react'
import { Row, Col, Icon, Button, Layout, message, List, Avatar } from 'antd';
const { Header, Content } = Layout;

const IconText = ({ items, bin }) => {
  let itemCount = 0;
  items.forEach(item => {
    if(item.binName === bin) itemCount++;
  });
  
  return(
  <span>
    <Icon type="scan" style={{ marginRight: 8 }} />
    {itemCount}
  </span>
);
}

export default class PickList extends Component {
  render() {


    return (
      <div className="pick-list-page">
        <Header className="header">
          <span>Scan Items</span>
          {/* <span className="icon"><Icon type="search" /></span> */}
        </Header>
        <Content className="content">
          <Row>
            <Col className="col" xs={{ span: 16, offset: 4 }}>
              <h1>Bins :</h1>
              <List
                itemLayout="horizontal"
                dataSource={this.props.bins}
                renderItem={item => (
                  <List.Item
                    key={item}
                    actions={[<IconText bin={item} items={this.props.items} />]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar icon="shopping-cart" />}
                      title={<a href="#">{item}</a>}
                    // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
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
