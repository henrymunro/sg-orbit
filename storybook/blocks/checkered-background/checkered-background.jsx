import { mergeClasses } from "@react-components/shared/src";

import styles from "./checkered-background.module.css";

export function CheckeredBackground({ className, children, ...rest }) {
    const classes = mergeClasses(
        styles.preview,
        "pl2",
        className
    );

    return (
        <div className={classes} {...rest}>
            {children}
        </div>
    );
}
