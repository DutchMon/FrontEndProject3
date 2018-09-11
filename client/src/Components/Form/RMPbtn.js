import React from "react";

export const RMPbtn = props => {
  let classes = "btn ";
  switch (props.type) {
    case "success":
      classes += "btn-success";
      break;
    default:
    //   can potentially add other button cases
  }

  classes += " " + props.additional;
  //use prop addClass to add any additional classes

  return (
    <button {...props} className={classes}>
      {props.children}
    </button>
  );
};
