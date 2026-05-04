import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Bell, MoreHorizontal, Settings } from 'lucide-react';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { ControlTile } from '../ControlTiles/ControlTile/ControlTile';
import {
  entrySensorProps,
  kitchenLightProps,
  sceneTileProps,
  transitioningShadesProps,
} from '../ControlTiles/fixtures/controlTileExamples';
import { Presence } from '../Presence/Presence';
import avatarCarolyn from '../../assets/jpeg/avatar_carolyn.jpeg';
import avatarHank from '../../assets/jpeg/avatar_hank.jpeg';
import avatarJesse from '../../assets/jpeg/avatar_jesse.jpeg';
import { Cluster } from './Cluster';
import { DashboardGrid } from './DashboardGrid';
import { DashboardShell } from './DashboardShell';
import {
  dashboardNavigationItems,
  roomRows,
  sidebarNavigationItems,
  systemSummaries,
} from './layoutExamples';
import { Navbar } from './Navbar';
import { Section } from './Section';
import { Sidebar } from './Sidebar';
import { Stack } from './Stack';

const meta: Meta = {
  title: 'Components/Layout',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--s-7)', background: 'var(--bg)', color: 'var(--fg)' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj;

function MetricTile({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <Card panelLabel={label}>
      <Stack gap="sm">
        <strong
          style={{
            color: 'var(--fg)',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--t-h4)',
            fontWeight: 500,
            lineHeight: 'var(--lh-tight)',
          }}
        >
          {value}
        </strong>
        <Badge label={tone} status={tone === 'Live' ? 'live' : 'neutral'} />
      </Stack>
    </Card>
  );
}

function RoomTable() {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          color: 'var(--fg)',
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--t-small)',
        }}
      >
        <thead>
          <tr>
            {['Room', 'Climate', 'Lighting', 'Security'].map((heading) => (
              <th
                key={heading}
                scope="col"
                style={{
                  padding: 'var(--s-3)',
                  borderBottom: 'var(--s-1) solid var(--line)',
                  color: 'var(--fg-muted)',
                  textAlign: 'left',
                }}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {roomRows.map((row) => (
            <tr key={row.room}>
              <td style={{ padding: 'var(--s-3)', borderBottom: 'var(--s-1) solid var(--line)' }}>{row.room}</td>
              <td style={{ padding: 'var(--s-3)', borderBottom: 'var(--s-1) solid var(--line)' }}>{row.climate}</td>
              <td style={{ padding: 'var(--s-3)', borderBottom: 'var(--s-1) solid var(--line)' }}>{row.lighting}</td>
              <td style={{ padding: 'var(--s-3)', borderBottom: 'var(--s-1) solid var(--line)' }}>{row.security}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const navLeading = (
  <Stack gap="none">
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--t-tiny)',
        letterSpacing: 'var(--tr-label)',
        textTransform: 'uppercase',
        color: 'var(--fg-muted)',
      }}
    >
      Habitat
    </span>
    <strong style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--t-small)' }}>Smart Home</strong>
  </Stack>
);

const navActions = (
  <Cluster gap="xs">
    <Button variant="icon" aria-label="Notifications">
      <Bell size="var(--s-5)" />
    </Button>
    <Button variant="icon" aria-label="Settings">
      <Settings size="var(--s-5)" />
    </Button>
  </Cluster>
);

export const StackExamples: Story = {
  render: () => (
    <Stack gap="lg">
      <Stack gap="sm">
        <Badge label="Vertical" status="info" />
        <MetricTile label="Climate" value="71 F" tone="Nominal" />
      </Stack>
      <Stack direction="horizontal" gap="md" align="center" justify="between" wrap>
        <Presence person={{ name: 'Jesse Florig', avatarSrc: avatarJesse }} status="present" />
        <Presence person={{ name: 'Carolyn Florig', avatarSrc: avatarCarolyn }} status="near" />
        <Button variant="secondary">Adjust</Button>
      </Stack>
      <Stack direction="horizontal" gap="sm" align="baseline" wrap>
        <strong style={{ fontSize: 'var(--t-h3)', fontWeight: 500 }}>3.2 kW</strong>
        <span style={{ color: 'var(--fg-muted)', fontSize: 'var(--t-small)' }}>whole-home draw</span>
        <Badge label="Current" status="neutral" />
      </Stack>
    </Stack>
  ),
};

export const NavbarExamples: Story = {
  render: () => (
    <Stack gap="lg">
      <Navbar
        items={dashboardNavigationItems}
        activeId="overview"
        leading={navLeading}
        actions={navActions}
      />
      <Navbar
        items={dashboardNavigationItems}
        activeId="lighting"
        compactBehavior="scroll"
        label="Scrollable dashboard navigation"
      />
    </Stack>
  ),
};

export const AdditionalPrimitives: Story = {
  render: () => (
    <Stack gap="lg">
      <Cluster justify="between" gap="md">
        <Badge label="Cluster" status="live" />
        <Button variant="secondary">Scene</Button>
        <Button variant="ghost">Schedule</Button>
      </Cluster>
      <DashboardGrid minItemWidth="sm">
        {systemSummaries.map((summary) => (
          <MetricTile key={summary.label} {...summary} />
        ))}
      </DashboardGrid>
      <Section
        title="Rooms"
        description="Operational status by area."
        actions={<Button variant="icon" aria-label="More room actions"><MoreHorizontal size="var(--s-5)" /></Button>}
      >
        <RoomTable />
      </Section>
      <Section title="Loading Section" description="Header and spacing remain stable." loading>
        <Card panelLabel="Deferred">
          <span style={{ color: 'var(--fg-muted)', fontSize: 'var(--t-small)' }}>Awaiting telemetry.</span>
        </Card>
      </Section>
    </Stack>
  ),
};

export const SidebarExamples: Story = {
  render: () => (
    <Cluster align="start" gap="lg">
      <Sidebar items={sidebarNavigationItems} activeId="rooms" label="Expanded dashboard navigation" />
      <Sidebar items={sidebarNavigationItems} activeId="security" label="Collapsed dashboard navigation" collapsed />
    </Cluster>
  ),
};

export const DashboardShellExample: Story = {
  render: () => (
    <DashboardShell
      density="compact"
      navbar={<Navbar items={dashboardNavigationItems} activeId="overview" leading={navLeading} actions={navActions} />}
      sidebar={<Sidebar items={sidebarNavigationItems} activeId="overview" label="Dashboard shell navigation" />}
      aside={(
        <Stack gap="md">
          <Presence person={{ name: 'Jesse Florig', avatarSrc: avatarJesse }} status="present" />
          <Presence person={{ name: 'Carolyn Florig', avatarSrc: avatarCarolyn }} status="near" />
          <Presence person={{ name: 'Hank Florig', avatarSrc: avatarHank }} status="away" />
        </Stack>
      )}
    >
      <Stack gap="lg">
        <Section title="System Summary" description="Current smart home operating picture.">
          <DashboardGrid minItemWidth="sm">
            {systemSummaries.map((summary) => (
              <MetricTile key={summary.label} {...summary} />
            ))}
          </DashboardGrid>
        </Section>
        <Section title="Control Surface" description="Lighting, climate, security, presence, and energy.">
          <DashboardGrid minItemWidth="sm">
            <ControlTile {...kitchenLightProps} />
            <ControlTile {...transitioningShadesProps} />
            <ControlTile {...entrySensorProps} />
            <ControlTile {...sceneTileProps} />
          </DashboardGrid>
        </Section>
      </Stack>
    </DashboardShell>
  ),
};
