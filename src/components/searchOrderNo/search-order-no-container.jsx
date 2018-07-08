import {connect} from 'react-redux';
import SearchOrderNo from './search-order-no';
  

const mapDispatchToProps = (dispatch) => {
    return {
    };
};
const mapStateToProps = state => {
    return {
        items: state.items
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchOrderNo);