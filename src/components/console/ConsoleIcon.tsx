import React from 'react';
import {
  ArrowUpDown,
  FileText,
  Key,
  Pencil,
  PlayCircle,
  RotateCcw,
  StopCircle,
  Trash2,
  Upload,
  X,
  type LucideIcon,
} from 'lucide-react';

export type ConsoleIconName =
  | 'attach'
  | 'detach'
  | 'terminal'
  | 'logs'
  | 'clean'
  | 'provisionKey'
  | 'publish'
  | 'details'
  | 'edit'
  | 'versionChange'
  | 'start'
  | 'stop'
  | 'restart'
  | 'delete'
  | 'close';

type Props = {
  name: ConsoleIconName;
  label: string;
};

const SIZE = 18;

const LUCIDE: Record<
  Exclude<ConsoleIconName, 'attach' | 'detach' | 'terminal' | 'logs' | 'clean'>,
  LucideIcon
> = {
  provisionKey: Key,
  publish: Upload,
  details: FileText,
  edit: Pencil,
  versionChange: ArrowUpDown,
  start: PlayCircle,
  stop: StopCircle,
  restart: RotateCcw,
  delete: Trash2,
  close: X,
};

function IconSvg({
  children,
  fill = 'none',
}: {
  children: React.ReactNode;
  fill?: string;
}): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={SIZE}
      height={SIZE}
      viewBox="0 0 24 24"
      fill={fill}
      aria-hidden="true">
      {children}
    </svg>
  );
}

function renderIcon(name: ConsoleIconName): React.JSX.Element {
  if (name === 'attach') {
    return (
      <IconSvg>
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="square"
          strokeWidth="2"
          d="m20.506 12.313l-7.778 7.778a6 6 0 0 1-8.485-8.485l7.778-7.778a4 4 0 1 1 5.657 5.657L9.9 17.263a2 2 0 1 1-2.829-2.829l7.071-7.07"
        />
      </IconSvg>
    );
  }
  if (name === 'detach') {
    return (
      <IconSvg>
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          d="m4 4l16 16m2-8l-5.28 5.28M15 19l-2 2c-6 6-15-3-9-9l2-2m2-2l5-5c4-4 10 2 6 6l-5 5m-2 2l-2 2c-2 2-5-1-3-3l2-2m2-2l5-5"
        />
      </IconSvg>
    );
  }
  if (name === 'terminal') {
    return (
      <IconSvg fill="currentColor">
        <path d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm0-2h16V8H4zm3.5-1l-1.4-1.4L8.675 13l-2.6-2.6L7.5 9l4 4zm4.5 0v-2h6v2z" />
      </IconSvg>
    );
  }
  if (name === 'logs') {
    return (
      <IconSvg>
        <path
          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 2v6h6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 13H8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 17H8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 9H8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </IconSvg>
    );
  }
  if (name === 'clean') {
    return (
      <IconSvg>
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5">
          <path d="m21 3l-8 8.5m-3.554-.415c-2.48.952-4.463.789-6.446.003c.5 6.443 3.504 8.92 7.509 9.912c0 0 3.017-2.134 3.452-7.193c.047-.548.07-.821-.043-1.13c-.114-.309-.338-.53-.785-.973c-.736-.728-1.103-1.092-1.54-1.184c-.437-.09-1.007.128-2.147.565" />
          <path d="M4.5 16.446S7 16.93 9.5 15m-1-7.75a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0M11 4v.1" />
        </g>
      </IconSvg>
    );
  }

  const Lucide = LUCIDE[name];
  return <Lucide size={SIZE} color="currentColor" aria-hidden="true" />;
}

export default function ConsoleIcon({name, label}: Props): React.JSX.Element {
  return (
    <span
      role="img"
      aria-label={label}
      title={label}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        color: 'currentColor',
        lineHeight: 0,
        verticalAlign: 'text-bottom',
      }}>
      {renderIcon(name)}
    </span>
  );
}
