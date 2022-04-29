import React, { Component } from 'react';
import { isEmpty, debounce } from 'lodash';
import queryString from 'query-string';

import FilterSidebar from '../../Components/FilterSidebar';
import Header from '../../Components/Header/Header';
import ViewList from '../../Components/ViewList/ViewList';
import APIProvider from '../../Contexts/APIContext';
import API from '../../services/api';
import { SORT_BY_OPTIONS } from '../../constants';
import Footer from '../../Components/Footer';
import './styles.scss';

function getQueryString(_url) {
  const url = new URL(_url);
  return queryString.parse(url.search) || {};
}

class MarketplaceSearch extends Component {
  constructor(props) {
    super(props);
    const queryStrings = getQueryString(window.location.href);
    this.state = {
      filterQueryResponse: '',
      mobileClassSideFilter: '',
      mobileClassViewList: '',
      queryUsed: false,
      viewListData: '',
      products: [],
      productLoading: true,
      productFilters: {
        limit: 24,
        ...JSON.parse(SORT_BY_OPTIONS[0].value),
        ...queryStrings,
        brand: [],
      },
      productFetchError: null,
      hasNextPage: false,
      currentPage: 1,
      hasMoreProducts: true,
      searchKeyWord: queryStrings.search || '',
      totalProducts: 0,
    };

    this.screenWidth = window.screen.width;
  }

  changeBrandsFilterBar = (brand) => {
    this.setState(
      {
        productFilters: {
          ...this.state.productFilters,
          brand,
        },
      },
      this.getProducts
    );
  };

  getProducts = debounce(async (filters = {}) => {
    try {
      this.setState({
        productLoading: true,
        productFetchError: null,
      });
      if (!isEmpty(filters)) {
        this.setState({
          productFilters: {
            ...this.state.productFilters,
            ...filters,
          },
        });
      }
      const { data } = await API.get(
        '/api/products',
        this.state.productFilters
      );
      this.setState({
        products: data.value,
        productLoading: false,
        hasMoreProducts: data.value.length === data.countPerPage,
        totalProducts: data.countAll,
      });
      if (filters.search !== null && filters.search !== undefined) {
        this.setState({
          searchKeyWord: filters.search,
        });
      }
      return data;
    } catch (error) {
      this.setState({
        productLoading: false,
        productFetchError: error,
      });
    }
  }, 500);

  changeProductFilterBar = (form) => {
    this.setState(
      {
        productFilters: {
          ...this.state.productFilters,
          ...form,
        },
      },
      this.getProducts
    );
  };

  componentDidMount() {
    if (this.screenWidth < 700) {
      this.setState({ mobileClassViewList: 'mobileHide' });
      this.setState({ mobileClassSideFilter: '' });
    }
    this.getProducts(this.state.productFilters);
  }

  changeViewList(viewList) {
    if (this.screenWidth < 700) {
      this.mobileSwitchHiddenComponent();
    }
    this.setState({ viewListRender: viewList });
  }

  mobileSwitchHiddenComponent() {
    this.setState({ mobileClassViewList: '' });
    this.setState({ mobileClassSideFilter: 'mobileHide' });
  }

  processViewData(viewData, viewListRender) {
    this.setState({ viewListData: viewData });
    this.setState({ filterQueryResponse: viewData });
    this.changeViewList(viewListRender);
  }
  /**
   * Refresh the page if any error
   * Set error to null
   */
  refresh = () => {
    this.setState({
      productFetchError: null,
    });
  };

  loadMoreProducts = async () => {
    try {
      const nextPage = this.state.currentPage + 1;
      const { data } = await API.get('/api/products', {
        ...this.state.productFilters,
        page: nextPage,
      });
      this.setState({
        products: [...this.state.products, ...data.value],
        currentPage: nextPage,
        hasMoreProducts: nextPage < data.totalPages,
      });
    } catch (error) {
      this.setState({
        productFetchError: error,
      });
    }
  };

  render() {
    return (
      <APIProvider.Provider
        value={{
          products: this.state.products,
          loading: this.state.productLoading,
          getProducts: this.getProducts,
          productFetchError: this.state.productFetchError,
          refresh: this.refresh,
          loadMoreProducts: this.loadMoreProducts,
          hasMoreProducts: this.state.hasMoreProducts,
          searchKeyWord: this.state.searchKeyWord,
          totalProducts: this.state.totalProducts,
          productFilters: this.state.productFilters,
        }}
      >
        <div className="main product-catalog">
          <div className="sticky-top bg-white">
            <Header searchMode="change" />
          </div>
          <div className="container-xxl">
            <div className="row">
              <div
                className={
                  'sidebar px-0 zi-0 position-relative' +
                  this.state.mobileClassSideFilter
                }
              >
                <FilterSidebar
                  generateLink={this.props.generateLink}
                  processViewData={this.processViewData.bind(this)}
                  changeViewList={this.changeViewList.bind(this)}
                  changeProductFilterBar={this.changeProductFilterBar}
                  changeBrandsFilterBar={this.changeBrandsFilterBar}
                />
              </div>
              <div
                className={'px-0 content' + this.state.mobileClassViewList}
              >
                <ViewList />
              </div>
            </div>
          </div>
        </div>
      </APIProvider.Provider>
    );
  }
}

export default MarketplaceSearch;
