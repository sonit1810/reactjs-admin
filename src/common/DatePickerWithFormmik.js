import React, { useState } from "react"
import "react-dates/initialize"
import { DateRangePicker } from "react-dates"
import "react-dates/lib/css/_datepicker.css"

const DatePickerWithFormik = ({
                                  startDateId,
                                  endDateId,
                                  form: { setFieldValue, setFieldTouched, values },
                                  field,
                                  ...props
                              }) => {
    const [focusedInput, setFocusedInput] = useState(null);
    return (
        <DateRangePicker
            startDate={values.start_date}
            startDateId="Start"
            endDate={values.end_date}
            endDateId="End"
            onDatesChange={({ startDate, endDate }) => {
                setFieldValue("start_date", startDate);
                setFieldValue("end_date", endDate);
            }}
            focusedInput={focusedInput}
            onFocusChange={focusedInput => setFocusedInput(focusedInput)}
        />
    )
};

export default DatePickerWithFormik;
