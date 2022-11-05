import { useState } from 'react';

import './AskCount.css';

const AskCount = ({askCountActive, askCountVisible, getCoinCount}) => {
    const [count, setCount] = useState(null);

    const onChangeCount = (e) => {
        if (e.target.value >= 0) {
            setCount(e.target.value);
        }
    }

    let styles = "ask-modal";

    if (askCountActive) {
        styles += " visible";
    } else {
        styles = "ask-modal";
    }

    return (
        <div className={styles}>
            <div className="ask-modal-content">
                <div className='ask-modal-header'>
                    <div className='ask-title'>Count?</div>
                    <span className="close" onClick={() => askCountVisible(false)}>&times;</span>
                </div>
                <div className='ask-modal-body'>
                    <input type='number' onChange={e => onChangeCount(e)}></input>
                    <button className='submitBtn' onClick={() => {getCoinCount(count); askCountVisible(false);}}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default AskCount;