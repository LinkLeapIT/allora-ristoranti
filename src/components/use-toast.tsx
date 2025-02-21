// 'use client'
// import React from 'react';
// import { useState } from 'react';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// type ToastStatus = 'info' | 'warning' | 'success' | 'error';
// type ToastPosition = 'top' | 'bottom' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
// interface ToastOptions {
//   title?: string;
//   description?: string;
//   status?: ToastStatus;
//   duration?: number;
//   variant?: string;
//   isClosable?: boolean;
//   position?: ToastPosition;
//   style?: React.CSSProperties;
// }


// interface ToastProps extends ToastOptions {
//   id: string;
// }

// export const useToast = () => {
//   const [toasts, setToasts] = useState<ToastProps[]>([]);

//   const toast = ({
//     title,
//     description,
//     status = 'info',
//     duration = 3000,
//     variant = 'default',
//     isClosable = true,
//     position = 'top-left'
//   }: ToastOptions) => {
//     const id = Math.random().toString(36).substring(2, 9);
    
//     const newToast = {
//       id,
//       title,
//       description,
//       status,
//       duration,
//       variant,
//       isClosable,
//       position
//     };
//    // Log the new toast
//    console.log('The new Toast',newToast)
//     setToasts((prev) => [...prev, newToast]);

//     if (duration !== Infinity) {
//       setTimeout(() => {
//         setToasts((prev) => prev.filter((toast) => toast.id !== id));
//       }, duration);
//     }
//   };

//   const ToastContainer: React.FC = () => {
//     const getPositionClasses = (position: ToastPosition = 'top'): string => {
//       switch (position) {
//         case 'top':
//           return 'fixed top-4 left-1/2 -translate-x-1/2 z-200';
//         case 'bottom':
//           return 'fixed bottom-4 left-1/2 -translate-x-1/2';
//         case 'top-right':
//           return 'fixed top-4 right-4';
//         case 'top-left':
//           return 'fixed top-4 left-4';
//         case 'bottom-right':
//           return 'fixed bottom-4 right-4';
//         case 'bottom-left':
//           return 'fixed bottom-4 left-4';
//         default:
//           return 'fixed top-4 right-4';
//       }
//     };

//     const getStatusClasses = (status: ToastStatus = 'info'): string => {
//       switch (status) {
//         case 'info':
//           return 'bg-[#fcf8ef] border-[#e5b54f] text-[#e5b54f] animate-glow';
//         case 'warning':
//           return 'bg-[#f4ebd9] border-[#e5b54f] text-[#e5b54f] animate-glow';
//         case 'success':
//           return 'bg-[#f4ebd9] border-[#4caf50] text-[#4caf50] animate-glow';
//         case 'error':
//           return 'bg-[#f4ebd9] border-[#f44336] text-[#f44336] animate-glow';
//         default:
//           return 'bg-[#f4ebd9] border-[#e5b54f] text-[#e5b54f] animate-glow';
//       }
//     };
    
//     // Group toasts by position
//     const groupedToasts = toasts.reduce<Record<ToastPosition, ToastProps[]>>((acc, toast) => {
//       const position = toast.position || 'top';
//       if (!acc[position]) {
//         acc[position] = [];
//       }
//       acc[position].push(toast);
     

//       return acc;
//     }, {} as Record<ToastPosition, ToastProps[]>);

//     return (
//       <>
//         {Object.entries(groupedToasts).map(([position, positionToasts]) => (
//           <div
//             key={position}
//             className={`fixed z-50 flex flex-col gap-2 w-full max-w-sm ${getPositionClasses(position as ToastPosition)}`}
//           >
//             {positionToasts.map((toast) => (
//               <Alert
//                 key={toast.id}
//                 className={`w-full ${getStatusClasses(toast.status)} transition-all duration-300 ease-in-out`}
//               >
//                 {toast.title && <AlertTitle>{toast.title}</AlertTitle>}
//                 {toast.description && (
//                   <AlertDescription>{toast.description}</AlertDescription>
//                 )}
//               </Alert>
//             ))}
//           </div>
//         ))}
//       </>
//     );
//   };

//   return { toast, ToastContainer };
// };

