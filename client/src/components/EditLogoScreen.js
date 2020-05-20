import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            padding
            margin
            lastUpdate
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin: Int!) {
            updateLogo(
                id: $id,
                text: $text,
                color: $color,
                fontSize: $fontSize,
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                borderRadius: $borderRadius,
                borderWidth: $borderWidth,
                padding: $padding,
                margin: $margin
                ) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            color: "",
            fontSize: 0, 
            backgroundColor: "",
            borderColor: "", 
            borderRadius: 0, 
            borderWidth: 0, 
            padding: 0, 
            margin: 0,
            lastUpdate: null,
            refreshed: false
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
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    if (this.state.refreshed === false) {
                        console.log("refreshing this.state from db");
                        this.setState({
                            text: data.logo.text,
                            color: data.logo.color,
                            fontSize: data.logo.fontSize,
                            backgroundColor: data.logo.backgroundColor,
                            borderColor: data.logo.borderColor,
                            borderRadius: data.logo.borderRadius,
                            borderWidth: data.logo.borderWidth,
                            padding: data.logo.padding,
                            margin: data.logo.margin,
                            lastUpdate: new Date(),
                            refreshed: true
                        })
                    };
                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><Link to="/">Home</Link></h4>
                                            <h3 className="panel-title">
                                                Edit Logo
                                        </h3>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm">                                            
                                                <form onSubmit={e => {
                                                    e.preventDefault();
                                                    updateLogo({ variables: { id: data.logo._id, text: this.state.text, color: this.state.color, fontSize: parseInt(this.state.fontSize), backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, borderRadius: parseInt(this.state.borderRadius), borderWidth: parseInt(this.state.borderWidth), padding: parseInt(this.state.padding), margin: parseInt(this.state.margin) } });
                                                    text.value = data.logo.text;
                                                    color.value = data.logo.color;
                                                    fontSize.value = data.logo.fontSize;
                                                    backgroundColor.value = data.logo.backgroundColor;
                                                    borderColor.value = data.logo.borderColor;
                                                    borderRadius.value = data.logo.borderRadius;
                                                    borderWidth.value = data.logo.borderWidth;
                                                    padding.value = data.logo.padding;
                                                    margin.value = data.logo.margin;
                                                }}>
                                                    <div className="form-group">
                                                        <label htmlFor="text">Logo Name:</label>
                                                        <input type="text" onChange={(e) => this.setState({text: e.target.value})} value={this.state.text} className="form-control" name="text" ref={node => {
                                                            text = node;
                                                        }} placeholder="Text"/>
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
                                                        }} placeholder="Color"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="fontSize">Font Size:</label>
                                                        <input type="range" onChange={(e) => this.setState({fontSize: e.target.value})} value={this.state.fontSize} className="form-control" name="fontSize" ref={node => {
                                                            fontSize = node;
                                                        }} placeholder="Font Size"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="backgroundColor">Background Color:</label>
                                                        <input type="color" onChange={(e) => this.setState({backgroundColor: e.target.value})} value={this.state.backgroundColor} className="form-control" name="backgroundColor" ref={node => {
                                                            backgroundColor = node;
                                                        }} placeholder="Background Color"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="borderColor">Border Color:</label>
                                                        <input type="color" onChange={(e) => this.setState({borderColor: e.target.value})} value={this.state.borderColor} className="form-control" name="borderColor" ref={node => {
                                                            borderColor = node;
                                                        }} placeholder="Border Color"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="borderRadius">Border Radius:</label>
                                                        <input type="range" onChange={(e) => this.setState({borderRadius: e.target.value})} value={this.state.borderRadius} className="form-control" name="borderRadius" ref={node => {
                                                            borderRadius = node;
                                                        }} placeholder="Border Radius"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="borderWidth">Border Width:</label>
                                                        <input type="range" onChange={(e) => this.setState({borderWidth: e.target.value})} value={this.state.borderWidth} className="form-control" name="borderWidth" ref={node => {
                                                            borderWidth = node;
                                                        }} placeholder="Border Width"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="padding">Padding:</label>
                                                        <input type="range" onChange={(e) => this.setState({padding: e.target.value})} value={this.state.padding} className="form-control" name="padding" ref={node => {
                                                            padding = node;
                                                        }} placeholder="Padding"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="margin">Margin:</label>
                                                        <input type="range" onChange={(e) => this.setState({margin: e.target.value})} value={this.state.margin} className="form-control" name="margin" ref={node => {
                                                            margin = node;
                                                        }} placeholder="Margin"/>
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
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;