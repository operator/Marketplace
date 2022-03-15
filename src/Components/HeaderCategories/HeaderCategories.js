import React, { useState, useEffect } from 'react'
import './HeaderCategories.css'
import API from '../../services/api'

const HeaderCategories = props => {

    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState('');

    const getCategory = async () => {
        // TODO Adding multiple categories
        try {
            let { data } = await API.get('/api/category/list', {lvl: 1});
            setCategories(data.value.filter(({ title }) => title === 'Health'));

        } catch (error) {
            setCategories(error.message);
        }

    }

    useEffect(() => {
        if (!categories.length) {
            getCategory();
        }
    }, [categories])

    const handleCategoryChange = event => {
        let title = event.target.dataset.title;

        setActive(title);
        props.changeCategoryBar(title);
    }

    return (
        <div className="cat-bar-wrapper flex">
            <h3>Category</h3>
            <ul className="cat-list flex ai-c fw-w m-0">
                {categories.map((category) => (
                    <li
                        data-title={category.title}
                        key={category.id}
                        className={`cat-list__item m-2 px-3 py-2 ${active === category.title ? "active" : ""}`}
                        onClick={handleCategoryChange}>{category.title}
                    </li>
                ))}

            {/* temp button */}
                <li
                    data-title=""
                    className={`cat-list__item m-2 px-3 py-2 ${active === "" ? "active" : ""}`}
                    onClick={handleCategoryChange}>All categories..
                </li>
            </ul>
        </div>
    )
}
export default HeaderCategories