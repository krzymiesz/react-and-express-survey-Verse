import React from 'react';
import axios from 'axios';
import image from './start_image.JPG';
import Finish from './EndScreen';
import './css/survey.css';

class Survey extends React.Component {
    state = {
        SurveyData: {},
        userAnswer: null,
        currentQuestion: 0,
        options: [],
        surveyStart: false,
        surveyEnd: false,
        disabled: true
    }

    // start Survey
    startSurvayHandler = () => {
        this.setState({
            surveyStart: true
        })
    }

    // load Survey
    loadSurvey = () => {
        const {currentQuestion} = this.state;
        this.setState(() => {
            return{
                questions: this.state.SurveyData[currentQuestion].question,
                options: this.state.SurveyData[currentQuestion].options
            };
        });
    }

    // After all the elements of the page is rendered correctly
    componentDidMount(){
        // get data from DataBase
        axios.get("/surveyQuestions").then(response => {
            const dataFromDB = response.data;
            this.setState({ SurveyData: dataFromDB });
            this.loadSurvey();
        });
    }

    // When a component got updated
    componentDidUpdate(prevProps, prevState){
        const {currentQuestion} = this.state;
        if(this.state.currentQuestion !== prevState.currentQuestion){
            this.setState(() => {
                return{
                    disabled: true,
                    questions: this.state.SurveyData[currentQuestion].question,
                    options: this.state.SurveyData[currentQuestion].options
                }
            });
        }
    }

    // Handle next question
    nextQuestionHandler = () => {
        this.setState({
            currentQuestion: this.state.currentQuestion + 1
        });
    }

    // Chceck if question answered
    chceckAnswer = answer => {
        this.setState({
            userAnswer: answer,
            disabled: false
        })
    }

    // When survey finished
    finishHandler = () => {
        if(this.state.currentQuestion === this.state.SurveyData.length - 1){
            this.setState({
                surveyEnd: true
            })
        }
    }

    // Render view
    render() {
        const {questions, options, currentQuestion, userAnswer, surveyStart, surveyEnd} = this.state;

        // Render Survey Finish page
        if(surveyEnd) return(<Finish />);

        // Render Survey page
        if(surveyStart) return (
            <div id="container_survey">
                <div id="questions_progress">
                    <div className="progress_element">
                        <div className="element_box">
                            <div
                                className="element_box_dynamic"
                                style={{width: ((currentQuestion+1)*20) + "%"}}
                            ></div>
                        </div>
                        <div className="element_title">Diet</div>
                    </div>
                    <div className="progress_element">
                        <div className="element_box"></div>
                        <div className="element_title">Home</div>
                    </div>
                    <div className="progress_element">
                        <div className="element_box"></div>
                        <div className="element_title">Travel</div>
                    </div>
                    <div className="progress_element">
                        <div className="element_box"></div>
                        <div className="element_title">Other</div>
                    </div>
                </div>
                <div className="clear"></div>
                <div id="question_number">
                    {`Question ${currentQuestion + 1} of 24`}
                </div>
                <div id="question_text">{questions}</div>
                <div id="question_options_container">
                    {options.map(option =>(
                        <div
                            key={option}
                            className={`
                                question_option
                                ${userAnswer === option && !this.state.disabled ? "selected" : null}
                            `}
                            onClick={() => this.chceckAnswer(option)}
                            option={option}
                        >
                            <div className="question_option_text">
                                {option}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="clear"></div>
                {
                    currentQuestion < this.state.SurveyData.length - 1 &&
                    <button
                        id="button_2"
                        className={`
                            survey_button
                            ${this.state.disabled ? "button_disabled" : null}
                        `}
                        disabled={this.state.disabled}
                        onClick={this.nextQuestionHandler}
                    >
                        Next question
                    </button>
                }
                {
                    currentQuestion === this.state.SurveyData.length - 1 &&
                    <button
                        id="button_2"
                        className={`
                            survey_button
                            ${this.state.disabled ? "button_disabled" : null}
                        `}
                        disabled={this.state.disabled}
                        onClick={this.finishHandler}
                    >
                        Done
                    </button>
                }
            </div>
        );

        // Render Survey Start page
        return(
            <div id="container_survey_start">
                <img src={image} alt="" id="start_image" />
                <p id="title_container">Calculate your personal Pawprint</p>
                <p id="text_container">
                    Next we have a short 2–3 minute survey covering Diet, Home, Travel, and Other that will let us calculate your personal carbon footprint (or Parprint as we like to call it).
                </p>
                <button
                    id="button_1"
                    className="survey_button"
                    onClick={this.startSurvayHandler}
                >
                    Take the survey
                </button>
            </div>
        );
    }
}
 
export default Survey;