// export default useToast;
'use client';
import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle, AlertCloseButton } from '@/components/ui/alert';

type ToastStatus = 'info' | 'warning' | 'success' | 'error';
type ToastPosition = 'top' | 'bottom' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center'|'center';

interface ToastOptions {
  title?: string;
  description?: string;
  status?: ToastStatus;
  duration?: number;
  variant?: string;
  isClosable?: boolean;
  position?: ToastPosition;
  style?: React.CSSProperties;
  action?: React.ReactNode; // New action prop
}

interface ToastProps extends ToastOptions {
  id: string;
  removeToast: (id: string) => void; // Callback to remove toast
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = ({
    title,
    description,
    status = 'info',
    duration = 3000,
    variant = 'default',
    isClosable = true,
    position = 'top-left',
    action, // Accept the action button as part of the toast options
  }: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9);

    const newToast = {
      id,
      title,
      description,
      status,
      duration,
      variant,
      isClosable,
      position,
      action, // Add the action to the toast object
      removeToast: (toastId: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== toastId));
      },
    };

    // Log the new toast
    console.log('The new Toast', newToast);
    setToasts((prev) => [...prev, newToast]);

    if (duration !== Infinity) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, duration);
    }
  };

  const ToastContainer: React.FC = () => {
    const getPositionClasses = (position: ToastPosition = 'top'): string => {
      switch (position) {
        case 'top':
      return 'fixed top-4 left-1/2 -translate-x-1/2 z-200';
      case 'bottom':
        return 'fixed bottom-4 left-1/2 -translate-x-1/2';
      case 'top-right':
        return 'fixed top-4 right-4';
      case 'top-left':
        return 'fixed top-4 left-4';
      case 'bottom-right':
        return 'fixed bottom-4 right-4';
      case 'bottom-left':
        return 'fixed bottom-4 left-4';
      case 'center':
        return 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-200'; // Center
      case 'top-center':
        return 'fixed top-4 left-1/2 -translate-x-1/2'; // Top center
      default:
        return 'fixed top-4 right-4';
      }
    };

    const getStatusClasses = (status: ToastStatus = 'info'): string => {
      switch (status) {
        case 'info':
          return 'bg-[#fcf8ef] border-[#e5b54f] text-[#e5b54f] animate-glow';
        case 'warning':
          return 'bg-[#f4ebd9] border-[#e5b54f] text-[#e5b54f] animate-glow';
        case 'success':
          return 'bg-[#f4ebd9] border-[#4caf50] text-[#4caf50] animate-glow';
        case 'error':
          return 'bg-[#f4ebd9] border-[#f44336] text-[#f44336] animate-glow';
        default:
          return 'bg-[#f4ebd9] border-[#e5b54f] text-[#e5b54f] animate-glow';
      }
    };

    // Group toasts by position
    const groupedToasts = toasts.reduce<Record<ToastPosition, ToastProps[]>>((acc, toast) => {
      const position = toast.position || 'top';
      if (!acc[position]) {
        acc[position] = [];
      }
      acc[position].push(toast);

      return acc;
    }, {} as Record<ToastPosition, ToastProps[]>);

    return (
      <>
        {Object.entries(groupedToasts).map(([position, positionToasts]) => (
          <div
            key={position}
            className={`fixed z-50 flex flex-col gap-2 w-full max-w-sm ${getPositionClasses(position as ToastPosition)}`}
          >
            {positionToasts.map((toast) => (
              <Alert
                key={toast.id}
                className={`w-full ${getStatusClasses(toast.status)} transition-all duration-300 ease-in-out`}
              >
                {toast.title && <AlertTitle>{toast.title}</AlertTitle>}
                {toast.description && (
                  <AlertDescription>{toast.description}</AlertDescription>
                )}
                {toast.action && (
                  <div className="mt-2">
                    <div onClick={() => toast.removeToast(toast.id)}>{toast.action}</div> {/* Handle action */}
                  </div>
                )}
                {toast.isClosable && (
                  <AlertCloseButton onClick={() => toast.removeToast(toast.id)} /> // Close button to remove toast
                )}
              </Alert>
            ))}
          </div>
        ))}
      </>
    );
  };

  return { toast, ToastContainer };
};

export default useToast;
