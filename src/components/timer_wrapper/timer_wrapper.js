import React, { useState, useEffect } from 'react';
import SettingsWrapper from '../timer/settings/settings-modal-wrapper';

export default function TimerWrapper() {
    const [hour, setHour] = useState();
    const [min, setMin] = useState();
    const [sec, setSec] = useState();

    const [workTime, setWorkTime] = useState();
    const [breakTime, setBreakTime] = useState();
    const [numRepeat, setNumRepeat] = useState();

    return(
        <div>
            <Timer
                workTime={workTime}
                />
            <SettingsWrapper 
                updateWork={(input) => setWorkTime(input)}
                updateBreak={(input) => setBreakTime(input)}
                updateRepeat={(input) => setNumRepeat(input)}/>
        </div>
    )
}