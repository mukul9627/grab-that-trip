import React from "react";

type Inclusion = {
  inclusion_id: number;
  inclusion: string;
};

type Props = {
  inclusions?: Inclusion[];
};

const Included = ({ inclusions }: Props) => {
  return (
    <div className="tg-tour-about-inner mb-40">
      <h4 className="tg-tour-about-title mb-20">Included / Exclude</h4>

      <div className="row">
        <div className="col-lg-5">
          <div className="tg-tour-about-list tg-tour-about-list-2">
            <ul>
            {inclusions && inclusions.length > 0 ? (
              inclusions.map(item => (
                <li key={item.inclusion_id}>
                  <span className="icon mr-10"><i className="fa-sharp fa-solid fa-check fa-fw"></i></span> {item.inclusion}
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
              <li>
                <span className="icon mr-10"><i className="fa-sharp fa-solid fa-check fa-fw"></i></span> Gratuities
              </li>
              <li>
                <span className="icon mr-10"><i className="fa-sharp fa-solid fa-check fa-fw"></i></span> Return airport transfers
              </li>
              <li>
                <span className="icon mr-10"><i className="fa-sharp fa-solid fa-check fa-fw"></i></span> Luxury air-conditioned coach
              </li>
              <li>
                <span className="icon mr-10"><i className="fa-sharp fa-solid fa-check fa-fw"></i></span> Tickets
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Included;
