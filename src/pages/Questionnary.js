import React, {useState} from "react";
import Family from "../components/Family";
import You from "../components/You";
import Habits from "../components/Habits";
import WriteAnswer from "./WriteAnswer";

export default function Questionnary() {

    const allAnswers = new WriteAnswer();

    const [step, setStep] = useState(0);
    const [values, setValues] = useState({
        sexe: 0,
        age: "",
        poids: "",
        taille: "",
        syst: 0,
        glyc: 0,
        chol: 0,
        diab: 0,
        inf: 0,
        avc: 0,
        afinf: 0,
        afcancer: 0,
        fume: 0,
        alim: 0,
        sport: 0,
        alcool: 0
    });

    // go back to previous step
    const prevStep = (e) => {
        e.preventDefault();
        setStep(step - 1)
    }

    // proceed to the next step
    const nextStep = (e) => {
        e.preventDefault();
        if (step === formTitles.length - 1) {
            allAnswers.updatePersonalData(
                values.sexe, values.age, values.poids, values.taille, values.syst, values.glyc, values.chol, values.diab, values.inf, values.avc
            );
            allAnswers.updateFamilyData(
                values.afinf, values.afcancer
            );
            allAnswers.updateHabitsData(
                values.fume, values.alim, values.sport, values.alcool
            );
            allAnswers.calculateFinalData();
            allAnswers.WriteResult();
        } else {
            setStep(step + 1)
        }
    }

    const displayStep = () => {
        switch (step) {
            case 0:
                return (
                    <You values={ values } setValues={ setValues }/>
                )
            case 1:
                return (
                    <Family values={ values } setValues={ setValues }/>
                )
            case 2:
                return (
                    <Habits values={ values } setValues={ setValues }/>
                )
            case 4:
                return (
                    <>
                    </>
                    //<Success />
                )
            // never forget the default case, otherwise VS code would be mad!
            default:
            // do nothing
        }
    }

    const formTitles = ["You", "Your family", "Your habits"];

    return (
        <div className="form">
            <div className="progress-bar">
                <span style={{width: step === 0 ? "33.3%" : step === 1 ? "66.6%" : "102%"}}></span>
            </div>
            <header>
                <h1>{formTitles[step]}</h1>
            </header>
            <div className="form-container">
                {displayStep(step)}
            </div>
            <footer>
                {!(step === 0) ?
                    <button
                        onClick={prevStep}>Prev</button> : <span></span>
                }
                <button
                    onClick={nextStep}>{step === formTitles.length - 1 ? "Submit" : "Next"}
                </button>
            </footer>
        </div>
    );
}