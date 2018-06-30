import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Row, Col, Icon, Button, Layout, message, Table } from 'antd';
import * as XLSX from 'xlsx';
import history from '../../history';
const { Header, Content } = Layout;

export default class Summary extends Component {

  render() {

    const columns = [
      { title: 'Pick List No.', dataIndex: 'pickListNo', key: 'pickListNo' },
      {
        title: 'Bin Name', dataIndex: 'binName', key: 'binName',
        render: text => <strong style={{ color: 'black' }}>{text}</strong>
      },
      { title: 'Barcode', dataIndex: 'barcode', key: 'barcode' },
      { title: 'Style No.', dataIndex: 'binName', key: 'binName' },
      { title: 'Color', dataIndex: 'color', key: 'color' },
      { title: 'Size', dataIndex: 'size', key: 'size' },
      { title: 'MRP', dataIndex: 'mrp', key: 'mrp' },
      {
        title: 'Quantity Left', dataIndex: 'quantityLeft', key: 'quantityLeft',
        align: 'center', render: text => <span style={{ color: 'red', fontSize: '22px' }}>{text}</span>
      },
      { title: 'Order No.', dataIndex: 'orderNo', key: 'orderNo' },
      { title: 'Reservation No.', dataIndex: 'reservationNo', key: 'reservationNo' },
    ];

    const dataSource = this.props.items.filter(item => item.quantityLeft > 0)
      .map(item => {
        return {
          pickListNo: item.pickListNo,
          binName: item.binName,
          barcode: item.barcode,
          style: item.style,
          color: item.color,
          size: item.size,
          mrp: item.mrp,
          quantityLeft: item.quantityLeft,
          orderNo: item.orderNo,
          reservationNo: item.reservationNo
        }
      }
      );


    return (
      <div className="summary-page">
        <Header className="header">
          <span>Summary</span>
          <Link to="/">
            <span className="icon"><Icon type="upload" onClick={this.props.upload} /></span>
          </Link>
        </Header>
        <Content className="content">
          <Row>
            <Col className="col" xs={{ span: 18, offset: 3 }}>
              <h1>Items not scanned :</h1>
              <Table dataSource={dataSource} columns={columns} />
            </Col>
          </Row>
        </Content>
      </div>
    )
  }
}