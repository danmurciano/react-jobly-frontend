import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import SearchForm from "../app/SearchForm";
import JobCard from "./JobCard";
import Loading from "../app/Loading";


export default function JobList() {
  const [jobs, setJobs] = useState(null);

  useEffect(function getJobsOnMount() {
    searchJobs();
  }, []);

  /** Triggered by search form submit; reloads companies. */
  async function searchJobs(id) {
    let jobs = await JoblyApi.getJobs(id);
    setJobs(jobs);
  }

  if (!jobs) return <Loading />;

  return (
    <div className="page-main">
      <h2 className="headline-text"> Jobs </h2>
      <SearchForm search={searchJobs}/>
      <div>

        {jobs.length
            ? (
                <div className="CompanyList-list">
                  {jobs.map(j => (
                    <JobCard
                      key={j.id}
                      id={j.id}
                      title={j.title}
                      salary={j.salary}
                      equity={j.equity}
                      companyHandle={j.companyHandle}
                    />
                  ))}
                </div>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}
      </div>
    </div>
  );
}
