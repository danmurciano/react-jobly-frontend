import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import SearchForm from "../app/SearchForm";
import CompanyCard from "./CompanyCard";
import Loading from "../app/Loading";


export default function CompanyList() {
  const [companies, setCompanies] = useState(null);

  useEffect(function getCompaniesOnMount() {
    searchCompanies();
  }, []);

  /** Triggered by search form submit; reloads companies. */
  async function searchCompanies(name) {
    let companies = await JoblyApi.getCompanies(name);
    setCompanies(companies);
  }

  if (!companies) return <Loading />;

  return (
    <div className="page-main">
      <h2 className="headline-text"> Companies </h2>
      <SearchForm search={searchCompanies} />
      <div className="CompanyList">

        {companies.length
            ? (
                <div className="CompanyList-list">
                  {companies.map(c => (
                    <CompanyCard
                      key={c.handle}
                      handle={c.handle}
                      name={c.name}
                      description={c.description}
                      logoUrl={c.logoUrl}
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
