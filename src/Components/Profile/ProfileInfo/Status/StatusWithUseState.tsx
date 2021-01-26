import React, {ChangeEvent, useEffect, useState} from 'react';

type StatusPropsType = {
    status: string
    updateStatusThunk: (status: string) => void
}

export const StatusWithUseState = (props: StatusPropsType) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    },[props.status])

    const activateEditMode = () => setEditMode(true)
    const activateViewMode = () => {
        setEditMode(false)
        props.updateStatusThunk(status)
    }
    const onChange = (e: ChangeEvent<HTMLInputElement>) => setStatus(e.currentTarget.value)

    return (
        <div>
            {!editMode ?
            <div>
                <b>Status: </b><span onDoubleClick={activateEditMode}>{status || "-----"}</span>
            </div>
            :
            <div>
                <input
                    type="text"
                    value={status}
                    onChange={onChange}
                    onBlur={activateViewMode}
                    autoFocus
                />
            </div>
            }
        </div>
    )
}
