import NiceAvatar, {genConfig} from "react-nice-avatar";
import React from "react";
import {PatientDB} from "../DAL/PatientDB";
import {redirect} from "react-router-dom";

export default class EditAvatar extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.currentUser === undefined)
            redirect("/");


        const defaultConfig = {
            "sex": "man",
            "faceColor": "#f5d6a1",
            "earSize": "small",
            "eyeStyle": "circle",
            "noseStyle": "short",
            "mouthStyle": "laugh",
            "shirtStyle": "hoody",
            "glassesStyle": "none",
            "hairColor": "#000000",
            "hairStyle": "normal",
            "hatStyle": "none",
            "hatColor": "#000000",
            "eyeBrowStyle": "up",
            "shirtColor": "#000000",
            "bgColor": "white",
        };
        this.state = {
            myConfig: defaultConfig,
        };
        console.log(props.currentUser.uid)
    }

    async getPatient() {
        const pat = await PatientDB.prototype.getPatientById(this.props.currentUser.uid);
        const config = genConfig(pat.avatarConfig);
        this.setState({myConfig: config});
        console.log(config);
    }

    componentDidMount() {
        if (this.props.currentUser === undefined)
            redirect("/")
        this.getPatient();

    }


    //On Change Event for select-options
    change = () => {
        const config = {
            sex: document.getElementById("sex").value,
            faceColor: document.getElementById("faceColor").value,
            hairColor: document.getElementById("hairColor").value,
            hairStyle: document.getElementById("hairStyle").value,
            hatColor: document.getElementById("hatColor").value,
            hatStyle: document.getElementById("hatStyle").value,
            eyeStyle: document.getElementById("eyeStyle").value,
            eyeBrowStyle: document.getElementById("eyeBrowStyle").value,
            glassesStyle: document.getElementById("glassesStyle").value,
            noseStyle: document.getElementById("noseStyle").value,
            mouthStyle: document.getElementById("mouthStyle").value,
            shirtColor: document.getElementById("shirtColor").value,
            shirtStyle: document.getElementById("shirtStyle").value,
            bgColor: "white",

        }
        const myConfig = genConfig(config);
        this.setState({myConfig: myConfig});


    }
    save = async () => {
        console.log(this.props.currentUser.uid & " " & this.state.myConfig)
        await PatientDB.prototype.updateAvatar(this.props.currentUser.uid, this.state.myConfig)
        alert("Avatar saved!")
    }


    render() {

        return (
            <div className="padded_div avatar">
                <h1>Edit your Avatar</h1>
                <NiceAvatar shape={"rounded"} style={{width: '10rem', height: '10rem'}} {...this.state.myConfig} />
                <br/>
                <div className={"grid"}>
                    <label>Sex: </label>
                    <select className={"select"} name="sex" id="sex" onChange={this.change}>
                        <option value={"man"}>Man</option>
                        <option value={"woman"}>Woman</option>
                    </select>
                    <label style={{}}>Face Color:</label>
                    <input type="color" id="faceColor" name="faceColor" value={this.state.myConfig.faceColor}
                           onChange={this.change}/>
                    <label>Ear size: </label>
                    <select className={"select"} name="earSize" id="earSize" onChange={this.change}
                            value={this.state.myConfig.earSize}>
                        <option value={"small"}>Small</option>
                        <option value={"big"}>Big</option>
                    </select>
                    <label>Hair color: </label>
                    <input type="color" id="hairColor" name="hairColor" value={this.state.myConfig.hairColor}
                           onChange={this.change}/>
                    <label>Hair style: </label>
                    <select className={"select"} name="hairStyle" id="hairStyle" onChange={this.change}
                            value={this.state.myConfig.hairStyle}>
                        <option value={"normal"}>Normal</option>
                        <option value={"thick"}>Thick</option>
                        <option value={"mohawk"}>Mohawk</option>
                        <option value={"womanLong"}>Long (Woman)</option>
                        <option value={"womanShort"}>Short (Woman)</option>
                    </select>
                    <label>Hat style: </label>
                    <select className={"select"} name="hatStyle" id="hatStyle" onChange={this.change}
                            value={this.state.myConfig.hatStyle}>
                        <option value={"none"}>None</option>
                        <option value={"beanie"}>Beanie</option>
                        <option value={"turban"}>Turban</option>
                    </select>
                    <label>Hat color: </label>
                    <input type="color" id="hatColor" name="hatColor" value={this.state.myConfig.hatColor}
                           onChange={this.change}/>
                    <label>Eye style: </label>
                    <select className={"select"} name="eyeStyle" id="eyeStyle" onChange={this.change}
                            value={this.state.myConfig.eyeStyle}>
                        <option value={"circle"}>Circle</option>
                        <option value={"oval"}>Oval</option>
                        <option value={"smile"}>Smile</option>
                    </select>
                    <label>Eye brow style: </label>
                    <select className={"select"} name="eyeBrowStyle" id="eyeBrowStyle" onChange={this.change}
                            value={this.state.myConfig.eyeBrowStyle}>
                        <option value={"up"}>Up</option>
                        <option value={"upWoman"}>Up (Woman)</option>
                    </select>
                    <label>Glasses style: </label>
                    <select className={"select"} name="glassesStyle" id="glassesStyle" onChange={this.change}
                            value={this.state.myConfig.glassesStyle}>
                        <option value={"none"}>None</option>
                        <option value={"round"}>Round</option>
                        <option value={"square"}>Square</option>
                    </select>
                    <label>Nose style: </label>
                    <select className={"select"} name="noseStyle" id="noseStyle" onChange={this.change}
                            value={this.state.myConfig.noseStyle}>
                        <option value={"short"}>Short</option>
                        <option value={"long"}>Long</option>
                        <option value={"round"}>Round</option>
                    </select>
                    <label>Mouth style: </label>
                    <select className={"select"} name="mouthStyle" id="mouthStyle" onChange={this.change}
                            value={this.state.myConfig.mouthStyle}>
                        <option value={"laugh"}>Laugh</option>
                        <option value={"smile"}>Smile</option>
                        <option value={"peace"}>Peace</option>
                    </select>
                    <label>Shirt color: </label>
                    <input type="color" id="shirtColor" name="shirtColor" value={this.state.myConfig.shirtColor}
                           onChange={this.change}/>
                    <label>Shirt style: </label>
                    <select className={"select"} name="shirtStyle" id="shirtStyle" onChange={this.change}
                            value={this.state.myConfig.shirtStyle}>
                        <option value={"hoody"}>Hoody</option>
                        <option value={"short"}>Short</option>
                        <option value={"polo"}>Polo</option>
                    </select>
                </div>
                <button className={"formButton"} onClick={this.save}>Save</button>
            </div>
        )
    };


}
