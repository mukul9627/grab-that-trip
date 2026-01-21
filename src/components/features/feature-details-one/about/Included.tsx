import React from "react";

type Inclusion = {
  inclusion_id: number;
  inclusion: string;
  inclusion_type: "Yes" | "No";
};

type Props = {
  inclusions?: Inclusion[];
};

 

const Included = ({ inclusions = [] }: Props) => {
   const includedList = inclusions.filter(
    item => item.inclusion_type === "Yes"
  );

  const excludedList = inclusions.filter(
    item => item.inclusion_type === "No"
  );
  return (
    <div className="tg-tour-about-inner mb-40">
      <h4 className="tg-tour-about-title mb-20">Inclusion / Exclusion</h4>

      <div className="row">
         <div className="col-lg-5">
          <div className="tg-tour-about-list tg-tour-about-list-2">
            <ul>
              {includedList.length > 0 ? (
                includedList.map(item => (
                  <li key={item.inclusion_id}>
                    <span className="icon mr-10">
                      <i className="fa-sharp fa-solid fa-check fa-fw"></i>
                    </span>
                    {item.inclusion}
                  </li>
                ))
              ) : (
                <li>No inclusions available</li>
              )}
            </ul>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="tg-tour-about-list tg-tour-about-list-2 disable">
            <ul>
              {excludedList.length > 0 ? (
                excludedList.map(item => (
                  <li key={item.inclusion_id}>
                    <span className="icon mr-10" style={{background: "red"}}>
                      <i className="fa-sharp fa-solid fa-xmark fa-fw" style={{color: 'white'}}></i>
                    </span>
                    {item.inclusion}
                  </li>
                ))
              ) : (
                <li>No exclusions available</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Included;
