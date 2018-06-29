import {connect} from 'react-redux';
import PickList from './picklist';
  

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

export default connect(mapStateToProps, mapDispatchToProps)(PickList);