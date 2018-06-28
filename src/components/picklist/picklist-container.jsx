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
      user:state.user.username
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PickList);