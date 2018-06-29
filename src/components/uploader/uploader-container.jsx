import {connect} from 'react-redux';
import Uploader from './uploader';
import { createList } from '../../actions';
  

const mapDispatchToProps = (dispatch) => {
    return {
      upload : () => {
        console.log("upload");
      },
      createList : (items) => dispatch(createList(items))
    };
};
const mapStateToProps = state => {
    return {
      // user:state.user.username
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Uploader);