// src/components/Dropdown.stories.js
import React from 'react';
import Dropdown from '../components/Dropdown';
import { useState } from 'react';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    label: { control: 'text' },
    labelVisibility: { control: 'radio', options: ['Visible', 'Hidden'] },
    status: { control: 'radio', options: ['Unfilled', 'Filled', 'Disabled', 'Error'] },
    positionOf: { control: 'checkbox', options: ['Center', 'TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'] },
    labelIconVisibility: { control: 'radio', options: ['Visible', 'Hidden']},
    leftIconVisibility: { control: 'radio', options: ['Visible', 'Hidden']},
    helperText: { control: 'text' },
    required: { control: 'boolean' },
    text: { control: 'text' },
    type: { control: 'radio', options: ['SingleNoIcon', 'SingleRadio', 'Multi', 'SingleCategories'] },
    activeItemIndex: { control: 'number' },
    items: { control: 'array' },
    categories: { control: 'array' },
    toggleDropdown: { action: "toggleDropdown" }
  }
  
};

const Template = (args) => <Dropdown {...args} />;

// const Template = (args) => {
//     const [activeItemIndex, setActiveItemIndex] = useState(args.activeItemIndex);
  
//     const handleSelect = (index) => {
//       setActiveItemIndex(index);
//     };
  
//     return <Dropdown {...args} activeItemIndex={activeItemIndex} onSelect={handleSelect} />;
//   };

export const Master = Template.bind({});
Master.args = {
  label: 'Select Item',
  labelVisibility: 'Visible',
  status: 'Filled',
  positonOf:'Center',
  labelIconVisibility: 'Visible',
  leftIconVisibility: 'Visible',
  helperText: 'Please select an item',
  required: true,
  text: '',
  type: 'SingleNoIcon',
  activeItemIndex: -1,
  items: ['React', 'Angular', 'Vue']
};


export const SingleSelectionNoIcon = Template.bind({});
SingleSelectionNoIcon.args = {
    label: 'Select Item',
    labelVisibility: 'Visible',
    status: 'Unfilled',
    positionOf:'TopLeft',
    labelIconVisibility: 'Hidden',
    leftIconVisibility: 'Hidden',
    helperText: 'Please select an item',
    required: true,
    text: '',
    type: 'SingleNoIcon',
    activeItemIndex: -1,
    items: ['Web Development', 'Data Science', 'Cyber Security', 'Machine Learning', 'Cloud Computing']
};

export const SingleSelectionRadio = Template.bind({});
SingleSelectionRadio.args = {
  label: 'Select Item',
  labelVisibility: 'Visible',
  status: 'Unfilled',
  positionOf:'TopLeft',
  labelIconVisibility: 'Hidden',
  leftIconVisibility: 'Hidden',
  helperText: 'Please select an item',
  required: true,
  text: '',
  type: 'SingleRadio',
  activeItemIndex: -1,
  items: ['Apple', 'Banana', 'Mango', 'Grapes', 'Tomato']
};


export const MultipleSelectionCheck = Template.bind({});
MultipleSelectionCheck.args = {
  label: 'Select Items',
  labelVisibility: 'Visible',
  status: 'Unfilled',
  positionOf:'TopLeft',
  labelIconVisibility: 'Hidden',
  leftIconVisibility: 'Hidden',
  helperText: 'Please select items',
  required: true,
  text: '',
  type: 'Multi',
  activeItemIndex: -1,
  items: ['Web Development', 'Data Science', 'Cyber Security', 'Machine Learning', 'Cloud Computing']
};


export const SingleSelectionMultipleCategories = Template.bind({});
SingleSelectionMultipleCategories.args = {
  label: 'Select Item',
  labelVisibility: 'Visible',
  status: 'Unfilled',
  positionOf:'TopLeft',
  labelIconVisibility: 'Visible',
  leftIconVisibility: 'Visible',
  helperText: 'Please select an item',
  required: true,
  text: '',
  type: 'SingleCategories',
  activeItemIndex: -1,
  categories: [
    { name: 'Web Development', items: ['React', 'Angular'] },
    { name: 'Data Science', items: ['Python', 'MySQL'] },
    { name: 'Machine Learning', items: ['Keras', 'TensorFlow'] },
    { name: 'Cloud Computing', items: ['AWS', 'Azure', 'GCP'] },
    { name: 'Android Development', items: ['React Native', 'Flutter', 'Android Studio'] },
  ]
};
