import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from '../components/Blog';

let component;

test('initially renders only title and author = visidle div', () => {
  const blog = {
    title: 'Title should be shown',
    author: 'Authorshould be shown',
  };
  component = render(<Blog blog={blog} />);

  const elVisible = component.container.querySelector('.testVisible');
  const elInvisible = component.container.querySelector('.testInvisible');

  expect(elVisible).toHaveStyle('dispaly: ');
  expect(elInvisible).toHaveStyle('display: none');
});

test('show hidden div after `view` button click', () => {
  const blog = {
    title: 'Title should be shown',
    author: 'Authorshould be shown',
  };
  component = render(<Blog blog={blog} />);

  const elInvisible = component.container.querySelector('.testInvisible');
  const viewButton = component.getByText('view');
  fireEvent.click(viewButton);

  expect(elInvisible).toHaveStyle('dispaly: ');
  expect(elInvisible).toBeVisible();
});

/*
test('like button clicked twice', () => {
  const blog = {
    id: '123',
    title: 'Title should be shown',
    author: 'Authorshould be shown',
    likes: 44,
    user: { id: '144' },
  };

  const likeClick = jest.fn();

  component = render(<Blog blog={blog} likeClick={likeClick} />);

  const likeButton = component.getByText('like');
  // fireEvent.dblClick(likeButton);
  fireEvent.click(likeButton);
  // expect(likeClick.mock.calls.length).toBe(2);
  expect(likeClick).toHaveBeenCalledTimes(1);
});
*/
