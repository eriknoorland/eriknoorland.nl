import type * as React from 'react';

export interface TModalProps extends React.PropsWithChildren<{
  isOpen: boolean;
  onClose?: () => void;
}> {};