import {connect} from 'react-redux';
import PickList from './picklist';
import { withRouter } from 'react-router-dom'
import { decreaseQuantity } from '../../actions';
  

const mapDispatchToProps = (dispatch) => {
    return {
      upload : () => {
        console.log("upload");
      },
      barcodeMatched : (pickListNo, binName, barcode) => dispatch(decreaseQuantity(pickListNo, binName, barcode))
    };
};
const mapStateToProps = state => {
    return {
      items: state.items
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PickList));