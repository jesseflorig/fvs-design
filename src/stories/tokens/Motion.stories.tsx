import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta: Meta = {
  title: 'Tokens/Motion',
  parameters: { controls: { disable: true } },
};
export default meta;

function MotionDemo({ duration, easing, label, sublabel }: {
  duration: string;
  easing: string;
  label: string;
  sublabel: string;
}) {
  const [active, setActive] = useState(false);

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--fg-muted)', marginBottom: 8 }}>
        {label} · {sublabel}
      </div>
      <div
        style={{ position: 'relative', height: 32, background: 'var(--bg-inset)', borderRadius: 2, overflow: 'hidden', cursor: 'pointer' }}
        onClick={() => setActive(v => !v)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === ' ' && setActive(v => !v)}
        aria-label={`Demonstrate ${label}`}
      >
        <div style={{
          position: 'absolute',
          top: 4,
          left: active ? 'calc(100% - 28px)' : 4,
          width: 24,
          height: 24,
          background: 'var(--fvs-amber)',
          borderRadius: 1,
          transition: `left ${duration} ${easing}`,
        }} />
      </div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--fg-subtle)', marginTop: 4 }}>
        Click to animate
      </div>
    </div>
  );
}

export const Durations: StoryObj = {
  render: () => (
    <div style={{ background: 'var(--bg)', padding: 24, maxWidth: 480 }}>
      <MotionDemo duration="var(--dur-fast)" easing="var(--ease-std)" label="--dur-fast" sublabel="120ms — toggles" />
      <MotionDemo duration="var(--dur-med)"  easing="var(--ease-std)" label="--dur-med"  sublabel="200ms — card / menu reveals" />
      <MotionDemo duration="var(--dur-slow)" easing="var(--ease-std)" label="--dur-slow" sublabel="320ms — route changes" />
    </div>
  ),
};

export const Easings: StoryObj = {
  render: () => (
    <div style={{ background: 'var(--bg)', padding: 24, maxWidth: 480 }}>
      <MotionDemo duration="var(--dur-med)" easing="var(--ease-std)" label="--ease-std" sublabel="cubic-bezier(0.2, 0, 0.1, 1.0) — default" />
      <MotionDemo duration="var(--dur-med)" easing="var(--ease-in)"  label="--ease-in"  sublabel="cubic-bezier(0.4, 0, 1.0, 1.0) — enter" />
      <MotionDemo duration="var(--dur-med)" easing="var(--ease-out)" label="--ease-out" sublabel="cubic-bezier(0.0, 0, 0.2, 1.0) — exit" />
    </div>
  ),
};
