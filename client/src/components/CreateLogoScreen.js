import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

const ADD_LOGO = gql`
    mutation AddLogo(
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!, 
        $borderRadius: Int!,
        $borderWidth: Int!, 
        $padding: Int!, 
        $margin: Int!) {
            addLogo(
                text: $text,
                color: $color,
                fontSize: $fontSize,
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                borderRadius: $borderRadius,
                borderWidth: $borderWidth,
                padding: $padding, 
                margin: $margin) {
                    _id
        }
    }
`;

class CreateLogoScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "Default Logo",
            color: "#FFFFFF",
            fontSize: 20, 
            backgroundColor: "#808080",
            borderColor: "#000000", 
            borderRadius: 10, 
            borderWidth: 5, 
            padding: 10, 
            margin: 10,
            lastUpdate: null
        }
    }

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin;
        const styles = {
            container: {
                text: this.state.text,
                borderStyle: 'solid',
                whiteSpace: "pre",
                overflow: "auto",
                position: "absolute",
                color: this.state.color,
                fontSize: this.state.fontSize + "pt",  
                backgroundColor: this.state.backgroundColor,
                borderColor: this.state.borderColor,
                borderRadius: this.state.borderRadius + "px",
                borderWidth: this.state.borderWidth + "px",
                padding: this.state.padding + "px",
                margin: this.state.margin + "px"
            }
        };
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4><Link to="/">Home</Link></h4>
                                <h3 className="panel-title">
                                    Create Logo
                            </h3>
                            </div>
                            <div className="row">
                                <div className="col-sm">
                                    <form onSubmit={e => {
                                        e.preventDefault();
                                        addLogo({ variables: { text: text.value, color: color.value, fontSize: parseInt(fontSize.value), backgroundColor: backgroundColor.value, borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value), padding: parseInt(padding.value), margin: parseInt(margin.value) } });
                                        text.value = "";
                                        color.value = "";
                                        fontSize.value = "";
                                        backgroundColor.value = "";
                                        borderColor.value = "";
                                        borderRadius.value = "";
                                        borderWidth.value = "";
                                        padding.value = "";
                                        margin.value = "";
                                    }}>
                                        <div className="form-group">
                                            <label htmlFor="text">Logo Name:</label>
                                            <input type="text" onChange={(e) => this.setState({text: e.target.value})} value={this.state.text} className="form-control" name="text" ref={node => {
                                                text = node;
                                            }} placeholder="Default Logo" />
                                        </div>
                                        <div className="form-group">
                                                <div className="col-md-10">
                                                    <button type="addtext" className="btn btn-info">Add Text</button>
                                                    <button type="addimage" className="btn btn-primary">Add Image</button>
                                                </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="color">Color:</label>
                                            <input type="color" onChange={(e) => this.setState({color: e.target.value})} value={this.state.color} className="form-control" name="color" ref={node => {
                                                color = node;
                                            }} placeholder="#FFFFFF" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="fontSize">Font Size:</label>
                                            <input type="range" onChange={(e) => this.setState({fontSize: e.target.value})} value={this.state.fontSize} className="form-control" name="fontSize" ref={node => {
                                                fontSize = node;
                                            }} placeholder="20" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="backgroundColor">Background Color:</label>
                                            <input type="color" onChange={(e) => this.setState({backgroundColor: e.target.value})} value={this.state.backgroundColor} className="form-control" name="backgroundColor" ref={node => {
                                                backgroundColor = node;
                                            }} placeholder="#808080" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="borderColor">Border Color:</label>
                                            <input type="color" onChange={(e) => this.setState({borderColor: e.target.value})} value={this.state.borderColor} className="form-control" name="borderColor" ref={node => {
                                                borderColor = node;
                                            }} placeholder="#000000" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="borderRadius">Border Radius:</label>
                                            <input type="range" onChange={(e) => this.setState({borderRadius: e.target.value})} value={this.state.borderRadius} className="form-control" name="borderRadius" ref={node => {
                                                borderRadius = node;
                                            }} placeholder="10" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="borderWidth">Border Width:</label>
                                            <input type="range"  onChange={(e) => this.setState({borderWidth: e.target.value})} value={this.state.borderWidth} className="form-control" name="borderWidth" ref={node => {
                                                borderWidth = node;
                                            }} placeholder="5" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="padding">Padding:</label>
                                            <input type="range" onChange={(e) => this.setState({padding: e.target.value})} value={this.state.padding} className="form-control" name="padding" ref={node => {
                                                padding = node;
                                            }} placeholder="10" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="margin">Margins:</label>
                                            <input type="range" onChange={(e) => this.setState({margin: e.target.value})} value={this.state.margin} className="form-control" name="margin" ref={node => {
                                                margin = node;
                                            }} placeholder="10" />
                                        </div>
                                        <button type="submit" className="btn btn-success">Submit</button>
                                        <button type="export" className="btn btn-warning">Export</button>
                                    </form>
                                    {loading && <p>Loading...</p>}
                                    {error && <p>Error :( Please try again</p>}
                                </div>
                                <div className="col-sm">
                                    <div style={ styles.container }>
                                        {this.state.text}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;