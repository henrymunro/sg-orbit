/* eslint-disable react/forbid-foreign-prop-types */

import { ArgumentError, LARGE, MEDIUM, SMALL, TINY, mergeClasses } from "../../shared";
import { Input as SemanticInput } from "semantic-ui-react";
import { bool, element, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { cloneElement, forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { createButtonFromShorthand } from "../../button";
import { createIconForControl } from "../../icons";
import { isElement } from "react-is";
import { isNil } from "lodash";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];
const DEFAULT_SIZE = "medium";

export const INPUT_UNSUPPORTED_PROPS = ["action", "actionPosition", "inverted"];

const propTypes = {
    /**
     * Whether or not the input should autofocus on render.
     */
    autofocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autofocusDelay: number,
    /**
     * A React component displayed before or after the prompt based on "iconPosition".
     */
    icon: element,
    /**
     * An icon can appear on the left or right.
     */
    iconPosition: oneOf(["left"]),
    /**
     * An input can contain a button.
     */
    button: oneOfType([element, object]),
    /**
     * An input can vary in sizes.
     */
    size: oneOf(SIZES),
    /**
     * @ignore
     */
    className: string,
    /**
     * @ignore
     */
    disabled: bool,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func]),
    /**
     * @ignore
     */
    __componentName: string
};

const defaultProps = {
    autofocus: false,
    size: DEFAULT_SIZE,
    disabled: false,
    __componentName: "@orbit-ui/react-components/input"
};

function getInputElement(innerRef) {
    return innerRef.current.querySelector("input");
}

function focus(innerRef) {
    if (!isNil(innerRef.current)) {
        getInputElement(innerRef).focus();
    }
}

function useDelayedAutofocus(autofocus, autofocusDelay, disabled, innerRef) {
    useEffect(() => {
        let timeoutId;

        if (autofocus && !disabled && !isNil(autofocusDelay)) {
            timeoutId = setTimeout(() => {
                focus(innerRef);
            }, autofocusDelay);
        }

        return () => {
            if (!isNil(timeoutId)) {
                clearTimeout(timeoutId);
            }
        };
    }, [autofocus, autofocusDelay, disabled, innerRef]);
}

function throwWhenMutuallyExclusivePropsAreProvided({ button, icon, iconPosition }, componentName) {
    if (!isNil(button) && !isNil(icon) && iconPosition === "right") {
        throw new ArgumentError(`${componentName} doesn't support having a button and a right positioned icon at the same time.`);
    }
}

export function PureInput(props) {
    const { autofocus, autofocusDelay, className, fluid, icon, iconPosition, button, size, loading, disabled, children, forwardedRef, __componentName, ...rest } = props;

    const SIZES_TO_BUTTON = {
        [SMALL]: TINY,
        [MEDIUM]: SMALL,
        [LARGE]: MEDIUM
    };

    throwWhenMutuallyExclusivePropsAreProvided(props, __componentName);

    const containerRef = useRef();
    const inputRef = useRef();

    useImperativeHandle(forwardedRef, () => {
        const domElement = containerRef.current;

        // This function is part of the component external API.
        domElement.focus = () => {
            inputRef.current.focus();
        };

        // This function is part of the component external API.
        domElement.select = () => {
            inputRef.current.select();
        };

        return domElement;
    });

    useDelayedAutofocus(autofocus, autofocusDelay, disabled, containerRef);

    const renderIcon = () => {
        if (!isNil(icon) && !loading) {
            return createIconForControl(icon, size);
        }
    };

    const renderButton = () => {
        if (!isNil(button)) {
            const canRenderButton = !disabled && (!loading || (loading && iconPosition === "left"));

            if (canRenderButton) {
                const defaults = {
                    size: SIZES_TO_BUTTON[size],
                    circular: true,
                    ghost: true,
                    secondary: true,
                    type: "button"
                };

                const getClasses = userClasses => {
                    return mergeClasses(
                        "input-clear-button",
                        userClasses
                    );
                };

                if (isElement(button)) {
                    return cloneElement(button, {
                        className: getClasses(button.props && button.props.className),
                        ...defaults
                    });
                }

                return createButtonFromShorthand({
                    ...defaults,
                    ...button,
                    className: getClasses(button.className)
                });
            }
        }
    };

    const containerClasses = mergeClasses(
        "relative outline-0",
        fluid ? "w-100" : "dib",
        button && "with-button",
        className
    );

    const shouldAutofocus = autofocus && !disabled && isNil(autofocusDelay);

    return (
        <div
            ref={containerRef}
            className={containerClasses}
            tabIndex={-1}
            data-testid="input"
        >
            <SemanticInput
                icon={renderIcon()}
                iconPosition={iconPosition}
                autoFocus={shouldAutofocus}
                fluid={fluid}
                size={size}
                loading={loading}
                disabled={disabled}
                ref={inputRef}
                {...rest}
            >
                {children}
            </SemanticInput>
            {renderButton()}
        </div>
    );
}

PureInput.propTypes = propTypes;
PureInput.defaultProps = defaultProps;

export const Input = forwardRef((props, ref) => (
    <PureInput { ...props } forwardedRef={ref} />
));

if (!isNil(SemanticInput.propTypes)) {
    SemanticInput.propTypes.size = oneOf(SIZES);
}
