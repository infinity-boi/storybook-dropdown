import React, { useState, useRef, useEffect } from 'react';
import { UserCircle, Info, CaretDown, Triangle } from 'phosphor-react';
import './Dropdown.css';

const Dropdown = ({
  label,
  labelVisibility,
  status = "",
  positionOf,
  labelIconVisibility,
  leftIconVisibility,
  helperText,
  required,
  text,
  type,
  activeItemIndex,
  items,
  categories,
  onChange,
  onSelect,
  toggleDropdown
}) => {
  // states
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);   // reference
  const [dropdownDirection, setDropdownDirection] = useState('bottom');   // direction in which the dropdown menu opens
  const [selectedIndex, setSelectedIndex] = useState(activeItemIndex);
  const [selectedItems, setSelectedItems] = useState([]);
  const [categoryItem, setCategoryItem] = useState();
  const [currentStatus, setCurrentStatus] = useState(status);
  const dropdownWidth = "200px";

  // styles
  // changes orientation of tooltip according to dropdown opening direction
  let tooltipstyle = {
    rotate: (dropdownDirection==="bottom") ? "0deg" : (dropdownDirection==="top") ? "180deg" : (dropdownDirection==="left") ? "90deg" : "270eg"
  }
  // flips righticon when input box is clicked
  let dropdownmenustyle = {
    width: dropdownWidth
  }
  let dropdownstyle = {
    width : dropdownWidth,
  }

  toggleDropdown = () => {
    if (status !== 'Disabled') {
      setIsOpen(!isOpen);
    }
  };

  const handleSelectItem = (index, categoryIndex) => {
    if (type === "Multi") {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.includes(index)
          ? prevSelectedItems.filter((i) => i !== index)
          : [...prevSelectedItems, index]
      );
    }
    else if (type=== "SingleCategories"){
      setCategoryItem(categories[categoryIndex].items[index]);
    }
     else {
      setSelectedIndex(index);
      setIsOpen(false);
    }
    onChange && onChange(index);
    onSelect && onSelect(index);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    const dropdownMenu = dropdownRef.current.querySelector('.dropdown-menu');
    if (isOpen && dropdownMenu) {
      const rect = dropdownMenu.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      
      if (rect.bottom > viewportHeight) {
        if (rect.top > viewportHeight / 2) {
          setDropdownDirection('top');
        } else if (rect.left > viewportWidth / 2) {
          setDropdownDirection('left');
        } else {
          setDropdownDirection('right');
        }
      } else {
        setDropdownDirection('bottom');
      }
    }
  }, [isOpen]);

  const renderItems = (items, categoryIndex) => (
    items.map((item, index) => (
      <li
        key={index}
        className={` dropdown-item-text  ${
          (type === 'Multi')
            ? (selectedItems.includes(index) ? 'active' : '')
            : index === selectedIndex ? 'active' : ''
        }`}
        onClick={() => handleSelectItem(index, categoryIndex)}
      >
        {type === 'SingleRadio' && <input type="radio" checked={index === selectedIndex} readOnly />}
        {type === 'Multi' && <input type="checkbox" checked={selectedItems.includes(index)} readOnly />}
        {item}
      </li>
    ))
  );


  return (
    <div className="container">
    <div className={`dropdown ${status.toLowerCase()} ${positionOf} ${isOpen ? 'open' : ''}`} ref={dropdownRef} style={dropdownstyle}>
      <label className={`dropdown-label ${labelVisibility==='Visible' ? '' : 'hidden'}`}>
        {label} 
        {labelIconVisibility==='Visible' && <Info className="icon info-icon"/>}
        {required && '*'}
      </label>
      <div className={`dropdown-input ${status}`} onClick={toggleDropdown}>
        {leftIconVisibility==='Visible' && <UserCircle className="icon"/>}
        <input
          className={`dropdown-text`}
          type="text"
          value={text}
          readOnly
          placeholder={(type==="SingleCategories" && categoryItem) ? categoryItem : 
            (type==="Multi" && selectedItems.length ) ? selectedItems.map(index => items[index]).join(", ") :
            (activeItemIndex!==-1 && activeItemIndex<items.length) ? items[activeItemIndex] : 
            (selectedIndex!==-1) ? items[selectedIndex] : 'Select an option'}
        />
        <CaretDown className='icon' style={{position:"relative", right: "0px", rotate: isOpen ? '180deg' : '0deg' }}/>
      </div>
      <span className="dropdown-arrow" style={tooltipstyle}></span>
      {helperText && !isOpen && status==="Unfilled" && <p className="dropdown-helper-text">{helperText}</p>}
      {isOpen && (
        <>
        <ul className={`dropdown-menu ${dropdownDirection}`} style={dropdownmenustyle}>
          <li className="tooltip"> <Triangle size={6} color="#4ec84e" style={tooltipstyle}/></li>
          {type === 'SingleCategories' && categories
            ? categories.map((category, index) => (
                <React.Fragment key={index}>
                  <li className="dropdown-category">{category.name}</li>
                  {renderItems(category.items, index)}
                </React.Fragment>
              ))
            : renderItems(items, 0)}
        </ul>
        </>
      )}
    </div>
    </div>
  );
};

export default Dropdown;
