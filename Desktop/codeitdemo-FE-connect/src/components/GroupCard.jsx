import React from "react";

const GroupCard = ({ group }) => {
  return (
    <div className="group-card">
      <img src={group.image} alt={group.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
      <h3>{group.title}</h3>
      <p>{group.description}</p>
    </div>
  );
};

export default GroupCard;