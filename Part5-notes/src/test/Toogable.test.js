import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Toogable from '../components/Tooglable';

describe('<Toogable/>', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Toogable buttonLabel='show...'>
        <div className='testDiv' />
      </Toogable>
    );
  });

  test('renders its children', () => {
    expect(component.container.querySelector('.testDiv')).toBeDefined();
  });

  test('at start the children are not displayed', () => {
    const content = component.container.querySelector('.togglableContent');

    expect(content).toHaveStyle(' display: none');
  });

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...');
    fireEvent.click(button);

    const content = component.container.querySelector('.togglableContent');
    expect(content).not.toHaveStyle(' display: none');
  });

  test('toggled content can be closed', () => {
    const buttonShow = component.getByText('show...');
    fireEvent.click(buttonShow);

    const buttonCancel = component.getByText('cancel');
    fireEvent.click(buttonCancel);

    const content = component.container.querySelector('.togglableContent');
    expect(content).toHaveStyle('display: none');
  });
});
