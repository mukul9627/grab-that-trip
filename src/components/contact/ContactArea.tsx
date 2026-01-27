import Image from "next/image"
import Link from "next/link"
import ContactForm from "../forms/ContactForm"

import shape_1 from "@/assets/img/banner/banner-2/shape.png"

const ContactArea = () => {
   return (
      <div className="tg-contact-area pt-130 p-relative z-index-1 pb-100">
         <Image className="tg-team-shape-2 d-none d-md-block" src={shape_1} alt="" />
         <div className="container">
            <div className="row align-items-center">
               <div className="col-lg-5">
                  <div className="tg-team-details-contant tg-contact-info-wrap mb-30">
                     <h6 className="mb-15">Information:</h6>
                     <p className="mb-25">Brendan Fraser, renowned actor of the silver screen, has taken on a new  as a tour guide, leveraging his passion for adventure</p>
                     <div className="tg-team-details-contact-info mb-35">
                        <div className="tg-team-details-contact">
                           <div className="item">
                              <span>Phone :</span>
                              <Link href="tel:+918929919292">+91 8929919292</Link>
                           </div>
                           {/* <div className="item">
                              <span>Website : </span>
                              <Link href="#">info@grabthattrip.com</Link>
                           </div> */}
                           <div className="item">
                              <span>E-mail : </span>
                              <Link href="mailto:info@gmail.com">info@grabthattrip.com</Link>
                           </div>
                           <div className="item">
                              <span>Address :</span>
                              <Link href="#"> B-85, 3rd Floor, Defence Colony, <br /> New Delhi 110024 </Link>
                           </div>
                        </div>
                     </div>
                     <div className="tg-contact-map h-100">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d4428.682943472747!2d77.2243511!3d28.5684484!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDM0JzA2LjUiTiA3N8KwMTMnMzMuNyJF!5e1!3m2!1sen!2sin!4v1769505681686!5m2!1sen!2sin" width="600" height="450" style={{border:"0"}}  loading="lazy"></iframe>
                        {/* <iframe src="https://maps.app.goo.gl/xq98fa3m2uYrVtvc9" width="600" height="450" style={{ border: "0" }} loading="lazy"></iframe> */}
                     </div>
                  </div>
               </div>
               <div className="col-lg-7">
                  <div className="tg-contact-content-wrap ml-40 mb-30">
                     <h3 className="tg-contact-title mb-15">Let&apos;s connect and get to know <br />
                        each other</h3>
                     <p className="mb-30">Brendan Fraser, renowned actor of the silver screen, has taken on a new
                        role as a tour guide, leveraging his passion.</p>
                     <div className="tg-contact-form tg-tour-about-review-form">
                        <ContactForm />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ContactArea
