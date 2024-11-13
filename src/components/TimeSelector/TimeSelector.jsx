import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TimeSelector = () => {
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <div>
      <h3>Meeting time</h3>
      <DatePicker
        selected={selectedTime}
        onChange={(date) => setSelectedTime(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={30}
        timeCaption="Time"
        dateFormat="h:mm aa"
      />
    </div>
  );
};

export default TimeSelector;
