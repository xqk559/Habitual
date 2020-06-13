import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Habitual from './habitual';

configure({adapter: new Adapter()});

describe('habitual.js', () => {
  it('should render <div className="loader"/> after 500ms of loading', ()=>{
    const wrapper = shallow(<Habitual/>)
    expect(wrapper.find(loaderTimeout))
  });
});