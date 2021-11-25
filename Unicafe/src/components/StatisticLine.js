import React from 'react';

const StatisticLine = ({ text, value }) => {
  return (
    <>
      {/* <p>
        {text}: {value}
      </p> */}
      <tr>
        <td>
          {text}: {value}
        </td>
      </tr>
    </>
  );
};

export default StatisticLine;
