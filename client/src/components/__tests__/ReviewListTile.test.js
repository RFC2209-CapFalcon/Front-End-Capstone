/* eslint-disable react/jsx-filename-extension */
import renderer from 'react-test-renderer';
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ReviewListTile from '../review/ReviewListTile.jsx';
import '@testing-library/jest-dom';

afterEach(() => {
  cleanup();
});

test('should render ReviewListTile Component', () => {
  const review = {
    review_id: 1276567,
    rating: 5,
    summary: 'Yes!',
    recommend: true,
    response: null,
    body: "I refactored literally the entire server reviews everything so I'd like this to work, thanks!!!!",
    date: '2022-09-07T00:00:00.000Z',
    reviewer_name: 'Ryan',
    helpfulness: 5,
    photos: [
      {
        id: 2456066,
        url: 'https://i.pinimg.com/736x/33/32/6d/33326dcddbf15c56d631e374b62338dc.jpg',
      },
      {
        id: 2456067,
        url: 'https://i.pinimg.com/736x/33/32/6d/33326dcddbf15c56d631e374b62338dc.jpg',
      },
      {
        id: 2456068,
        url: 'https://i.pinimg.com/736x/33/32/6d/33326dcddbf15c56d631e374b62338dc.jpg',
      },
      {
        id: 2456069,
        url: 'https://i.pinimg.com/736x/33/32/6d/33326dcddbf15c56d631e374b62338dc.jpg',
      }, {
        id: 2456070,
        url: 'https://i.pinimg.com/736x/33/32/6d/33326dcddbf15c56d631e374b62338dc.jpg',
      },
    ],
  };
  render(<ReviewListTile review={review} />);
  const reviewListTileElement = screen.getByTestId('reviewlisttile-1');
  expect(reviewListTileElement).toBeInTheDocument();
  expect(reviewListTileElement).toHaveTextContent(`I refactored literally the entire server reviews everything so I'd like this to work, thanks!!!!`);
});
