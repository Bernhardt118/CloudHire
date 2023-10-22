import React from "react";

const ProgLangOption = (props) => {
    return (
        <div>
            {props.optionText}
            <button
                type="button"
                onClick={(e) => {
                    props.handleDeleteProgLang(props.optionText);
                }}
            >
                remove
            </button>
        </div>
    )
}

export default ProgLangOption;