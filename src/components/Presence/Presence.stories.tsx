import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Presence } from './Presence';
import avatarCarolyn from '../../assets/jpeg/avatar_carolyn.jpeg';
import avatarHank from '../../assets/jpeg/avatar_hank.jpeg';
import avatarJesse from '../../assets/jpeg/avatar_jesse.jpeg';

const meta: Meta<typeof Presence> = {
  title: 'Components/Presence',
  component: Presence,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['present', 'near', 'away'] },
    size: { control: 'select', options: ['compact', 'standard'] },
    showStatusLabel: { control: 'boolean' },
  },
  args: {
    person: {
      name: 'Jesse Florig',
      avatarSrc: avatarJesse,
    },
    status: 'present',
    size: 'standard',
    showStatusLabel: true,
  },
};

export default meta;
type Story = StoryObj<typeof Presence>;

const previewStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 'var(--s-5)',
  padding: 'var(--s-7)',
  background: 'var(--bg)',
};

const columnPreviewStyle: React.CSSProperties = {
  ...previewStyle,
  alignItems: 'flex-start',
  flexDirection: 'column',
};

export const Present: Story = {
  args: {
    person: {
      name: 'Jesse Florig',
      avatarSrc: avatarJesse,
    },
    status: 'present',
  },
};

export const Near: Story = {
  args: {
    person: {
      name: 'Carolyn Florig',
      avatarSrc: avatarCarolyn,
    },
    status: 'near',
  },
};

export const Away: Story = {
  args: {
    person: {
      name: 'Hank Florig',
      avatarSrc: avatarHank,
    },
    status: 'away',
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div style={previewStyle}>
      <Presence person={{ name: 'Jesse Florig', avatarSrc: avatarJesse }} status="present" />
      <Presence person={{ name: 'Carolyn Florig', avatarSrc: avatarCarolyn }} status="near" />
      <Presence person={{ name: 'Hank Florig', avatarSrc: avatarHank }} status="away" />
    </div>
  ),
};

export const MissingAvatar: Story = {
  render: () => (
    <div style={previewStyle}>
      <Presence person={{ name: 'Jesse Florig' }} status="present" />
      <Presence person={{ name: 'Carolyn Florig' }} status="near" />
      <Presence person={{ name: 'Hank Florig' }} status="away" />
    </div>
  ),
};

export const UnsupportedStatusFallback: Story = {
  render: () => (
    <div style={previewStyle}>
      <Presence
        person={{ name: 'Invalid Status', avatarSrc: avatarHank }}
        status={'unknown' as 'away'}
      />
    </div>
  ),
};

export const Compact: Story = {
  render: () => (
    <div style={previewStyle}>
      <Presence person={{ name: 'Jesse Florig', avatarSrc: avatarJesse }} status="present" size="compact" />
      <Presence person={{ name: 'Carolyn Florig', avatarSrc: avatarCarolyn }} status="near" size="compact" />
      <Presence person={{ name: 'Hank Florig', avatarSrc: avatarHank }} status="away" size="compact" />
    </div>
  ),
};

export const StatusLabelHidden: Story = {
  render: () => (
    <div style={columnPreviewStyle}>
      <Presence
        person={{ name: 'Jesse Florig', avatarSrc: avatarJesse }}
        status="present"
        showStatusLabel={false}
      />
      <Presence
        person={{ name: 'Carolyn Florig', avatarSrc: avatarCarolyn }}
        status="near"
        showStatusLabel={false}
      />
      <Presence
        person={{ name: 'Hank Florig', avatarSrc: avatarHank }}
        status="away"
        showStatusLabel={false}
      />
    </div>
  ),
};
