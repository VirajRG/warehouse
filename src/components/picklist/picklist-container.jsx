import {connect} from 'react-redux';
import PickList from './picklist';
import { withRouter } from 'react-router-dom'
  

const mapDispatchToProps = (dispatch) => {
    return {
      upload : () => {
        console.log("upload");
      },
      uploadFiles : (file) => {
        console.log(file);
      }
    };
};
const mapStateToProps = state => {
    return {
      bins: state.bins,
      items: state.items
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PickList));