import React from 'react';
import './css/default.css';
import './css/finish.css';

const Finish = () => {
    return(
        <div id="finish_content">
            <div id="big_title_box">
                <div id="big_title_text">Diet</div>
                <div id="big_title_note">Your score</div>
            </div>
            <div id="container">
                <p id="note_1">
                    <strong>UK National average:</strong> 2.9 Tons of CO2 produced per year
                </p>
                <div id="result_slider">
                    <div id="slider_gauge"></div>
                </div>
                <p id="note_2">
                    Your using 3.2 Tons of CO2 / year
                </p>
                <p id="note_3">
                    Lets take a look at how you look in the <span>Home</span> category...
                </p>
                <button
                    id="button_3"
                    className="survey_button"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}

export default Finish;