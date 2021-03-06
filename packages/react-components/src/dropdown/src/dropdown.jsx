import "./item-factory";

import { DOMEventListener, KEYS, LARGE, SMALL, mergeClasses, useForwardRef } from "../../shared";
import { DropdownContext } from "./context";
import { DropdownItem } from "./item";
import { Ref, Dropdown as SemanticDropdown } from "semantic-ui-react";
import { any, arrayOf, bool, element, elementType, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { createIconForControl } from "../../icons";
import { forwardRef, useEffect, useRef, useState } from "react";
import { isNil } from "lodash";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];
const DEFAULT_SIZE = "medium";

const SIZES_CLASSES = {
    [SMALL]: "small",
    [LARGE]: "large"
};

const propTypes = {
    /**
     * A dropdown can display an icon before it's content.
     */
    icon: element,
    /**
     * A dropdown can vary in sizes.
     */
    size: oneOf(SIZES),
    /**
     * Whether or not the dropdown should autofocus on render.
     */
    autofocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autofocusDelay: number,
    /**
     * @ignore
     */
    search: bool,
    /**
     * @ignore
     */
    inline: bool,
    /**
     * @ignore
     */
    onOpen: func,
    /**
     * @ignore
     */
    onClose: func,
    /**
     * @ignore
     */
    onFocus: func,
    /**
     * @ignore
     */
    onBlur: func,
    /**
     * @ignore
     */
    onChange: func,
    /**
     * @ignore
     */
    options: arrayOf(any),
    /**
     * @ignore
     */
    fluid: bool,
    /**
     * @ignore
     */
    disabled: bool,
    /**
     * @ignore
     */
    className: string,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func]),
    /**
     * @ignore
     */
    __dropdownClasses: string,
    /**
     * @ignore
     */
    __semanticDropdown: elementType
};

const defaultProps = {
    autofocus: false,
    size: DEFAULT_SIZE,
    __semanticDropdown: SemanticDropdown
};

function focus(search, innerRef) {
    if (!isNil(innerRef.current)) {
        if (search) {
            innerRef.current.querySelector("input.search").focus();
        } else {
            innerRef.current.focus();
        }
    }
}

function useAutofocus(autofocus, autofocusDelay, search, disabled, innerRef) {
    useEffect(() => {
        let timeoutId;

        if (autofocus && !disabled) {
            const delay = !isNil(autofocusDelay) ? autofocusDelay : 5;

            timeoutId = setTimeout(() => {
                focus(search, innerRef);
            }, delay);
        }

        return () => {
            if (!isNil(timeoutId)) {
                clearTimeout(timeoutId);
            }
        };
    }, [autofocus, autofocusDelay, search, disabled, innerRef]);
}

export function PureDropdown(props) {
    const { search, inline, icon, size, autofocus, autofocusDelay, fluid, trigger, disabled, className, forwardedRef, onOpen, onClose, onFocus, onBlur, onChange, __dropdownClasses, __semanticDropdown: InnerDropdown,...rest } = props;

    const _state = useRef({ valueChanged: false });
    const dropdownRef = useRef(null);
    const [innerRef, setInnerRef] = useForwardRef(forwardedRef);
    const [isOpen, setIsOpen] = useState(false);
    const [isFocus, setIsFocus] = useState(false);

    useAutofocus(autofocus, autofocusDelay, search, disabled, innerRef);

    const setValueChanged = newValue => {
        _state.current.valueChanged = newValue;
    };

    const handleOpen = (...args) => {
        setIsOpen(true);

        if (!isNil(onOpen)) {
            onOpen(...args);
        }
    };

    const handleClose = (...args) => {
        setIsOpen(false);

        if (!isNil(onClose)) {
            onClose(...args);
        }
    };

    const handleFocus = (...args) => {
        setIsFocus(true);

        if (!isNil(onFocus)) {
            onFocus(...args);
        }
    };

    const handleBlur = (...args) => {
        setIsFocus(false);

        if (!isNil(onBlur)) {
            onBlur(...args);
        }
    };

    const handleChange = (...args) => {
        setValueChanged(true);

        if (!isNil(onChange)) {
            onChange(...args);
        }
    };

    const handleDocumentKeyDown = event => {
        const key = event.keyCode;

        if (key === KEYS.enter) {
            if (!_state.current.valueChanged) {
                dropdownRef.current.open(event);
            }

            setValueChanged(false);
        }
    };

    const renderIcon = () => {
        if (!isNil(icon)) {
            const classes = mergeClasses(
                "ui dropdown-icon flex items-center",
                inline && "inline"
            );

            return (
                <div className={classes}>
                    {createIconForControl(icon, size)}
                </div>
            );
        }
    };

    const containerClasses = mergeClasses(
        fluid ? "w-100" : "dib",
        "relative outline-0",
        className
    );

    const dropdownClasses = mergeClasses(
        SIZES_CLASSES[size],
        !isNil(icon) && "with-icon",
        __dropdownClasses
    );

    return (
        <>
            <div
                className={containerClasses}
                tabIndex={-1}
            >
                <Ref innerRef={setInnerRef}>
                    <DropdownContext.Provider value={{ size: size }}>
                        <InnerDropdown
                            onOpen={handleOpen}
                            onClose={handleClose}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inline={inline}
                            search={search}
                            openOnFocus={false}
                            fluid={fluid}
                            trigger={trigger}
                            icon={isNil(trigger) ? undefined : null }
                            disabled={disabled}
                            className={dropdownClasses}
                            ref={dropdownRef}
                            data-testid="dropdown"
                            {...rest}
                        />
                    </DropdownContext.Provider>
                </Ref>
                {renderIcon()}
            </div>

            <If condition={!isOpen && isFocus}>
                <DOMEventListener name="keydown" on={handleDocumentKeyDown} />
            </If>
        </>
    );
}

PureDropdown.propTypes = propTypes;
PureDropdown.defaultProps = defaultProps;

export const Dropdown = forwardRef((props, ref) => (
    <PureDropdown { ...props } forwardedRef={ref} />
));

[PureDropdown, Dropdown].forEach(x => {
    x.Divider = SemanticDropdown.Divider;
    x.Header = SemanticDropdown.Header;
    x.Item = DropdownItem;
    x.Menu = SemanticDropdown.Menu;
    x.SearchInput = SemanticDropdown.SearchInput;
});
