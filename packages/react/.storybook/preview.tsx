import React from 'react';

export const parameters = {
  viewMode: 'docs',
  previewTabs: {
    canvas: {
      title: 'Story'
    }
  },
  controls: {
    matchers: {
      color: /(background|color)$/i
    }
  },
  options: {
    storySort: (a, b) =>
      a.kind === b.kind ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true })
  },
  viewport: {
    viewports: {
      '360': {
        name: '360',
        styles: {
          width: '360px',
          height: '780px'
        }
      },
      '768': {
        name: '768',
        styles: {
          width: '768px',
          height: '1664px'
        }
      },
      '1024': {
        name: '1024',
        styles: {
          width: '1024px',
          height: '576px'
        }
      },
      '1600+': {
        name: '1600+',
        styles: {
          width: '1600px',
          height: '900px'
        }
      }
    }
  }
};

export const decorators = [
  (Story) => (
    <div
      style={{
        margin: 10,
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'start',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      <Story />
    </div>
  )
];
