import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Row, Col, Icon, Button, Upload, Layout, message } from 'antd';
import * as XLSX from 'xlsx';
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
      csvData = csvData.split("\n");
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

    if(!file.name.includes(".xlsx")){
      message.error("Please upload the correct file");
      return false;
    }

    reader.readAsBinaryString(file);
    return false;
  }

  uploadFiles = () => {
    const arr = this.state.data.map(x => x.split(","));
    console.log(arr);
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
                ? <Button onClick={this.uploadFiles}>
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