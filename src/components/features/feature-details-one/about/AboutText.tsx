
type Highlight = {
  highlight: string;
};

type Props = {
  data?: {
    long_description?: string;
    highlights?: Highlight[];
  };
};

const AboutText = ({ data }: Props) => {
  if (!data) return null; // ⬅️ prevent crash

   
   return (
      <>
         <div className="tg-tour-about-inner mb-25">
            <h4 className="tg-tour-about-title mb-15">About This Tour</h4>
            <p className="text-capitalize lh-28">
               {data.long_description || "No Description"}
               {/* isiting Stonehenge, Bath, and Windsor Castle in one day is next to impossible. Designed specifically for lers with limited time in London, this tour allows you to check off a range of southern England‘s are l attractions in just one day by eliminating the hassle of traveling between each one independently. Travel by comfortable coach and witness your guide bring each. */}
            </p>
         </div>
         <div className="tg-tour-about-inner mb-40">
            <h4 className="tg-tour-about-title mb-20">Trip Highlights</h4>
            <div className="tg-tour-about-list">
          <ul>
            {data.highlights?.length ? (
              data.highlights.map((item, index) => (
                <li key={index}>
                  <span className="icon mr-10">
                    <i className="fa-sharp fa-solid fa-check fa-fw"></i>
                  </span>
                  <span className="text">{item.highlight}</span>
                </li>
              ))
            ) : (
              <li>No highlights available</li>
            )}
          </ul>
        </div>
         </div>
      </>
   )
}

export default AboutText
