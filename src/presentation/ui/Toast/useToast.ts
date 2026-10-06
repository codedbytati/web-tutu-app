import { ToastQueue } from '@react-stately/toast';
import type { ToastVariants } from './styles';

export interface MyToastContent {
  title: string;
  description?: string;
  status?: ToastVariants['status'];
}

export const useToast = new ToastQueue<MyToastContent>({
  maxVisibleToasts: 5,
});
