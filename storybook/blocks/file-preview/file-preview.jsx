import { Preview } from "@storybook/components";
import { isNil } from "lodash";
import { object, string } from "prop-types";
import { useState } from "react";

const propTypes = {
    filePath: string.isRequired,
    withSource: object
};

const defaultProps = {
    withSource: {
        format: false,
        language: "jsx"
    }
};

export function FilePreview({ filePath, withSource, children, ...rest }) {
    const [source, setSource] = useState(null);

    if (isNil(source)) {
        import(/* webpackMode: "eager" */ `!!raw-loader!@root/packages/react-components/src${filePath}.sample.jsx`)
            .then(module => {
                setSource(module.default);
            });

        return null;
    }

    return (
        <Preview withSource={{ code: source, ...withSource }} {...rest} >
            {children}
        </Preview>
    );
}

FilePreview.propTypes = propTypes;
FilePreview.defaultProps = defaultProps;
