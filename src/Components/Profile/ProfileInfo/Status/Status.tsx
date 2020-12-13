import React from 'react';

type StatusPropsType = {
    status: string
}

export class Status extends React.Component<StatusPropsType> {
    state = {
        editMode: false
    }

   activateEditMode = () => {
        this.setState({
            editMode: true
        })
   }

   activateViewMode() {
       this.setState({
           editMode: false
       })
   }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                        <div>
                            <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
                        </div>
                }
                {this.state.editMode &&
                    <div>
                        <input type="text" value={this.props.status} onBlur={this.activateViewMode.bind(this)} autoFocus/>
                    </div>
                }
            </div>
        )
    }
}