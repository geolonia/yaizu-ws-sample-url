import React from "react";
import { Link, useLocation } from "react-router-dom";
import './Tabbar.scss'

import { FaList, FaHome, FaSearch } from "react-icons/fa"
import { AiOutlineAppstore } from "react-icons/ai"

const Content = () => {

  const location = useLocation();
  const currentSearch = location.search;

  return (
    <div className="tabbar">
      <ul>
        <li><Link to={{ pathname: "/", search: currentSearch}}><div className="icon"><FaHome /></div><div className="text">ホーム</div></Link></li>
        <li><Link to={{ pathname: "/list", search: currentSearch}}><div className="icon"><FaList /></div><div className="text">一覧</div></Link></li>
        <li><Link to={{ pathname: "/category", search: currentSearch}}><div className="icon"><FaSearch /></div><div className="text">カテゴリ</div></Link></li>
        <li><Link to={{ pathname: "/about", search: currentSearch}}><div className="icon"><AiOutlineAppstore /></div><div className="text">マップについて</div></Link></li>
      </ul>
    </div>
  );
};

export default Content;
