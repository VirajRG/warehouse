import {connect} from 'react-redux';
import Uploader from './uploader';
import { createList } from '../../actions';
  

const mapDispatchToProps = (dispatch) => {
    return {
      createList : (items) => dispatch(createList(items))
    };
};
const mapStateToProps = state => {
    return {
        items: state.items
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Uploader);