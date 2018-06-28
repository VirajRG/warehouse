import {connect} from 'react-redux';
import Uploader from './uploader';
  

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

const UploaderContainer = connect(mapStateToProps, mapDispatchToProps)(Uploader)

export default UploaderContainer;