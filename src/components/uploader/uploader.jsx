import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Row, Col, Icon, Button, Upload, Layout, message } from 'antd';
import * as XLSX from 'xlsx';
import history from '../../history';
const { Header, Content } = Layout;

export default class Uploader extends Component {

  state = {
    uploaded: false,
    data: []
  };

  beforeUpload = (file) => {
    const reader = new FileReader();
    let csvData = [];

    // console.log(file.name);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      workbook.SheetNames.forEach((sheetName) => {
        csvData = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
      });
      // console.log(csvData);
      csvData = csvData.split("\n"); //-------------change
      if(csvData[9]==="Bin No.,,Barcode,Style No,Color,Size,MRP,Quantity,Order No,Reservation No,,,,,,"){     
        this.setState({
          uploaded: true,
          data: csvData
        });
        message.success("File uploaded successfully");
        return false;
      }
      message.error("Please upload the correct file");
    }

    if(!file.name.includes(".xlsx")){ //-------------change
      message.error("Please upload the correct file");
      return false;
    }

    reader.readAsBinaryString(file);
    return false;
  }

  createList = () => {
    // let bins = [];
    let binName = "";
    let pickListNo = 0;
    let items = [];
    let arr = this.state.data.map(x => x.split(","));
    arr = arr.splice(10); //-------------change
    arr.forEach(row => { 

      if(row[5] === "Total") //-------------change
        pickListNo++;

      if(row[0] && !row[0].includes(":")) {
        // bins.push(row[0]);
        binName = row[0];
      }
      if(row[4]) items.push({
        pickListNo: pickListNo,
        binName: binName,
        barcode: row[2].split(".")[0],
        style: row[3],
        color: row[4],
        size: row[5],
        mrp: parseFloat(row[6]),
        quantity: parseInt(row[7]),
        quantityLeft: parseInt(row[7]),
        orderNo: row[8],
        reservationNo: row[9]
      });
    });
    // console.log(bins);
    console.log(items);
    console.log("No. of picklists: ", pickListNo);
    this.props.createList(items);
    history.push("./"+items[0].pickListNo+"/"+items[0].binName);
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;

    return (
      <div className="uploader-page">
        <Header className="header">
          <span>Warehouse Uploader</span>
          <span className="icon"><Icon type="upload" onClick={this.props.upload} /></span>
        </Header>
        <Content className="content">
          <Row>
            <Col className="col" xs={{ span: 8, offset: 8 }}>
              <h3>Please upload the Pick List :</h3>
              <div className="upload">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  multiple={false}
                  beforeUpload={this.beforeUpload}
                >
                  {this.state.uploaded
                    ? <Icon type="check-circle" style={{ fontSize: 36, color: '#87d068' }} />
                    : uploadButton}
                </Upload>
              </div>
              {this.state.uploaded
                ? <Button onClick={this.createList}>
                  Scan Items
                  <Icon type="right" />
                </Button>
                : null}
            </Col>
          </Row>
        </Content>
      </div>
    )
  }
}