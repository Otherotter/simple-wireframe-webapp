import { SketchPicker } from 'react-color';
import React from 'react';


class Properties extends React.Component {
    constructor(){
        super();
        this.state = {
            displayColorPicker: false,
        }
    }
    hide = (e)=>{
        e.stopPropagation()
        this.setState({ displayColorPicker: false })
    }
    handleClick = (e) => {
        e.stopPropagation();
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };
    
    handleClose = (e) => {
        e.stopPropagation();
        this.setState({ displayColorPicker: false })
    };

    handleChangeBackgroundColor = (color) => {
        console.log(this.props.itemComponent.id)
        document.getElementById(this.props.itemComponent.id).style.backgroundColor = color.hex;
        console.log(color)  
    };

    handleChangeBorderColor = (color) => {
        console.log(this.props.itemComponent.id)
        document.getElementById(this.props.itemComponent.id).style.borderColor = color.hex;
        console.log(color)  
    };

    handleChangeFontColor = (color) => {
        window.event.stopPropagation()
        console.log("handleChangeFontColor = (color) =>")
        console.log(document.getElementById(this.props.itemComponent.id).style.color)
        document.getElementById(this.props.itemComponent.id).style.color = color.hex;
       
    };

    handleChangeText = (text) =>{
        document.getElementById(this.props.itemComponent.id).firstChild.nodeValue = text.target.value;
    };
    handleChangeFontSize = (number) =>{
        document.getElementById(this.props.itemComponent.id).style.fontSize = number.target.value + "px";
    };
    handleChangeBorderThickness= (number) =>{
        let a = number.target.value;
        document.getElementById(this.props.itemComponent.id).style.borderWidth = number.target.value + "px";
        
    };
    handleChangeBorderRadius= (number) =>{
        document.getElementById(this.props.itemComponent.id).style.borderRadius = number.target.value + "px";
        
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

    propertiesView() {
        const itemSelected = this.props.itemSelected;
        let itemComponent = this.props.itemComponent;
        //console.log(this.props.itemStyle);
        if(this.props.itemStyle !== null && itemComponent!==null){
            console.log(this.props.itemStyle.fontSize)
            console.log(itemComponent.className);
            let componentClass = itemComponent.className.slice(0,itemComponent.className.indexOf(" "));
            //console.log(componentClass);
            var style = this.props.itemStyle;
            if (itemSelected && componentClass !== "component_container") {
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
                    <input className="numberpicker" type="number" onChange={this.handleChangeFontSize}/>
                </div>
                <div class="p-2 bd-highlight">   
                    <label>Font Color</label>
                    <br/>
                    {this.colorpicker(this.handleChangeFontColor)} 
                </div>
                <div class="p-2 bd-highlight"> 
                    <label>Background</label>
                    <br/>
                    {this.colorpicker(this.handleChangeBackgroundColor)} 
                </div>
                <div class="p-2 bd-highlight">   
                    <label>Border Color</label>
                    <br/>
                    {this.colorpicker(this.handleChangeBorderColor)} 
                </div>
                <div class="p-2 bd-highlight">   
                    <label>Border Thickness</label>
                    <br/>
                    <input className="numberpicker" type="number" onChange={this.handleChangeBorderThickness}/>
                </div>
                <div class="p-2 bd-highlight">  
                    <label>Border Radius</label>
                    <br/>
                    <input className="numberpicker" type="number" onChange={this.handleChangeBorderRadius}/>
                </div>
            </div>
            );
            }
            else if(itemSelected){
                return (
                    <div class="p-2 bd-highlight">
                    <div class="p-2 bd-highlight"> 
                        <label>Background</label>
                        <br/>
                        {this.colorpicker(this.handleChangeBackgroundColor)} 
                    </div>
                    <div class="p-2 bd-highlight">   
                        <label>Border Color</label>
                        <br/>
                        {this.colorpicker(this.handleChangeBorderColor)} 
                    </div>
                    <div class="p-2 bd-highlight">   
                        <label>Border Thickness</label>
                        <br/>
                        <input className="numberpicker" type="number" onChange={this.handleChangeBorderThickness}/>
                    </div>
                    <div class="p-2 bd-highlight">  
                        <label>Border Radius</label>
                        <br/>
                        <input className="numberpicker" type="number" onChange={this.handleChangeBorderRadius}/>
                    </div>
                </div>
                   
                );
            }
        }
        
    }
    render(){
        return(
            <div id="properties" onMouseLeave={this.hide}>
                 {this.propertiesView()}
                 <div> 
                <div className="colorpicker" onClick={ this.handleClick }>
                <div/>
            </div>
                    { this.state.displayColorPicker ? 
                    <div className="popover">
                        <div  onClick={ this.handleClose }/>
                        <div className="pop">
                            <SketchPicker color={ this.state.color } />
                        </div>
                    </div> 
                    : null }
            </div>
                
            </div>

            
        );

    }


}



export default Properties;