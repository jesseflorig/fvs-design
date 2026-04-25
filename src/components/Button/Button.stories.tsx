import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { userEvent, fireEvent, within } from 'storybook/test';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'accent', 'danger', 'icon'],
    },
    size:     { control: 'radio', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, padding: 24, background: 'var(--bg)' }}>
      <Button variant="primary">Engage</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="ghost">Dismiss</Button>
      <Button variant="accent">ARM</Button>
      <Button variant="danger">Isolate bus</Button>
      <Button variant="icon" aria-label="Refresh">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/>
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>
        </svg>
      </Button>
    </div>
  ),
};

export const Primary: Story = {
  args: { variant: 'primary', children: 'Engage', disabled: false },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button');
    await userEvent.hover(button);
    await userEvent.click(button);
    await userEvent.unhover(button);
    button.focus();
    button.blur();
  },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Cancel' },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button');
    await userEvent.hover(button);
    await userEvent.unhover(button);
  },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Dismiss' },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button');
    await userEvent.hover(button);
    await userEvent.unhover(button);
  },
};

export const Accent: Story = {
  args: { variant: 'accent', children: 'ARM' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Isolate bus' },
};

export const Icon: Story = {
  args: {
    variant: 'icon',
    'aria-label': 'Refresh',
    children: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/>
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>
      </svg>
    ),
  },
};

export const SmallSize: Story = {
  name: 'Small size (sm override)',
  args: { variant: 'primary', size: 'sm', children: 'Engage' },
};

export const DefaultVariant: Story = {
  name: 'Default variant (no variant prop)',
  args: { children: 'Engage' },
};

export const Disabled: Story = {
  args: { variant: 'primary', children: 'Engage', disabled: true },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button');
    await fireEvent.mouseOver(button, { bubbles: true });
    await fireEvent.mouseOut(button, { bubbles: true });
    await fireEvent.mouseDown(button, { bubbles: true });
  },
};
