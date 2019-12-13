
import React from 'react';


class Properties extends React.Component {
    constructor(){
        super();
        this.handleChangePropertyField = this.handleChangePropertyField.bind(this);
    }

    handleChangePropertyField(){

    }

    propertiesView() {
        const itemSelected = this.props.itemSelected;
        let itemComponent = this.props.itemComponent;
        // console.log(itemComponent);
        // console.log(typeof itemComponent );
        // console.log(itemComponent.className);
        // let componentClass = itemComponent.className.slice(0,itemComponent.className.indexOf(" "));
        let componentClass = "A"

        if (itemSelected && componentClass === "component_container") {
          return (
            <div class="p-2 bd-highlight">
                <div class="p-2 bd-highlight"> 
                    <label>Background</label>
                    <br/>
                    <input className="number_input" type="text" size="5" defaultValue="Asdf"/>  
                </div>
                <div class="p-2 bd-highlight">   
                    <label>Border Color</label>
                    <br/>
                    <input className="number_input" type="text" size="5"/>  
                </div>
                <div class="p-2 bd-highlight">   
                    <label>Border Thickness</label>
                    <br/>
                    <input className="number_input"  type="number" />  
                </div>
                <div class="p-2 bd-highlight">  
                    <label>Border Radius</label>
                    <br/>
                    <input className="number_input" />   
                </div>
            </div>
          );
        }
        else if(itemSelected){
            return (
                <div class="p-2 bd-highlight">
                    <div class="p-2 bd-highlight">   
                        <label>Text</label>
                        <br/>
                        <input className="number_input" type="text"/>
                    </div>
                    <div class="p-2 bd-highlight">   
                        <label>Font Size</label>
                        <br/>
                        <input className="number_input" type="number"/>
                    </div>
                    <div class="p-2 bd-highlight"> 
                        <label>Background</label>
                        <br/>
                        <input className="number_input" type="text" size="5"/>  
                    </div>
                    <div class="p-2 bd-highlight">   
                        <label>Border Color</label>
                        <br/>
                        <input className="number_input" type="text" size="5"/>  
                    </div>
                    <div class="p-2 bd-highlight">   
                        <label>Border Thickness</label>
                        <br/>
                        <input className="number_input"  type="number" />  
                    </div>
                    <div class="p-2 bd-highlight">  
                        <label>Border Radius</label>
                        <br/>
                        <input className="number_input" />   
                    </div>
                </div>
              );
        }
        
    }
    render(){
        return(
            <div id="properties">
                 {this.propertiesView()}
            </div>
            
        );

    }


}


export default Properties;