import { DateRangePicker } from "../../../src";
import { isNil } from "lodash";
import React, { PureComponent } from "react";
import moment from "moment";

export class ControlledDateRangePicker extends PureComponent {
    static defaultProps = {
        opened: false
    };

    state = {
        startDate: this.props.startDate,
        endDate: this.props.endDate,
        opened: this.props.opened
    };

    handleDatesChange = (event, startDate, endDate) => {
        const { onDatesChange } = this.props;

        this.setState({ startDate, endDate });
        onDatesChange(event, startDate, endDate);
    };

    handleVisibilityChange = (event, opened) => {
        this.setState({ opened });
    };

    render() {
        const { startDate, endDate, opened } = this.state;

        return (
            <>
                <div className="mb1"><span className="b" style={{ width: "80px", display: "inline-block" }}>startDate:</span> {isNil(startDate) ? "null" : moment(startDate).format("YYYY-MM-DD")}</div>
                <div className="mb1"><span className="b" style={{ width: "80px", display: "inline-block" }}>endDate:</span> {isNil(endDate) ? "null" : moment(endDate).format("YYYY-MM-DD")}</div>
                <div className="mb1"><span className="b" style={{ width: "80px", display: "inline-block" }}>opened:</span> {opened ? "true" : "false"}</div>
                <br /><br />
                <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    opened={opened}
                    onDatesChange={this.handleDatesChange}
                    onVisibilityChange={this.handleVisibilityChange}
                />
            </>
        )
    }
}