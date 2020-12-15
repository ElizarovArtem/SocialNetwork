import React, {ChangeEvent} from 'react';

type StatusPropsType = {
    status: string
    updateStatusThunk: (status: string) => void
}

export class Status extends React.Component<StatusPropsType> {
    state = {
        editMode: false,
        status: this.props.status
    }

    onChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

   activateEditMode = () => {
        this.setState({
            editMode: true
        })
   }

   activateViewMode = () => {
       this.setState({
           editMode: false
       })
       this.props.updateStatusThunk(this.state.status)
   }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                        <div>
                            <span onDoubleClick={this.activateEditMode}>{this.state.status || "-----"}</span>
                        </div>
                }
                {this.state.editMode &&
                    <div>
                        <input
                            type="text"
                            value={this.state.status}
                            onChange={this.onChange}
                            onBlur={this.activateViewMode}
                            autoFocus
                        />
                    </div>
                }
            </div>
        )
    }
}