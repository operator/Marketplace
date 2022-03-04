import React, {useState} from "react";
import "./ProductLoader.css";

export default function ProductLoader() {

    const additionalImages = [<span className="placeholder col-1"></span>]

    return (
            <div className="product d-flex jc-sb">

                    <div className="content col-5">

                        <div className="flex-popup">
                            <div className="loader-img-primary"/>
                        </div>

                        <div className="flex-popup">
                            <div className="additional-images d-flex">
                                <span className="placeholder col-4"></span>
                            </div>
                        </div>

                    </div>

                    <div className="col-6 product-description">
                        <div>
                            <span className="placeholder col-6"></span>
                        </div>
                        <div>
                            <span className="placeholder col-6"></span>
                        </div>
                        <h5 className="fw-bold"><span className="placeholder col-4"></span></h5>
                        <div className="d-flex margin-bottom-extra">
                            <span className="placeholder col-4"></span>
                        </div>
                        <div>
                            <span className="placeholder col-4"></span>
                        </div>
                        <div>
                            <span className="placeholder col-4"></span>
                        </div>
                        <div>
                            <span className="placeholder col-4"></span>
                        </div>
                    </div>
            </div>
    )
}