import React, {forwardRef} from "react";
import "./App.css";
import {Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./initFirebase";
import {db} from "./initFirebase";
import {collection, query, where, doc, getDoc, getDocs, setDoc, addDoc} from "firebase/firestore";
import {questionRef} from "./initFirebase";
import {useEffect, useState, Component} from "react";
import Logout from "./pages/Logout";
import * as PropTypes from "prop-types";
import {QuestionDB} from "./DAL/QuestionDB";
import {QuestionDTO} from "./DTO/QuestionDTO"
import {ResponseDB} from "./DAL/ResponseDB";
import {ResponseDTO} from "./DTO/ResponseDTO";

let Poids = 0;

export default function App() {
    /* Current user state */
    const [currentUser, setCurrentUser] = useState(undefined)

    /* Watch for authentication state changes */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("User is", user);
            setCurrentUser(user);
        });

        // Unsubscribe from changes when App is unmounted
        return () => {
            unsubscribe();
        };
    }, []);

    if (currentUser === undefined) {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Loading...</h1>
                </header>
            </div>
        );
    }

    return (
        <div className="App">
            <header className="App-header">
                <Routes>
                    <Route path="/" element={<Home currentUser={currentUser}/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                </Routes>
                <QuestionList/>
            </header>
        </div>
    );
}

class Question extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            answer: this.props.normalValue
        };
    }

    //FormInput Change handler
    //Do not put SendAnswer() here, it will send answer on every change
    HandleInputChanges = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({answer: value});
        /*switch (this.props.VariableName) {
            case "Poids": Poids = value;
        }*/
        //debug
        console.log("Answer: " + target.value);
        console.log("Checked: " + target.checked);
        console.log("Poids: " + Poids);
    };

    render() {

        let formattedQuestion;
        //For inputs of type RadioSlider and NumericSlider

        if (this.props.inputType === "RadioSlider") {

            formattedQuestion = (
                //Min and Max of range refer to the index in choices array of the question
                <input type="range"
                       min={0}
                       max={this.props.choices.length - 1}
                       step="1"
                       defaultValue={this.props.normalValue}
                       onChange={this.HandleInputChanges}/>
            );
        }

        //For inputs of type NumericSlider
        if (this.props.inputType === "NumericSlider") {
            formattedQuestion = (
                //Min and Max of range refer to the index in choices array of the question
                <input type="range"
                       min={this.props.choices[0]}
                       max={this.props.choices[this.props.choices.length - 1]}
                       step="1"
                       defaultValue={this.props.normalValue}
                       onChange={this.HandleInputChanges}/>
            );
        }

        //For inputs of type ToggleSlider
        if (this.props.inputType === "ToggleSlider") {
            formattedQuestion = (
                <label className="switch">
                    <input type="checkbox"
                           onInput={this.HandleInputChanges}
                           step="1"/>
                    <span className="slider round"></span>
                </label>
            );
        }

        return (
            <>
                <p>{this.props.text}</p>
                {formattedQuestion}
                {this.state.answer}
            </>
        );
    }
};

//Replace state with props after tests-----------------------------------------
function QuestionList() {
    const QUESTIONNAIRE_NO = 1;
    let [questions, setQuestions] = useState([]);
    useEffect(() => {
        async function loadQuestions() {
            let questions = await QuestionDB.prototype.getQuestionsByQuestionnaire(QUESTIONNAIRE_NO);
            setQuestions(prevState => [...prevState, ...questions]);
        }
        loadQuestions();
    }, []);



//----------------------------------------------
    //use for debug, for now
    //list of answers, only the values
    let [answers, setAnswers] = useState([]);
    let handleCallback = (childData) =>{
        setAnswers(prevState => [...prevState, childData]);
    }
//----------------------------------------------



    //Form Submission
    let HandleFormSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.answer);
    };

    return (
        <div>
            <h1>Questionnaire {QUESTIONNAIRE_NO}</h1>
            <form onSubmit={HandleFormSubmit}>
                    {questions.map((question, index) => (
                        <div key={index}>
                            <div>
                                <Question {...question}
                                          normalValue={question.NormalValue}
                                          SendAnswer={handleCallback}
                                />
                            </div>
                        </div>
                    ))}
                <button type="submit">Confirmer</button>
            </form>
        </div>
    );
}





