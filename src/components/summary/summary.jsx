import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Row, Col, Icon, Button, Layout, message, Table, Divider } from 'antd';
import * as XLSX from 'xlsx';
import history from '../../history';
const { Header, Content } = Layout;

export default class Summary extends Component {

  downloadSummary = (scanned, notScanned) => {
    // let book = XLSX.utils.book_new();
    // let sheet = XLSX.utils.json_to_sheet([{ rowNo: 'Row No', status: 'Staus', A: "Source Short Name", B: "Transaction Type", C: "Customer-Vendor Name", D: "Cp Gstin No", E: "Party Stname", F: "Department", G: "Entry Date", H: "Entry No", I: "Document Date", J: "Document No", K: "Tradegroup", M: "Qty", N: "Basic Amt", O: "Tax rate", P: "IGST", Q: "Gross Amount", R: "Round Off", S: "Gross Amt", T: "CGST", U: "IGST" }, ...results], { header: ["rowNo", "status", 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U'] });
    // XLSX.utils.book_append_sheet(book, sheet, "errors");
    // XLSX.writeFile(book, 'gst_error_sheet.xlsx')
    
    let headers = {
      pickListNo: 'Pick List No.',
      binName: 'Bin Name',
      barcode: 'Barcode',
      style: 'Style No.',
      color: 'Color',
      size: 'Size',
      mrp: 'MRP',
      quantity:'Quantity',
      quantityLeft: 'Quantity Left',
      orderNo: 'Order No.',
      reservationNo: 'Reservation No.'
    }
    
    scanned.unshift(headers);
    notScanned.unshift(headers);
    console.log('scanned:', scanned);
    console.log('not scanned:', notScanned)
    let wsScanned = XLSX.utils.json_to_sheet(scanned, {skipHeader: true});
    let wsNotScanned = XLSX.utils.json_to_sheet(notScanned, {skipHeader: true});

    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsScanned, "Items scanned");
    XLSX.utils.book_append_sheet(wb, wsNotScanned, "Items not scanned");

    XLSX.writeFile(wb, "summary.xlsx");
  }

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
      {
        title: 'Quantity', dataIndex: 'quantity', key: 'quantity',
        align: 'center', render: text => <span style={{ color: 'red', fontSize: '22px' }}>{text}</span>
      },
      { title: 'Order No.', dataIndex: 'orderNo', key: 'orderNo' },
      { title: 'Reservation No.', dataIndex: 'reservationNo', key: 'reservationNo' },
    ];

    const itemNotScanned = this.props.items.filter(item => item.quantityLeft > 0)
      .map(item => {
        return {
          pickListNo: item.pickListNo,
          binName: item.binName,
          barcode: item.barcode,
          style: item.style,
          color: item.color,
          size: item.size,
          mrp: item.mrp,
          quantity: item.quantity,
          quantityLeft: item.quantityLeft,
          orderNo: item.orderNo,
          reservationNo: item.reservationNo
        }
      }
    );
    const itemScanned = this.props.items.filter(item => item.quantityLeft!==item.quantity)
      .map(item => {
        return {
          pickListNo: item.pickListNo,
          binName: item.binName,
          barcode: item.barcode,
          style: item.style,
          color: item.color,
          size: item.size,
          mrp: item.mrp,
          quantity: item.quantity,
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
          <Link to="/searchOrderNo">
            <span className="icon"><Icon type="search" onClick={this.props.upload} /></span>
          </Link>
        </Header>
        <Content className="content">
          <Row>
            <Col className="col" xs={{ span: 22, offset: 1 }} style={{marginBottom:'30px'}}>
              <Row>
                <Col xs={{ span: 24 }}>
                  <span className="icon" style={{ display: "block", textAlign: "end" }}>
                    <Button onClick={() => this.downloadSummary(itemScanned, itemNotScanned)}>
                      Download
                  <Icon type="download" />
                    </Button>
                  </span>
                </Col>
              </Row>
              <Row>
                <Col xs={{ span: 12 }}>
                  <h1>Items scanned :</h1>
                </Col>
                <Col xs={{ span: 12 }}>
                </Col>
              </Row>
              <Table dataSource={itemScanned} pagination={{pageSize:15}} columns={columns} />
            </Col>
            <Col className="col" xs={{ span: 22, offset: 1 }}>
              <Row>
                <Col xs={{ span: 12 }}>
                  <h1>Items not scanned :</h1>
                </Col>
              </Row>
              <Table pagination={{pageSize:15}} dataSource={itemNotScanned} columns={columns} />
            </Col>
          </Row>
        </Content>
      </div>
    )
  }
}