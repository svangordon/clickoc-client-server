import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import tweetValidation from './tweetValidation';
import * as tweetActions from 'redux/modules/tweet';

@connect(() => ({}),
  dispatch => bindActionCreators(tweetActions, dispatch)
)
@reduxForm({
  form: 'tweet',
  fields: ['tweetContent'],
  validate: tweetValidation
  // asyncValidate
})
export default
class TweetForm extends Component {
  static propTypes = {
    active: PropTypes.string,
    asyncValidating: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    // dirty: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    legislators: PropTypes.array
  }

  _handleSubmit(formData) {
    this.props.handleSubmit(formData)
      .then(val => {
        console.log('promise works');
      });
    this.props.resetForm();
  }

  render() {
    const {
      asyncValidating,
      // dirty,
      fields: {tweetContent},
      // active,
      handleSubmit,
      _handleSubmit,
      // invalid,
      resetForm,
      // pristine,
      // valid
      } = this.props;
    const styles = require('./TweetForm.scss');
    const renderInput = (field, label, showAsyncValidating) =>
      <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
        <label htmlFor={field.name}>{label}</label>
        <div>
          {showAsyncValidating && asyncValidating && <i className={'fa fa-cog fa-spin ' + styles.cog}/>}
          <input type="text" className="form-control" id={field.name} {...field}/>
          {field.error && field.touched && <div className="text-danger">{field.error}</div>}
        </div>
      </div>;

    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          {renderInput(tweetContent, 'Tweet Content')}
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-success" onClick={handleSubmit}>
                <i className="fa fa-paper-plane"/> Submit
              </button>
              <button className="btn btn-warning" onClick={resetForm} style={{marginLeft: 15}}>
                <i className="fa fa-undo"/> Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
