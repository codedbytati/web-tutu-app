// src/components/Toasts.tsx
import React from 'react';
import {
  AlertTriangleIcon,
  CheckIcon,
  DotIcon,
  Info,
  InfoIcon,
  X,
  XIcon,
  type LucideIcon
} from 'lucide-react';
import { useToastRegion, useToast } from '@react-aria/toast';
import { useToast as toastQueue, type MyToastContent } from './useToast';
import { useToastQueue, type QueuedToast, type ToastState } from '@react-stately/toast';
import { toastRegionStyles, toastStyles } from './styles';

export function GlobalToasts() {
  const state = useToastQueue(toastQueue);
  const regionRef = React.useRef<HTMLDivElement>(null);
  const { regionProps } = useToastRegion({}, state, regionRef);

  if (state.visibleToasts.length === 0) return null;

  return (
    <div {...regionProps} ref={regionRef} className={toastRegionStyles()}>
      {state.visibleToasts.map((toast) => (
        <Toast key={toast.key} toast={toast} state={state} />
      ))}
    </div>
  );
}

interface ToastProps {
  toast: QueuedToast<MyToastContent>;
  state: ToastState<MyToastContent>;
}

function Toast({ toast, state }: ToastProps) {
  const toastRef = React.useRef<HTMLDivElement>(null);
  const closingRef = React.useRef(false);
  const closeTimeoutRef = React.useRef<number | null>(null);
  const [isClosing, setIsClosing] = React.useState(false);
  const { toastProps, titleProps, descriptionProps, closeButtonProps } = useToast(
    { toast },
    state,
    toastRef
  );

  const closeToast = React.useCallback(() => {
    if (closingRef.current) return;

    closingRef.current = true;
    setIsClosing(true);
    closeTimeoutRef.current = window.setTimeout(() => {
      state.close(toast.key);
    }, 300);
  }, [state, toast.key]);

  React.useEffect(() => {
    const timeoutId = window.setTimeout(closeToast, 4700);

    return () => {
      window.clearTimeout(timeoutId);
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [closeToast]);

  const { title, description, status } = toast.content;
  const icons: Record<string, LucideIcon> = {
    info: InfoIcon,
    success: CheckIcon,
    error: XIcon,
    warning: AlertTriangleIcon,
    neutral: DotIcon
  };
  const toastStatus = status ?? 'info';
  const Icon = icons[toastStatus] ?? Info;

  return (
    <div
      {...toastProps}
      ref={toastRef}
      className={`${toastStyles({ status })} ${isClosing ? 'translate-x-4 opacity-0' : 'translate-x-0 opacity-100'}`}
    >
      <Icon size={32} />
      <div className="flex-1">
        <p {...titleProps} className="font-display text-sm font-semibold text-foreground">
          {title}
        </p>
        {description && (
          <p {...descriptionProps} className="font-body text-muted-foreground mt-0.5 text-xs opacity-90">
            {description}
          </p>
        )}
      </div>
      <button
        {...closeButtonProps}
        onClick={closeToast}
        className="rounded-full p-1 text-current cursor-pointer group hover:bg-muted focus:outline-none focus:ring-2 focus:ring-current/20"
      >
        <X size={24} className='bg-transparent! text-muted-foreground! group-hover:text-foreground!' />
      </button>
    </div>
  );
}
