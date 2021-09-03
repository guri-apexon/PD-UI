import React from "react";
import Chip from "apollo-react/components/Chip";
import "./filterchips.scss";

const FilterChip = (props) => {
  console.log("FIlter Chip", props.filters);
  const { filters } = props;
  const handleDelete = () => {
    console.log("You clicked the delete icon.");
  };
  return (
    <div className="filter-chip" data-testid="filter-chip">
      <div className="filters">
        <div className="section">
          <label>Table of Contents :</label>
          {filters.toc.map((item) => (
            <div className="chip-inside" key={item}>
              <Chip
                color="white"
                size="small"
                label={item}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
        <div className="section">
          <label>Sponsors :</label>
          {filters.sponsor.map((item) => (
            <div className="chip-inside" key={item}>
              <Chip
                color="white"
                size="small"
                label={item}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
        <div className="section">
          <label>Indications :</label>
          {filters.indication.map((item) => (
            <div className="chip-inside" key={item}>
              <Chip
                color="white"
                size="small"
                label={item}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
        <div className="section">
          <label>Phases :</label>
          {filters.phase.map((item) => (
            <div className="chip-inside" key={item}>
              <Chip
                color="white"
                size="small"
                label={item}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
        <div className="section">
          <label>Document Status :</label>
          {filters.documentStatus.map((item) => (
            <div className="chip-inside" key={item}>
              <Chip
                color="white"
                size="small"
                label={item}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FilterChip;
