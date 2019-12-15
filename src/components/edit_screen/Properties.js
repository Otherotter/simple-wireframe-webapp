import { SketchPicker } from 'react-color';
import React from 'react';


class Properties extends React.Component {
    constructor(){
        super();
        this.state = {
            displayFontPicker: false,
            displayBackgroundPicker: false,
            displayBorderPicker: false,

        }
    }
    hide = (e)=>{
        e.stopPropagation()
        this.setState({ displayFontPicker: false })
        this.setState({ displayBackgroundPicker: false })
        this.setState({ displayBorderPicker: false })
    }
  
    handleChangeText = (text) =>{
        document.getElementById(this.props.itemComponent.id).firstChild.nodeValue = text.target.value;
        // console.log(document.getElementById(this.props.itemComponent.id))
        this.props.tigger(true);
    };
    handleChangeFontSize = (number) =>{
        document.getElementById(this.props.itemComponent.id).style.fontSize = number.target.value + "px";
        this.props.tigger(true);
    };
    handleChangeBorderThickness= (number) =>{
        let a = number.target.value;
        document.getElementById(this.props.itemComponent.id).style.borderWidth = number.target.value + "px";
        this.props.tigger.bind(true);
        
    };
    handleChangeBorderRadius= (number) =>{
        document.getElementById(this.props.itemComponent.id).style.borderRadius = number.target.value + "px";
        this.props.tigger(true);

    };

    colorpicker(eventHandler){
        return(
            <div>
                <div className="colorpicker" onClick={this.handleClick }>
                <div/>
            </div>
                    { this.state.displayColorPicker ? 
                    <div className="popover">
                        <div  onClick={ this.handleClose }/>
                        <SketchPicker color={ this.state.color } onChange={eventHandler}/>
                    </div> 
                    : null }
            </div>
        );
    }

    handleChangeBorderColor = (color) => {
        // console.log(this.props.itemComponent.id)
        document.getElementById(this.props.itemComponent.id).style.borderColor = color.hex;
        // console.log(color)
        this.props.tigger(true);  
    };
    handleBorderClick = (e) => {
        e.stopPropagation();
        console.log("Asdf")
        this.setState({ displayBorderPicker: !this.state.displayBorderPicker })
    };
    handleBorderClose = (e) => {
        e.stopPropagation();
        this.setState({ displayBorderPicker: false })
    };
    bordercolorpicker(){
        let element = document.getElementById(this.props.itemComponent.id)
        
        return(
            <div>
                <div className="colorpicker" onClick={this.handleBorderClick}>
                    {element.style.borderColor}
                <div/>
            </div>
                    { this.state.displayBorderPicker ? 
                    <div className="popover">
                        <div  onClick={ this.handleBorderClose }/>
                        <SketchPicker color={ this.state.color } onChange={this.handleChangeBorderColor}/>
                    </div> 
                    : null }
            </div>
        );
    }

    handleChangeBackgroundColor = (color) => {
        // console.log(this.props.itemComponent.id)
        document.getElementById(this.props.itemComponent.id).style.backgroundColor = color.hex;
        console.log(color)  
        this.props.tigger(true);
    };
    handleBackgroundClick = (e) => {
        e.stopPropagation();
        console.log("Asdf")
        this.setState({ displayBackgroundPicker: !this.state.displayBackgroundPicker })
    };
    handleBackgroundClose = (e) => {
        e.stopPropagation();
        this.setState({ displayBackgroundPicker: false })
    };
    backgroundcolorpicker(){
        let element = document.getElementById(this.props.itemComponent.id)
        return(
            <div>
                <div className="colorpicker" onClick={this.handleBackgroundClick}>
                    {element.style.backgroundColor}
                <div/>
            </div>
                    { this.state.displayBackgroundPicker ? 
                    <div className="popover">
                        <div  onClick={ this.handleBackgroundClose }/>
                        <SketchPicker color={ this.state.color } onChange={this.handleChangeBackgroundColor}/>
                    </div> 
                    : null }
            </div>
        );
    }

