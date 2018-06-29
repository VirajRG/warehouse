import React, { Component } from 'react'
import { Row, Col, Icon, Button, Layout, message, List, Avatar } from 'antd';
const { Header, Content } = Layout;

const IconText = ({ type, color, quantity }) => {
  // let itemCount = 0;
  // items.forEach(item => {
  //   if(item.binName === bin) itemCount++;
  // });

  return (
    <span style={{ fontSize: 20 }}>
      <Icon type={type} style={{ marginRight: 8, color: color, fontSize: 20 }} />
      {quantity}
    </span>
  );
}

export default class PickList extends Component {
  render() {

    const currentPickList = this.props.match.params.pickListNo;
    const currentBinName = this.props.match.params.binName;
    let totalItems = 0;
    let scanLeft = 0;

    let currentData = this.props.items.filter(item => {
      const currentItem =
        item.pickListNo == currentPickList && item.binName === currentBinName && (item.quantityLeft > 0);
      if (currentItem) {
        scanLeft += item.quantityLeft;
        totalItems += item.quantity;
      }
      return currentItem
    });
    console.log(currentData, currentPickList, currentBinName);

    return (
      <div className="pick-list-page">
        <Header className="header">
          <span>Scan Items</span>
        </Header>
        <Content className="content">
          <Row>
            <Col className="col" xs={{ span: 12, offset: 6 }}>
              <Row>
                <Col xs={{ span: 12 }}>
                  <h2>Picklist No: <span style={{color: "#909090", fontSize: '32px'}}>{currentPickList}</span></h2>
                  <h2>Bin Name: <span style={{color: "#909090", fontSize: '32px'}}>{currentBinName}</span></h2>
                </Col>
                <Col xs={{ span: 12 }}>
              <span className="icon" style={{ display: "block", textAlign: "end" }}>
                <Button onClick={this.createList}>
                  Next
                  <Icon type="right" />
                </Button>
              </span>
                </Col>
              </Row>
              <h2>
                All: <span style={{ color: 'blue', fontSize: '32px', paddingRight: '64px' }}>{totalItems} </span>
                Scanned: <span style={{ color: '#87d068', fontSize: '32px', paddingRight: '64px' }}>{totalItems - scanLeft}</span>
                Pending: <span style={{ color: 'red', fontSize: '32px', paddingRight: '64px' }}>{scanLeft} </span>
              </h2>
              <List
                itemLayout="horizontal"
                dataSource={currentData}
                renderItem={item => (
                  <List.Item
                    key={item.PickList + item.binName}
                    actions={[<IconText type="barcode" color="black" quantity={item.quantityLeft} />,
                    <IconText type="check-circle" color="#87d068" quantity={item.quantity - item.quantityLeft} />]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar icon="form" />}
                      title={<span >{item.barcode}</span>}
                      description={<span>{"Style No: " + item.style + "  ,  Color: " + item.color + " ,  Size: " + item.size}</span>}
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
