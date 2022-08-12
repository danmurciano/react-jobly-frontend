import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import JoblyApi from "../api/api";
import JobCard from "../jobs/JobCard";
import Loading from "../app/Loading";


function CompanyDetail() {
  const { handle } = useParams();

  const [company, setCompany] = useState(null);

  useEffect(function getCompanyAndJobsForUser() {
    async function getCompany() {
      setCompany(await JoblyApi.getCompany(handle));
    }

    getCompany();
  }, [handle]);

  if (!company) return <Loading />;

  return (
    <div className="page-main">
      <Link to="/companies"> &larr; Return </Link>
      <div className="company-header">
        <h3> {company.name}  </h3>
        <img src={company.logoUrl || '/logos/logo2.png'} />
        <p className="company-employees"> {`Employees: ${company.numEmployees}`} </p>
        <p>{company.description}</p>
      </div>

        <h4 className="headline-text"> Jobs </h4>

        {company.jobs.length
            ? (
                <div className="CompanyList-list">
                  {company.jobs.map(j => (
                    <JobCard
                      key={j.id}
                      id={j.id}
                      title={j.title}
                      salary={j.salary}
                      equity={j.equity}
                      companyHandle={null}
                    />
                  ))}
                </div>
            ) : (
                <p className="lead">No current jobs.</p>
            )}

    </div>
  );
}

export default CompanyDetail;