    handleChangeFontColor = (color) => {
        // console.log("handleChangeFontColor = (color) =>")
        // console.log(document.getElementById(this.props.itemComponent.id).style.color)
        document.getElementById(this.props.itemComponent.id).style.color = color.hex;
        this.props.tigger(true);
    };
    handleFontClick = (e) => {
        e.stopPropagation();
        console.log("Asdf")
        this.setState({ displayFontPicker: !this.state.displayFontPicker })
    };
    handleFontClose = (e) => {
        e.stopPropagation();
        this.setState({ displayFontPicker: false })
    };
    fontcolorpicker(){
        let element = document.getElementById(this.props.itemComponent.id)
        return(
            <div>
                <div className="colorpicker" onClick={this.handleFontClick}>
                        {element.style.color}
                <div/>
            </div>
                    { this.state.displayFontPicker ? 
                    <div className="popover">
                        <div  onClick={ this.handleFontClose }/>
                        <SketchPicker color={ this.state.color } onChange={this.handleChangeFontColor}/>
                    </div> 
                    : null }
            </div>
        );
    }

    propertiesView() {
        const itemSelected = this.props.itemSelected;
        let itemComponent = this.props.itemComponent;
        //console.log(this.props.itemStyle);
        if(this.props.itemStyle !== null && itemComponent!==null){
            // console.log(this.props.itemStyle.fontSize)
            // console.log(itemComponent.className);
            let componentClass = itemComponent.className.slice(0,itemComponent.className.indexOf(" "));
            // console.log(componentClass);
            let element = document.getElementById(this.props.itemComponent.id)
            // console.log(element.style.fontSize);
            // console.log(element.style.backgroundColor);
            // console.log(element.style.borderColor);
            // console.log(element.style.borderWidth);
            // console.log(element.style.borderRadius);
            let fontSize = parseInt(element.style.fontSize.slice(0,element.style.fontSize.indexOf("p")))
            let borderWidth = parseInt(element.style.borderWidth.slice(0,element.style.borderWidth.indexOf("p")))
            let borderRadius = parseInt(element.style.borderRadius.slice(0,element.style.borderRadius.indexOf("p")))

            var style = this.props.itemStyle;
            if (itemSelected) {
            return (
                <div class="p-2 bd-highlight">
                <div class="p-2 bd-highlight">   
                    <label>Text</label>
                    <br/>
                    <input className="numberpicker" onChange={this.handleChangeText}/>
                </div>
                <div class="p-2 bd-highlight">   
                    <label>Font Size</label>
                    <br/>
                    <input className="numberpicker" type="number" onChange={this.handleChangeFontSize} defaultValue={fontSize}/>
                </div>
                <div class="p-2 bd-highlight">   
                    <label>Font Color</label>
                    <br/>
                    {this.fontcolorpicker()} 
                </div>
                <div class="p-2 bd-highlight"> 
                    <label>Background</label>
                    <br/>
                    {this.backgroundcolorpicker()} 
                </div>
                <div class="p-2 bd-highlight">   
                    <label>Border Color</label>
                    <br/>
                    {this.bordercolorpicker()} 
                </div>
                <div class="p-2 bd-highlight">   
                    <label>Border Thickness</label>
                    <br/>
                    <input className="numberpicker" type="number" onChange={this.handleChangeBorderThickness} defaultValue={borderWidth}/>
                </div>
                <div class="p-2 bd-highlight">  
                    <label>Border Radius</label>
                    <br/>
                    <input className="numberpicker" type="number" onChange={this.handleChangeBorderRadius} defaultValue={borderRadius}/>
                </div>
            </div>
            );
            }
        }
        
    }
    render(){
        var componentClass = null; 
        if(this.props.itemComponent!==null) componentClass = this.props.itemComponent.className.slice(10,this.props.itemComponent.className.indexOf(" "));
        return(
            <div id="properties" onMouseLeave={this.hide}>
                {componentClass}
                 {this.propertiesView()}
                 
                
                
            </div>

            
        );

    }


}



export default Properties;