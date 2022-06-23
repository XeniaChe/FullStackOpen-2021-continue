import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from '../components/BlogForm';

describe('blog form', () => {
  test(' new blog creator', () => {
    const mockSendBlog = jest.fn();
    const component = render(<BlogForm sendBlog={mockSendBlog} />);

    const urlInput = component.container.querySelector('#url');
    const titleInput = component.container.querySelector('#title');
    const form = component.container.querySelector('form');

    fireEvent.change(urlInput, { target: { value: 'Testing URL' } });
    fireEvent.change(titleInput, { target: { value: 'Testing title' } });
    fireEvent.submit(form);

    expect(mockSendBlog.mock.calls[0][0].title).toBe('Testing title');
    expect(mockSendBlog.mock.calls[0][0].url).toBe('Testing URL');
    expect(mockSendBlog.mock.calls.length).toBe(1);
  });
});
