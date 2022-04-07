import React from 'react';
import './BreadCrumbsLoader.css';
import ArrowRight from '../../../../Assets/ChevronRight.png';

const BreadCrumbsLoader = () => {

    return (
      <div className="flex-column ai-c col-12 col-md-9">
        <div className="d-flex ai-c category-trail">
          {/*
            <span className="placeholder col-1"></span>
            <img src={ArrowRight} className="arrow-right" />
          */}
          <span className="placeholder col-2"></span>
          <img src={ArrowRight} className="arrow-right" />
          <span className="placeholder col-2"></span>
        </div>
      </div>
    );
}

export default BreadCrumbsLoader;
