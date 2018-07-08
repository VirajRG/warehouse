import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Icon, Button, Layout, message, List, Avatar, Input } from 'antd';
import history from '../../history';
import { Howl, Howler } from 'howler';
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
  
  constructor(props) {
    super(props);
    this.nextList = this.nextList.bind(this);
  }

  componentDidMount(){
    this.barcodeInput.focus();
  }

  nextList = () => {
    const currentPickList = this.props.match.params.pickListNo;
    const currentBinName = this.props.match.params.binName;

    let nextPickList;
    let nextBinName;

    let currentPageIndex = this.props.items.findIndex(item =>
      (item.binName == currentBinName
        && item.pickListNo == currentPickList)
    );

    let nextPageItem = this.props.items.slice(currentPageIndex + 1).find(item => {
      return (item.binName != currentBinName)
        && item.pickListNo == currentPickList
    });

    if (typeof nextPageItem === 'undefined') {
      message.success("This order has been completed");
      history.push('/searchOrderNo');
      return;
    }

    nextPickList = nextPageItem.pickListNo;
    nextBinName = nextPageItem.binName;
    history.push("/" + nextPickList + "/" + nextBinName);
  }

  onBarcodeDetected = (e) => {
    const currentPickList = this.props.match.params.pickListNo;
    const currentBinName = this.props.match.params.binName;
    const barcode = e.target.value;
    if(barcode.length !== 13)
      return;
    e.target.value = '';
    e.target.autoFocus;
    let found = false;

    this.props.items.forEach(item => {
      if (
        item.pickListNo == currentPickList
        && item.binName === currentBinName
        && item.barcode == barcode
        && (item.quantityLeft > 0)
      ) {
        const sound = new Howl({src: ['/found.mp3']});
        sound.play();
        message.success("Item found");
        console.log("Item found:", barcode);
        found = true;
        this.props.barcodeMatched(currentPickList, currentBinName, barcode);
      }
    });
    
    if(!found){
      const sound = new Howl({src: ['/noMatch.mp3']});
      sound.play();
      message.error("Not found");
    }
  }

  blurredOut = () => {
    this.barcodeInput.focus();
  }

  render() {
    const currentPickList = this.props.match.params.pickListNo;
    const currentBinName = this.props.match.params.binName;
    let totalItems = 0;
    let scanLeft = 0;

    let currentOrderNo = this.props.items.find(item => {
      return(item.pickListNo == currentPickList)
    }).orderNo;

    let currentData = this.props.items.filter(item => {
      const currentItem =
        item.pickListNo == currentPickList && item.binName === currentBinName;
      if (currentItem) {
        scanLeft += item.quantityLeft;
        totalItems += item.quantity;
      }
      return currentItem && (item.quantityLeft > 0)
    });
    // console.log(currentData, currentPickList, currentBinName);
    if(scanLeft <= 0){
      const sound = new Howl({src: ['/binCompleted.mp3']});
      sound.play();
      message.info("Bin completed");
      this.nextList();
    }

    return (
      <div className="pick-list-page">
        <Header className="header">
          <span>Scan Items</span>
          <Link to="/summary">
            <span className="icon"><Icon type="bars" onClick={this.props.upload} /></span>
          </Link>
        </Header>
        <Content className="content">
          <Row>
            <Col className="col" xs={{ span: 12, offset: 6 }}>
              <Row>
                <Col xs={{ span: 12 }}>
                  <h2 style={{ marginBottom: '0px' }}>Order No: <span style={{ color: "#909090", fontSize: '32px' }}>{currentOrderNo}</span></h2>
                  <h2 style={{ marginBottom: '0px' }}>Bin Name: <span style={{ color: "#909090", fontSize: '32px' }}>{currentBinName}</span></h2>
                  <Input
                    ref={(input) => { this.barcodeInput = input; }}
                    placeholder="barcode here"
                    onChange={this.onBarcodeDetected}
                    onBlur={this.blurredOut}
                  />
                </Col>
                <Col xs={{ span: 12 }}>
                  <span className="icon" style={{ display: "block", textAlign: "end" }}>
                    <Button onClick={this.nextList} style={{background: scanLeft==0 ? "#87d068" : null}} >
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
