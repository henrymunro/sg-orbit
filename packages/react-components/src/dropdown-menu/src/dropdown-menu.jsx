import { Children, forwardRef } from "react";
import { Dropdown } from "../../dropdown";
import { DropdownMenuHeader } from "./header";
import { DropdownMenuItem } from "./item";
import { func, object, oneOf, oneOfType } from "prop-types";
import { throwWhenUnsupportedPropIsProvided } from "../../shared";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];
const DEFAULT_SIZE = "medium";

const UNSUPPORTED_PROPS = [
    "additionLabel",
    "additionPosition",
    "allowAdditions",
    "basic",
    "button",
    "clearable",
    "closeOnBlur",
    "closeOnChange",
    "closeOnEscape",
    "compact",
    "deburr",
    "floating",
    "inline",
    "labeled",
    "item",
    "minCharacters",
    "multiple",
    "noResultsMessage",
    "onAddItem",
    "onChange",
    "onLabelClick",
    "onSearchChange",
    "openOnFocus",
    "pointing",
    "renderLabel",
    "search",
    "searchInput",
    "searchQuery",
    "selectOnBlur",
    "selectOnNavigation",
    "selectedLabel",
    "selection",
    "simple",
    "wrapSelection"
];

const propTypes = {
    /**
     * A dropdown menu can vary in size.
     */
    size: oneOf(SIZES),
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

const defaultProps = {
    size: DEFAULT_SIZE
};

export function PureDropdownMenu(props) {
    const { forwardedRef, children, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/dropdown-menu");

    const hasChildren = Children.count(children) > 0;

    return (
        <Dropdown
            ref={forwardedRef}
            __dropdownClasses="dropdown-menu"
            {...rest}
        >
            <Choose>
                <When condition={hasChildren}>
                    <Dropdown.Menu>{children}</Dropdown.Menu>
                </When>
                <Otherwise>
                    {children}
                </Otherwise>
            </Choose>
        </Dropdown>
    );
}

PureDropdownMenu.propTypes = propTypes;
PureDropdownMenu.defaultProps = defaultProps;

export const DropdownMenu = forwardRef((props, ref) => (
    <PureDropdownMenu { ...props } forwardedRef={ref} />
));

// DropdownMenu.Menu and DropdownMenu.SearchInput are not supported.
[PureDropdownMenu, DropdownMenu].forEach(x => {
    x.Divider = Dropdown.Divider;
    x.Header = DropdownMenuHeader;
    x.Item = DropdownMenuItem;
});
