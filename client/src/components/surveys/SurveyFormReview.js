import React from 'react';
import {connect} from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history}) => {

    const reviewFields = _.map(formFields, field => {
        return(
            <div key={field.name}>
                <label>{field.label}</label>
                <div>
                    {formValues[field.name]}
                </div>
            </div>
        )
    })

    return(
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button
                className="yellow darken-3 white-text btn-flat"
                onClick={onCancel}
            >
                Back
            </button>
            <button onClick={() => submitSurvey(formValues, history)} className="green btn-flat right white-text">
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    )
}

function mapStateToProps(state) {
    return{
        formValues: state.form.surveyForm.values 
    }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));