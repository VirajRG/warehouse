import {connect} from 'react-redux';
import Summary from './summary';
import { createList } from '../../actions';
  

const mapDispatchToProps = (dispatch) => {
    return {
    };
};
const mapStateToProps = state => {
    return {
      items: state.items
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);