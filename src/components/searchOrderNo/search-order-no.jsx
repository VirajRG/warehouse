import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Icon, Button, Upload, Layout, message, Input } from 'antd';
import history from '../../history';
const { Header, Content } = Layout;

export default class SearchOrderNo extends Component {

  scanItems = () => {
    const orderNoInput = document.getElementById('orderNoInput');
    const searchOrderNo = orderNoInput.value;
    if(searchOrderNo === ""){
      message.error("Please enter an OrderNo.");
      return;
    }    

    let scanItem = this.props.items.find(item => {return(item.orderNo === searchOrderNo)});

    if (typeof scanItem === 'undefined') {
      message.error("Order No. not found");
      return;
    }

    console.log(scanItem);
    history.push("./"+scanItem.pickListNo+"/"+scanItem.binName);
  }

  render() {
    return (
      <div className="uploader-page">
        <Header className="header">
          <span>Warehouse Scanner</span>
          <Link to="/upload">
            <span className="icon"><Icon type="upload" onClick={this.props.upload} /></span>
          </Link>
          <Link to="/summary">
            <span className="icon"><Icon type="bars" onClick={this.props.upload} /></span>
          </Link>
        </Header>
        <Content className="content">
          <Row>
            <Col className="col" xs={{ span: 8, offset: 8 }}>
              <h3>Search for next Order No :</h3>
                <div>
                <Input placeholder="Order No." id="orderNoInput" style={{ marginBottom: 16}}/>
                <Button onClick={this.scanItems}>
                  Scan Items
                  <Icon type="right" />
                </Button>
                </div>
            </Col>
          </Row>
        </Content>
      </div>
    )
  }
}