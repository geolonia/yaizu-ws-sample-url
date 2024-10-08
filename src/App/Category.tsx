import React from "react";
import Select from 'react-select'
import { useNavigate, useLocation } from 'react-router-dom';
import './Category.scss'

type Props = {
  data: Pwamap.ShopData[];
}

const Content = (props: Props) => {

  const navigate = useNavigate();
  const location = useLocation();
  const currentSearchParams = new URLSearchParams(location.search);

  const [categoryList, setCategoryList] = React.useState<string[]>([]);

  React.useEffect(() => {

    let categories: string[] = []

    for (let i = 0; i < props.data.length; i++) {
      const shop = props.data[i];

      if (categories.indexOf(shop['カテゴリ']) === -1) {

        categories.push(shop['カテゴリ'])
      }

    }

    setCategoryList(categories)

  }, [props.data])


  return (
    <>
      <div className="head"></div>
      <div className="category">
        <div className="container">
          <div className="category-item">
            <label htmlFor="category-select">カテゴリから選ぶ</label>
            <Select
              onChange={(e) => {
                if (e) {
                  currentSearchParams.set('category', e.value);
                  navigate({
                    pathname: '/list',
                    search: `?${currentSearchParams.toString()}`,
                  });
                }
              }}
              options={
                categoryList.map(category => {
                  return {
                    value: category,
                    label: category
                  }
                })
              }
            />
          </div>

        </div>
      </div>
    </>
  );
};

export default Content;
