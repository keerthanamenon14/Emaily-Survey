import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component{
    state = {showFormReview: false};

    renderContent(){
        if(this.state.showFormReview)
        {
            return <SurveyFormReview onCancel={() => this.setState({showFormReview: false})}/>
        }
        return <SurveyForm onSurveySubmit={() => this.setState({showFormReview: true})}/>
    }

    render() {
        return(
            <div>
               {this.renderContent()}
            </div>
        )
    }
}

export default reduxForm({form: 'surveyForm'})(SurveyNew); //wired up reduxForm to surveyForm meaning its connected to the form,
//this time we did not pass in not to destroy the form values, so the form will reset on going back from here