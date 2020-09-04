import React, { useState, useEffect } from 'react';
import moment from 'moment'
import './App.css';
import reportsAnalytics from './data/report-analytics';

const App = () => {
  const reports = reportsAnalytics.reports;
  const reportsDate = reportsAnalytics.currentDate;
  const [ timeSelection, setTimeSelection ] = useState(6);
  const [ reportSummary, setReportSummary ] = useState(null);
  // filter reports by createdAt date (ISO date); 

  const filterReports = (event) => {
    setTimeSelection(event.target.value);
  }

  const generateReportSummary = (filteredReports) => {
    let summary = {};
    for(const report of filteredReports){
      const month = new Date(report.createdAt).getMonth();
      if(!summary[month]){
        summary[month]=1;
      } else {
        summary[month]+=1;
      }
    }
    setReportSummary(summary);
  }
  // whenever time selection changes, update the filtered array
  useEffect(()=>{
    // filter by time selection 
    // and then: format the results to match the UI (break down by months)
    const startTime = moment(reportsDate).subtract(timeSelection, 'months');
    const filteredReports = reports.filter(report=>moment(report.createdAt).isAfter(startTime));
    generateReportSummary(filteredReports);
  }, [timeSelection, reports, reportsDate]);

  return (
    <div className="App">
    <label htmlFor="timePeriod">Please pick a time period below</label>
      <select name="timePeriod" value={timeSelection} onChange={(event)=>filterReports(event)}>
        <option value="1">last month</option>
        <option value="2">last 2 months</option>
        <option value="3">last 3 months</option>
        <option value="4">last 4 months</option>
        <option value="5">last 5 months</option>
        <option value="6">last 6 months</option>
      </select>
      {reportSummary && <div>
      {Object.keys(reportSummary).map(function(key) {
        return <div>{key}: {reportSummary[key]}</div>
      })}

      </div>}
    </div>
  );
}

export { App };
